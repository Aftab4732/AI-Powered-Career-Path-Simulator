const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'pro', 'expert'],
      default: 'beginner'
    }
  });

const ProfileSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    skills: [skillSchema], 
    experience: { type: String, default: "" },
    education: { type: String, default: "" },
    contact: { type: String, default: "" },
    birthDate: { type: String, default: "" },
    photo: {
        type: String, // Will store Base64 string
        maxLength: 5242880 // 5MB limit
      },
      resume: {
        text: String,
        info: {
          pages: Number,
          metadata: mongoose.Schema.Types.Mixed
        }
      },
    recommendedCareer: { type: String, default: "" }, // Suggested career from AI
    selectedCareer: { type: String, default: "" }, // User-selected career
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
