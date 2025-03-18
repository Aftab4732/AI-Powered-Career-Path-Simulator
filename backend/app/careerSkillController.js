const CareerSkills = require("../models/CareerSkillModel");

const getCareerSkills = async (req, res) => {
  try {
    const { career } = req.params;
    const careerSkills = await CareerSkills.findOne({ career });

    if (!careerSkills) {
      return res.status(404).json({ message: "Career skills not found" });
    }

    res.json(careerSkills);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getCareerSkills };
