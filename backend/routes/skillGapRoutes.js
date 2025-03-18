const express = require("express");
const { getSkillGap } = require("../app/skillGapController");

const router = express.Router();
router.get("/:email", getSkillGap);

module.exports = router;
