const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    email: { type: String, required: true }, // User's email instead of userId
    title: { type: String, required: true },
    url: { type: String, required: true },
    platform: { type: String, required: true }, // Example: "Udemy"
});

module.exports = mongoose.model("Course", CourseSchema);
