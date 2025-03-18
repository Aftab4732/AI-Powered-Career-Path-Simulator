const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  career: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ["Easy", "Medium", "Hard"] },
  type: { type: String, required: true, enum: ["MCQ", "Coding","Code"] }, // 🔹 Ensure "Coding" is listed
  question: { type: String, required: true },
  options: { type: [String], default: [] },
  correctAnswer: { type: String, default: null },
  timeLimit: { type: Number, default: 60 },
  codingQuestion: { type: Boolean, default: false },
  problemStatement: { type: String, default: null },
  sampleInput: { type: Object, default: null },
  expectedOutput: { type: Object, default: null },
  explanation: { type: String, default: null }
});

module.exports = mongoose.model("Quiz", quizSchema);
