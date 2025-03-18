const mongoose = require("mongoose");

const CareerSkillsSchema = new mongoose.Schema({
  career: { type: String, required: true, unique: true },
  skills: { type: [String], required: true }
});

module.exports = mongoose.model("CareerSkills", CareerSkillsSchema);
