require("dotenv").config();
const OpenAI = require( "openai");
const openai = new OpenAI(
  {apiKey: process.env.OPENAI_API_KEY}
);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));



async function generateCareerRecommendations({ skills, experience, education }) {
  await sleep(2000); 
    try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a career advisor." },
                {
                  role: "user",
                  content: `Given these qualifications:
                    Skills: ${skills}
                    Experience: ${experience}
                    Education: ${education}
                    What career paths would you recommend?`
                }
              ],
              
            });
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error in generateCareerRecommendations:", error);
        throw new Error("AI recommendation generation failed.");
    }
}

module.exports = { generateCareerRecommendations };
