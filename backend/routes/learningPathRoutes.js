// backend/routes/learningPathRoutes.js
const express = require("express");
const { getLearningPath } = require("../app/learningPathController");

const router = express.Router();

// Endpoint: GET /api/learning-path/:career
router.get("/:career", getLearningPath);

module.exports = router;
