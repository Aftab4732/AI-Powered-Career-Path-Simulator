require("dotenv").config();
const Anthropic = require("@anthropic-ai/sdk");
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateCareerRecommendations({ skills, experience, education }) {
  await sleep(2000);
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 150, // Reduced from 500
      temperature: 0.3, // Reduced from 0.7 for more focused responses
      messages: [
        {
          role: "user",
          content: `Skills: ${skills}
Experience: ${experience}
Education: ${education}
Suggest 3 specific career paths based on these qualifications. Be concise.`
        }
      ]
    });

    return response.content[0].text.trim();
  } catch (error) {
    console.error("Error in generateCareerRecommendations:", error);
    throw new Error("AI recommendation generation failed.");
  }
}

module.exports = { generateCareerRecommendations };