const CareerPathService = require("../utils/careerPathService");
const UserProfile = require("../models/ProfileModel");
const getCareerPathTimeline = async (req, res) => {
    try {
        const userId = req.user.id; 
        const userProfile = await UserProfile.findOne({ userId });

        if (!userProfile) {
            return res.status(404).json({ error: "User profile not found" });
        }
        const careerPath = CareerPathService.generateCareerPath(userProfile);

        res.status(200).json({ careerPath }); 
    } catch (error) {
        console.error("Error fetching career path:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { getCareerPathTimeline };

