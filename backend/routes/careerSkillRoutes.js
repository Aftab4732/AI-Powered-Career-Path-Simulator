const express = require("express");
const { getCareerSkills } = require("../app/careerSkillController.js");

const router = express.Router();

router.get("/:career", getCareerSkills); // Fetch skills by career name

module.exports = router;
