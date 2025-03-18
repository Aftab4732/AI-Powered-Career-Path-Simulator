const mongoose = require('mongoose');

const QuizAttemptSchema = new mongoose.Schema({
    email: { type: String, required: true },
    career: { type: String, required: true },
    difficulty: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "mcq", "code"
    questions: { type: Array, required: true }, // Array of question IDs
    answers: { type: Array, required: true }, // Array of { questionId, answer }
    score: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    autoSubmitted: { type: Boolean, default: false },
    attemptedAt: { type: Date, default: Date.now }
  });
  

module.exports = mongoose.model('QuizAttempt', QuizAttemptSchema);
