const { generateCareerSkills } = require("../utils/careerPathService");
const Profile = require("../models/ProfileModel");

const getSkillGap = async (req, res) => {
  try {
    const { email } = req.params;

    const userProfile = await Profile.findOne({ email });
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    const { selectedCareer, skills } = userProfile;

    if (!selectedCareer) {
      return res.status(400).json({ message: "No career selected" });
    }

    // Fetch required skills dynamically from Gemini AI
    const requiredSkills = await generateCareerSkills(selectedCareer);

    // Ensure `skills` is an array before processing
    let userSkills = [];

    if (Array.isArray(skills)) {
      userSkills = skills.map(skill => skill.trim().toLowerCase());
    } else if (typeof skills === "string") {
      userSkills = skills.split(",").map(skill => skill.trim().toLowerCase());
    }

    // Find missing skills
    const missingSkills = requiredSkills.filter(
      skill => !userSkills.includes(skill.toLowerCase())
    );

    // 🔥 Only return necessary fields
    res.json({
      selectedCareer,
      userSkills,
      requiredSkills,
      missingSkills,
    });
  } catch (error) {
    console.error("Error fetching skill gap:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getSkillGap
};
