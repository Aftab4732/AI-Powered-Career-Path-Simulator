require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateCareerRecommendations({ skills, experience, education }) {
  await sleep(2000);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Explicitly ask Gemini to return pure JSON without Markdown
    const prompt = `As a career advisor, analyze these qualifications and suggest at least 5 career paths:
    - Skills: ${skills}
    - Experience: ${experience}
    - Education: ${education}

    Please return a JSON object in this strict format (without Markdown or extra text):

    {
      "careers": [
        {
          "title": "Career Name",
          "description": "Description of the career not more than 3-4 lines",
          "growthPath": "Steps to grow in this career",
          "improvementTips": ["Tip 1", "Tip 2", "Tip 3"]
        }
      ]
    }`;

    // Generate response
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    console.log("Raw AI Response:", text); // Debugging: Check the AI response

    // Ensure the response is strictly JSON by finding the first `{` and last `}`
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Invalid JSON format received from Gemini.");
    }

    const cleanJson = text.substring(jsonStart, jsonEnd + 1);


    const parsedData = JSON.parse(cleanJson);

    return parsedData;

  } catch (error) {
    console.error("Error in generateCareerRecommendations:", error);
    throw new Error("AI recommendation generation failed.");
  }
}

const generateCareerSkills = async (career) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `List the most essential skills required for a career as a ${career}. Only return a comma-separated list of skills.`;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Convert response to an array
    return responseText.split(",").map(skill => skill.trim());
  } catch (error) {
    console.error("Error fetching skills from Gemini:", error);
    return [];
  }
};

module.exports = { generateCareerRecommendations, generateCareerSkills };