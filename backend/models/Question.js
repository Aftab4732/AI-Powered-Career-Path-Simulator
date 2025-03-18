const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    optionText: { type: String, required: true }, // Option text for MCQ
    isCorrect: { type: Boolean, default: false } // Mark correct option (optional for backend)
});

const QuestionSchema = new mongoose.Schema({
    career: { type: String, required: true }, // Career related to question
    difficulty: { type: String, required: true }, // "Beginner", "Intermediate", "Advanced"
    type: { type: String, required: true }, // "MCQ" or "Code"

    question: { type: String, required: true }, // Actual question text

    // For MCQ questions
    options: [OptionSchema], // List of options (only for MCQ type)

    // For code questions
    expectedOutput: { type: String }, // Expected output for code questions
    inputFormat: { type: String }, // (Optional) Input format for code challenges
    outputFormat: { type: String }, // (Optional) Output format for code challenges
    constraints: { type: String }, // (Optional) Constraints like time/memory limits

    correctAnswer: { type: String, required: true }, // Correct answer (text/code/output for MCQ or Code)

    explanation: { type: String } // (Optional) Explanation for the correct answer

}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
