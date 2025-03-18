
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateDynamicLearningPath = async (career) => {
  const prompt = `As a career advisor, generate a detailed learning roadmap for someone pursuing a career as a ${career}. 
Include key milestones, skills to acquire, recommended courses or topics, and the order in which to learn them. 
Provide the roadmap strictly as a JSON array of objects, where each object has "step", "title", and "description" fields.`;
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const rawResponse = await result.response;
    let text = rawResponse.text().trim();

    if (text.startsWith("```json")) {
      text = text.substring(7).trim();
    }
    if (text.endsWith("```")) {
      text = text.substring(0, text.length - 3).trim();
    }

    const roadmap = JSON.parse(text);
    return roadmap;
  } catch (error) {
    console.error("Error generating learning path via Gemini:", error);

    return [
      { step: 1, title: "Fundamentals", description: "Learn the basic concepts and tools." },
      { step: 2, title: "Intermediate Skills", description: "Build upon fundamentals with practical projects." },
      { step: 3, title: "Advanced Topics", description: "Master advanced techniques and best practices." },
    ];
  }
};

const getLearningPath = async (req, res) => {
  try {
    const { career } = req.params;
    if (!career) {
      return res.status(400).json({ error: "Career parameter is required." });
    }
    const roadmap = await generateDynamicLearningPath(career);
    res.json({ career, roadmap });
  } catch (error) {
    console.error("Error in getLearningPath:", error);
    res.status(500).json({ error: "Failed to generate learning path." });
  }
};

module.exports = { getLearningPath };
