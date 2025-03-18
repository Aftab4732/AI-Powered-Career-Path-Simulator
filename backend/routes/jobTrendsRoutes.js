const express = require("express");
const { getJobTrendsData } = require("../app/jobTrendsController");

const router = express.Router();
router.get("/", getJobTrendsData);

module.exports = router;
