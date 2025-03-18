const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getJobTrendsData = async (req, res) => {
  try {
    const { career } = req.query;
    if (!career) {
      return res.status(400).json({ error: "Career parameter is required." });
    }

    const prompt = `
As a job market analyst, provide historical job demand trends for ${career}.
Return the response strictly as **valid JSON** with the structure:
{
  "historicalTrends": [
    { "year": 2017, "jobDemand":number },
    { "year": 2018, "jobDemand":number },
    { "year": 2019, "jobDemand":number },
    { "year": 2020, "jobDemand":number },
    { "year": 2021, "jobDemand":number },
    { "year": 2022, "jobDemand":number },
    { "year": 2023, "jobDemand":number },
    { "year": 2024, "jobDemand":number }
  ]
}
No markdown, no explanations—only valid JSON.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);


    if (!result.response?.candidates || result.response.candidates.length === 0) {
      console.error("Invalid Gemini API response format:", result);
      return res.status(500).json({ error: "Invalid Gemini API response format" });
    }

    const responseContent = result.response.candidates[0].content;
    const responseText = responseContent?.parts?.[0]?.text || "";


    if (!responseText.includes("{") || !responseText.includes("}")) {
      console.error("Gemini response does not contain JSON data:", responseText);
      return res.status(500).json({ error: "Gemini response is not JSON" });
    }


    const cleanedResponse = responseText.replace(/```json|```/g, "").trim();

 
    let jobTrendsData;
    try {
      jobTrendsData = JSON.parse(cleanedResponse);
    } catch (jsonError) {
      console.error("Error parsing Gemini response:", jsonError);
      return res.status(500).json({ error: "Failed to parse job market trends data" });
    }


    return res.json(jobTrendsData);

  } catch (error) {
    console.error("Error fetching job trends:", error);
    return res.status(500).json({ error: "Failed to fetch job market trends" });
  }
};

module.exports = { getJobTrendsData };
