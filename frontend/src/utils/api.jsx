import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fetch career recommendations
export const fetchRecommendations = async (profile) => {
  try {
    const response = await instance.post("/recommendations", profile);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch career path
export const getCareerPath = async (userId) => {
  try {
    const response = await instance.get(`/profile/career-path/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching career path:", error.response?.data || error.message);
    return null;
  }
};

// Fetch profile by email
export const fetchProfile = async (email) => {
  try {
    const response = await instance.get(`/profile/email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);
    throw error;
  }
};
export const updateProfile = async (userData) => {
  try {
    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("name", userData.name);
    formData.append("skills", userData.skills);
    formData.append("experience", userData.experience);
    formData.append("education", userData.education);
    formData.append("contact", userData.contact);
    formData.append("birthDate", userData.birthDate);
    formData.append("selectedCareer", userData.selectedCareer);

    // Append files if available
    if (userData.photoFile) {
      formData.append("photo", userData.photoFile);
    }
    if (userData.resumeFile) {
      formData.append("resume", userData.resumeFile);
    }

    // Send request with multipart/form-data
    const response = await axios.post(
      "http://localhost:5000/api/profile/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);
    throw error;
  }
};
//fetching course
export const fetchUdemyCourses = async (query) => {
  try {
    const response = await instance.get(`/courses/${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Udemy courses:", error.response?.data || error.message);
    throw error;
  }
};


export default instance;








// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api";
// const instance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Fetch career recommendations
// export const fetchRecommendations = async (profile) => {
//   try {
//     const response = await instance.post("/recommendations", profile);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching recommendations:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // Fetch career path
// export const getCareerPath = async (userId) => {
//   try {
//     const response = await instance.get(`/profile/career-path/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching career path:", error.response?.data || error.message);
//     return null;
//   }
// };

// // Fetch profile by email
// export const fetchProfile = async (email) => {
//   try {
//     const response = await instance.get(`/profile/email/${email}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching profile:", error.response?.data || error.message);
//     throw error;
//   }
// };
// export const updateProfile = async (userData) => {
//   try {
//     const formData = new FormData();
//     Object.keys(userData).forEach(key => {
//       if (userData[key] !== null && userData[key] !== undefined) {
//         formData.append(key, userData[key]);
//       }
//     });

//     const response = await instance.post("/profile/create", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error updating profile:", error.response?.data || error.message);
//     throw error;
//   }
// };
// //fetching course
// export const fetchUdemyCourses = async (query) => {
//   try {
//     const response = await instance.get(`/courses/${query}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching Udemy courses:", error.response?.data || error.message);
//     throw error;
//   }
// };


// export default instance;
