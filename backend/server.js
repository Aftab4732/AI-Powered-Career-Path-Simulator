const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// All route imports
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoute");
const careerSkillsRoutes = require("./routes/careerSkillRoutes");
const skillGapRoutes = require("./routes/skillGapRoutes");
const learningPathRoutes = require("./routes/learningPathRoutes");
const jobMarketRoutes = require("./routes/jobMarketRoutes");
const jobTrendsRoutes = require("./routes/jobTrendsRoutes");
const jobSkillGapRoutes = require("./routes/jobSkillGapRoutes");
const quizRoutes = require("./routes/quizRoutes");
const courseRoutes = require("./routes/courseRoutes");

const multer = require("multer");
const { generateCareerRecommendations } = require("./utils/gemini.js");

dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Use routes
app.use("/api/career-skills", careerSkillsRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/learning-path", learningPathRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/job-market-trends", jobMarketRoutes);
app.use("/api/job-trends", jobTrendsRoutes);
app.use("/api/job-skill-gap", jobSkillGapRoutes);
app.use("/api/quiz", quizRoutes);

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

// Multer setup
const upload = multer({ storage: multer.memoryStorage() });
app.post("/api/profile/create", upload.fields([{ name: "photo" }, { name: "resume" }]), async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) return res.status(400).json({ error: "Email and name are required" });
    res.json({ message: "Profile updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error while updating profile." });
  }
});

// Recommendations route
app.post("/api/recommendations", async (req, res) => {
  try {
    const profile = req.body;
    if (!profile.skills || !profile.experience || !profile.education) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const recommendations = await generateCareerRecommendations(profile);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
});

// MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`MongoDB Connected`);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error(error));
