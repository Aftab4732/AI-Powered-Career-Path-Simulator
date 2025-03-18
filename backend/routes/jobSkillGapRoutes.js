const express = require("express");
const router = express.Router();
const { getJobSkillGap} = require("../app/jobSkillGapController");

// Define the route to get skill gap analysis
router.get("/", getJobSkillGap);


module.exports = router;
