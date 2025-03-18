const { scrapeCourses } = require("../utils/courseScraper"); 

exports.getCourses = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query) return res.status(400).json({ error: "Search query is required." });

        const courses = await scrapeCourses(query);
        return res.json({ courses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({ error: "Failed to fetch courses." });
    }
};
