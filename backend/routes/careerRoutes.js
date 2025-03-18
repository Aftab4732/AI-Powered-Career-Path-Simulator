const express = require("express");
const { getCareerRecommendations } = require("../app/careerPathController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/recommendations", authMiddleware, getCareerRecommendations);

module.exports = router;
