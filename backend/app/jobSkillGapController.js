const User = require("../models/User");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { scrapeCourses } = require("../utils/courseScraper");

// Use your Gemini API Key
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const getJobSkillGap = async (req, res) => {
  try {
    const { career, email } = req.query;
    if (!career || !email) {
      return res.status(400).json({ error: "Missing career or email" });
    }


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userSkills = user.skills || [];

    console.log(`Fetching skills for: ${career}`);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are an AI expert in job market analysis. Provide a list of the **top 10 essential skills** required for a career as a **${career}**.
      Format the response strictly in JSON like this:
      {
        "skills": ["Skill1", "Skill2", "Skill3", ..., "Skill10"]
      }
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();


    responseText = responseText.replace(/```json|```/g, "").trim();

    let jobSkills = [];
    try {
      jobSkills = JSON.parse(responseText).skills || [];
    } catch (error) {
      console.error("Failed to parse Gemini response:", responseText);
      return res.status(500).json({ error: "Invalid response from Gemini AI" });
    }

    if (jobSkills.length === 0) {
      return res.status(404).json({ error: "No job skill data found" });
    }

    const missingSkills = jobSkills.filter(skill => !userSkills.includes(skill));
    const weakSkills = userSkills.filter(skill => jobSkills.includes(skill));

    return res.json({
      career,
      missingSkills,
      weakSkills
    });

  } catch (error) {
    console.error("Error fetching skill gap insights:", error);
    res.status(500).json({ error: "Server error" });
  }
};




module.exports = { getJobSkillGap};



