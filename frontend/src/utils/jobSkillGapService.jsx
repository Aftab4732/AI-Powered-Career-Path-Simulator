//jobSkillGapService.jsx
import axios from "axios";

const API_URL = "http://localhost:5000/api/job-skill-gap";

export const fetchJobSkillGap = async (career, email, setCoursesLoading = null, setRecommendedCourses = null) => {
  try {
    const response = await axios.get(API_URL, { params: { career, email } });
    console.log("Job Skill Gap API Response:", response.data); // Debugging line

    const { missingSkills, weakSkills, recommendedCourses } = response.data;

    if (setCoursesLoading && setRecommendedCourses) {
      setCoursesLoading(true);
      await fetchCoursesAsync(recommendedCourses, setCoursesLoading, setRecommendedCourses);
    }

    return { missingSkills, weakSkills, recommendedCourses };

  } catch (error) {
    console.error("Error fetching job skill gap:", error);
    throw error;
  }
};



// const fetchCoursesAsync = async (recommendedCourses, setCoursesLoading, setRecommendedCourses) => {
//   try {
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay
//     setRecommendedCourses(recommendedCourses); // ✅ Properly update state
//     setCoursesLoading(false);
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     setCoursesLoading(false);
//   }
// };

