const express = require("express");
const multer = require("multer");
const { processPDF, processImage } = require('../utils/fileProcessing');
const Profile = require("../models/ProfileModel");
const { generateCareerPath } = require("../utils/careerPathService");
const { generateCareerRecommendations } = require("../utils/gemini");
const { updateSelectedCareer,updateProfile } = require("../app/profileController");
const router = express.Router();

// Middleware for common error handling
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error(`Error in ${req.method} ${req.path}:`, error);
        res.status(500).json({ 
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error' 
        });
    });
};
router.put("/profile/create", updateProfile);
router.put("/select-career/:email", updateSelectedCareer); // User selects career
// Get all profiles
router.get("/", asyncHandler(async (req, res) => {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
}));

// Get profile by email
router.get("/email/:email", asyncHandler(async (req, res) => {
    const { email } = req.params;
    

    
    const profile = await Profile.findOne({ email });

    
    if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
    }
    // Generate career path
    const careerPath = generateCareerPath(profile);


    if (!careerPath) {
        console.error("Career Path is undefined!");
    }
    // Send profile with career path
    res.status(200).json({ ...profile.toObject(), careerPath });
}));

// Get user by ID (if you need this separate from email lookup)
router.get("/user/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!id || id === "null") {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    
    const userProfile = await Profile.findById(id);
    if (!userProfile) {
        return res.status(404).json({ error: "User not found, please sign up." });
    }
    
    res.json(userProfile);
}));

// Create new profile
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

router.post('/create', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), asyncHandler(async (req, res) => {
  const { email, name, experience, education, contact, birthDate, recommendedCareer, selectedCareer } = req.body;
  const skills = JSON.parse(req.body.skills || '[]');
  let photoData = null;
  let resumeData = null;

  // Process files if they exist
  if (req.files) {
    if (req.files.photo) {
      photoData = await processImage(req.files.photo[0].buffer);
    }
    if (req.files.resume) {
      resumeData = await processPDF(req.files.resume[0].buffer);
    }
  }

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  let profile = await Profile.findOne({ email });
  if (profile) {
    const updateData = {
      name,
      skills,
      experience,
      education,
      contact,
      birthDate,
      recommendedCareer,
      selectedCareer
    };

    // Only update files if new ones were uploaded
    if (photoData) updateData.photo = photoData;
    if (resumeData) updateData.resume = resumeData;

    profile = await Profile.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );
    return res.status(200).json({
      message: "Profile updated successfully",
      profile
    });
  }

  profile = new Profile({
    email,
    name,
    skills,
    experience,
    education,
    contact,
    birthDate,
    recommendedCareer,
    selectedCareer,
    photo: photoData,
    resume: resumeData
  });

  await profile.save();
  res.status(201).json({
    message: 'Profile created successfully',
    profile
  });
}));


// Update profile
router.put("/profile/:email", asyncHandler(async (req, res) => {
    const { name, skills, experience, education, contact, birthDate, photo, resume,recommendedCareer  } = req.body;
    const { email } = req.params;
  
    if (!email || !name) {
      return res.status(400).json({ error: "Email and name are required" });
    }
  
    const profile = await Profile.findOneAndUpdate(
      { email },
      { name, skills, experience, education, contact, birthDate, photo, resume,recommendedCareer, selectedCareer  },
      { new: true, upsert: true }
    );
  
    
    const message = profile.isNew ? "Profile created successfully" : "Profile updated successfully";
    res.status(profile.isNew ? 201 : 200).json({ message, profile });
}));

// Get career recommendations
router.post("/recommendations", asyncHandler(async (req, res) => {
    const { email, skills, experience, education, interests } = req.body;

    let profile;
    if (email) {
        profile = await Profile.findOne({ email });
        if (!profile) {
            return res.status(404).json({ error: "Profile not found for this email" });
        }
    } else {
        profile = { skills, experience, education, interests };
    }

    if (!profile.skills || !profile.experience || !profile.education) {
        return res.status(400).json({ error: "Incomplete profile data. Please provide skills, experience, and education." });
    }

    try {
        const recommendations = await generateCareerRecommendations({
            skills: profile.skills,
            experience: profile.experience,
            education: profile.education
        });

        res.json(recommendations);  // Send parsed JSON response
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
}));


// Get career path
router.get("/career-path/:userId", asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    const userProfile = await Profile.findById(userId);
    if (!userProfile) {
        return res.status(404).json({ error: "User profile not found" });
    }
    
    const careerPath = generateCareerPath(userProfile);
    res.status(200).json(careerPath);
}));

module.exports = router;