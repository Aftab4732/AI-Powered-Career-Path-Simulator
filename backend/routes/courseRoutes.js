// const express = require("express");
// const { getCourses } = require("../app/courseController");

// const router = express.Router();

// router.get("/:query", getCourses);

// module.exports = router;


// const express = require("express");
// const { getCourses } = require("../app/courseController");
// const Course = require("../models/Course");

// const router = express.Router();

// // Fetch Udemy courses dynamically
// router.get("/:query", getCourses);

// // Save a liked course to the user profile
// router.post("/save-course", async (req, res) => {
//     try {
//         const { userId, course } = req.body;

//         // Validate userId and course object
//         if (!userId || typeof userId !== "string" || !course || typeof course !== "object") {
//             return res.status(400).json({ error: "Invalid input data." });
//         }

//         const savedCourse = new Course({ userId, ...course });
//         await savedCourse.save();

//         return res.json({ message: "Course saved successfully.", savedCourse });
//     } catch (error) {
//         console.error("Error saving course:", error.message || error);
//         return res.status(500).json({ error: "Failed to save course." });
//     }
// });

// module.exports = router;










const express = require("express");
const { getCourses } = require("../app/courseController");
const Course = require("../models/Course");
const router = express.Router();

// Fetch Udemy courses dynamically
router.get("/:query", getCourses);
router.get("/", async (req, res) => {
    try {
        const query = req.query.query || req.params.query;
        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }
        console.log("Fetching courses for:", query);

        const courses = await getCourses(query); // Ensure this function works
        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Failed to fetch courses" });
    }
});
// Save a liked course to the user profile
router.post("/save-course", async (req, res) => {
    try {
        const { userId, course } = req.body;

        // Validate userId and course object
        if (!userId || typeof userId !== "string" || !course || typeof course !== "object") {
            return res.status(400).json({ error: "Invalid input data." });
        }

        const savedCourse = new Course({ userId, ...course });
        await savedCourse.save();

        return res.json({ message: "Course saved successfully.", savedCourse });
    } catch (error) {
        console.error("Error saving course:", error.message || error);
        return res.status(500).json({ error: "Failed to save course." });
    }
});

// Fetch saved courses for a user
router.get("/saved-courses", async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ error: "User ID is required." });

        const savedCourses = await Course.find({ userId });
        return res.json({ savedCourses });
    } catch (error) {
        console.error("Error fetching saved courses:", error);
        return res.status(500).json({ error: "Failed to fetch saved courses." });
    }
});

// Delete a saved course
router.delete("/delete-course", async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        if (!userId || !courseId) return res.status(400).json({ error: "User ID and courseId are required." });

        await Course.findOneAndDelete({ _id: courseId, userId });
        return res.json({ message: "Course deleted successfully." });
    } catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({ error: "Failed to delete course." });
    }
});

module.exports = router;
