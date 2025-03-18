const mongoose = require("mongoose");

const QuizProgressSchema = new mongoose.Schema({
  email: { type: String, required: true },
  career: { type: String, required: true },
  difficulty: { type: String, required: true },
  type: { type: String, required: true },
  answeredQuestions: { type: Number, default: 0 }
});

module.exports = mongoose.model("QuizProgress", QuizProgressSchema);
