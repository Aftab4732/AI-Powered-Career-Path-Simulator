// backend/routes/jobMarketRoutes.js
const express = require("express");
const { getJobMarketTrends } = require("../app/jobMarketController");

const router = express.Router();

router.get("/", getJobMarketTrends);

module.exports = router;
