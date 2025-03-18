const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const getJobMarketTrends = async (req, res) => {
  try {
    const { career } = req.query;
    if (!career) {
      return res.status(400).json({ error: "Career parameter is required." });
    }

    const prompt = `
As a job market analyst, provide a comprehensive overview of the current job market for ${career}.
Include the following: 
1) current market demand and future growth projections,
2) salary ranges across entry, mid, and senior levels,
3) top hiring companies and locations, and 
4) list of related jobs and emerging roles in this field.
Return the response strictly as plain JSON with the keys and with key value pairs:
  "averageSalary{entry,mid,senior}", "jobDemand {current,future}
  ", "topCompanies", "relatedJobs", "emergingRoles"
with no markdown formatting.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);


    if (!result.response?.candidates || result.response.candidates.length === 0) {
      console.error("Gemini response does not contain valid candidates:", result);
      return res.status(500).json({ error: "Invalid Gemini API response format" });
    }

    const responseContent = result.response.candidates[0].content;
    const responseText = responseContent?.parts?.[0]?.text || "";

    if (!responseText.includes("{") || !responseText.includes("}")) {
      console.error("Gemini response does not contain JSON data:", responseText);
      return res.status(500).json({ error: "Gemini response is not JSON" });
    }


    const cleanedResponse = responseText.replace(/```json|```/g, "").trim();


    let jobMarketData;
    try {
      jobMarketData = JSON.parse(cleanedResponse);
    } catch (jsonError) {
      console.error("Error parsing Gemini response:", jsonError);
      return res.status(500).json({ error: "Failed to parse job market trends data" });
    }

    return res.json(jobMarketData);

  } catch (error) {
    console.error("Error fetching job market trends:", error);
    return res.status(500).json({ error: "Error fetching job market trends" });
  }
};



module.exports = { getJobMarketTrends };
