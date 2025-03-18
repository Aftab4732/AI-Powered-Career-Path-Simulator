const Profile = require("../models/ProfileModel");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const updateSelectedCareer = async (req, res) => {
  try {
    const { email } = req.params;
    const { recommendedCareer } = req.body;

    const careerTitle = typeof recommendedCareer === "object" ? recommendedCareer.title : recommendedCareer;

    const userProfile = await Profile.findOneAndUpdate(
      { email },
      { recommendedCareer: careerTitle }, 
      { new: true }
    );

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.json({ message: "Career updated successfully", profile: userProfile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { email, name, skills, experience, education, contact, birthDate,recommendedCareer, selectedCareer } = req.body;
    
    const photo = req.file ? req.file.buffer.toString("base64") : null;
    const resume = req.file ? req.file.buffer.toString("base64") : null;

    if (!email) {
      return res.status(400).json({ error: "Email is required to update profile." });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { email },
      { name, skills, experience, education, contact, birthDate, photo, resume,recommendedCareer, selectedCareer  },
      { new: true, upsert: true }
    );

    res.json(updatedProfile);
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Server error while updating profile." });
  }
};

module.exports = { updateSelectedCareer, updateProfile };
