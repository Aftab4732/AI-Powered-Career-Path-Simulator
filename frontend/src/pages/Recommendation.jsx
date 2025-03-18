// //recommendation.jsx

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { TextInput, Button, Card, Text, Title, Loader, Container } from "@mantine/core";
// import { fetchJobSkillGap } from "../utils/jobSkillGapService"; 
// import "../styles/Recommendation.css";

// const Recommendations = () => {
//   const userEmail = localStorage.getItem("userEmail");
//   const [profileData, setProfileData] = useState({ skills: "", experience: "", education: "", recommendedCareer: "" });
//   const [recommendations, setRecommendations] = useState([]);
//   const [jobSkillGapData, setJobSkillGapData] = useState({}); // Store job skill gaps for all careers
//   const [coursesLoading, setCoursesLoading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Fetch user profile on mount
//   useEffect(() => {
//     if (userEmail) {
//       axios.get(`http://localhost:5000/api/profile/email/${userEmail}`)
//         .then((response) => {
//           const formattedSkills = response.data.skills?.map(skillObj => skillObj.name) || [];
//           setProfileData({ ...response.data, skills: formattedSkills.join(", ") });
//         })
//         .catch((error) => console.error("Error fetching profile:", error));
//     }
//   }, [userEmail]);

//   // Generate recommendations
//   const handleGenerate = async () => {
//     if (!profileData.skills || !profileData.experience || !profileData.education) {
//       setError("Please enter skills, experience, and education.");
//       return;
//     }
  
//     setLoading(true);
//     setError("");
  
//     try {
//       const response = await axios.post("http://localhost:5000/api/recommendations", {
//         email: userEmail,
//         skills: profileData.skills.split(",").map(skill => skill.trim()),
//         experience: profileData.experience,
//         education: profileData.education,
//       });
  
//       const careers = response.data.careers || [];
//       setRecommendations(careers);
  
//       // Fetch skill gap for all recommended careers
//       const skillGapPromises = careers.map(async (career) => {
//         const { missingSkills, weakSkills } = await axios.get(
//           `http://localhost:5000/api/job-skill-gap?career=${career.title}&email=${userEmail}`
//         ).then(res => res.data);
//         return { [career.title]: { missingSkills, weakSkills } };
//       });
  
//       const allSkillGaps = await Promise.all(skillGapPromises);
//       setJobSkillGapData(Object.assign({}, ...allSkillGaps));
  
//     } catch (error) {
//       setError("Failed to fetch recommendations.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
  

//   // Confirm career selection and navigate to Courses page
//   const handleConfirmCareer = async (career) => {
//     try {
//       const careerTitle = career.title || career;
//       await axios.put(`http://localhost:5000/api/profile/select-career/${userEmail}`, {
//         recommendedCareer: careerTitle,
//       });
  
//       setProfileData((prevProfile) => ({ ...prevProfile, recommendedCareer: careerTitle }));
  
//       console.log("✅ Selected Career:", careerTitle);

//       navigate(`/courses?career=${encodeURIComponent(careerTitle)}`);

  
//     } catch (error) {
//       alert("Failed to confirm career.");
//     }
//   };
  
  

//   return (
//     <Container className="recommendation-container">
//       <div className="left-section">
//         <Title order={1} className="title">Career Recommendations</Title>

//         {error && <Text colour="red" align="center">{error}</Text>}

//         <div className="input-container">
//           <h2 className="skill">Skills</h2>
//           <TextInput
//             placeholder="Skills (comma-separated)"
//             value={profileData.skills}
//             onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
//           />
//           <TextInput
//             label="Experience"
//             placeholder="Experience"
//             value={profileData.experience}
//             onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
//           />
//           <TextInput
//             label="Education"
//             placeholder="Education"
//             value={profileData.education}
//             onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
//           />
//         </div>

//         <Button onClick={handleGenerate} className="generate-btn" loading={loading}>
//           {loading ? "Generating..." : "Generate Recommendations"}
//         </Button>
//         {loading && <Loader className="loading-message" />}
//       </div>

//       <div className="right-section">
//         <div className="recommendation-list">
//           {recommendations.length > 0 ? (
//             recommendations.map((rec, index) => (
//               <Card
//                 key={index}
//                 shadow="md"
//                 padding="lg"
//                 radius="md"
//                 className={`recommendation-card ${profileData.recommendedCareer === rec.title ? "selected" : ""}`}
//                 onClick={() => handleConfirmCareer(rec)}
//               >
//                 <div className="card-content">
//                   <Text weight={600}>{rec.title}</Text>
//                   <Text size="sm" className="desc">Description: {rec.description}</Text>
//                   <div className="hidden-content">
//                      <Text size="sm" className="desc">Growth Path: {rec.growthPath}</Text>
//                      <Text size="sm" className="desc">Improvement Tips: {rec.improvementTips}</Text>
//                   {/* Job Skill Gap Insights for Each Career */}
//                   {jobSkillGapData[rec.title] && (
//                     <div className="job-skill-gap-section">
//                       <Text size="sm" className="desc">Missing Skills: {jobSkillGapData[rec.title].missingSkills?.join(", ") || "None"}</Text>
//                       <Text size="sm" className="desc">Weak Skills: {jobSkillGapData[rec.title].weakSkills?.join(", ") || "None"}</Text>
//                     </div>
//                   )}
//                   </div>

//                   {profileData.recommendedCareer === rec.title && <Text color="green">✅ Selected</Text>}
//                 </div>
//               </Card>
//             ))
//           ) : (
//             !loading && <Text align="center">No recommendations available.</Text>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Recommendations;











import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextInput, Button, Card, Text, Title, Loader, Container, Badge } from "@mantine/core";
import "../styles/Recommendation.css";

const Recommendations = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [profileData, setProfileData] = useState({ skills: "", experience: "", education: "", recommendedCareer: "" });
  const [recommendations, setRecommendations] = useState([]);
  const [jobSkillGapData, setJobSkillGapData] = useState({});
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:5000/api/profile/email/${userEmail}`)
        .then((response) => {
          const formattedSkills = response.data.skills?.map(skillObj => skillObj.name) || [];
          setProfileData({ ...response.data, skills: formattedSkills.join(", ") });
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [userEmail]);

  // Generate recommendations
  const handleGenerate = async () => {
    if (!profileData.skills || !profileData.experience || !profileData.education) {
      setError("Please enter skills, experience, and education.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/recommendations", {
        email: userEmail,
        skills: profileData.skills.split(",").map(skill => skill.trim()),
        experience: profileData.experience,
        education: profileData.education,
      });
  
      const careers = response.data.careers || [];
      setRecommendations(careers);
  
      // Fetch skill gap for all recommended careers
      const skillGapPromises = careers.map(async (career) => {
        const { missingSkills, weakSkills } = await axios.get(
          `http://localhost:5000/api/job-skill-gap?career=${career.title}&email=${userEmail}`
        ).then(res => res.data);
        return { [career.title]: { missingSkills, weakSkills } };
      });
  
      const allSkillGaps = await Promise.all(skillGapPromises);
      setJobSkillGapData(Object.assign({}, ...allSkillGaps));
  
    } catch (error) {
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  // Confirm career selection and navigate to Courses page
  const handleConfirmCareer = async (career) => {
    try {
      const careerTitle = career.title || career;
      await axios.put(`http://localhost:5000/api/profile/select-career/${userEmail}`, {
        recommendedCareer: careerTitle,
      });
  
      setProfileData((prevProfile) => ({ ...prevProfile, recommendedCareer: careerTitle }));
      navigate(`/courses?career=${encodeURIComponent(careerTitle)}`);
    } catch (error) {
      alert("Failed to confirm career.");
    }
  };
  
  return (
    <Container className="recommendations-container" fluid>
      <div className="recommendations-content">
        <div className="recommendations-left-panel">
          <div className="recommendations-header">
            <Title order={2} className="recommendations-title">Career Pathfinder</Title>
            <Text className="recommendations-subtitle">Find your ideal career path based on your skills and experience</Text>
          </div>
          
          {error && <div className="recommendations-error">{error}</div>}
          
          <div className="recommendations-form">
            <div className="form-group">
              <label>Skills</label>
              <TextInput
                placeholder="Enter your skills (comma-separated)"
                value={profileData.skills}
                onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
                className="recommendations-input"
              />
            </div>
            
            <div className="form-group">
              <label>Experience</label>
              <TextInput
                placeholder="Years of experience & relevant roles"
                value={profileData.experience}
                onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                className="recommendations-input"
              />
            </div>
            
            <div className="form-group">
              <label>Education</label>
              <TextInput
                placeholder="Your educational background"
                value={profileData.education}
                onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                className="recommendations-input"
              />
            </div>
            
            <Button 
              onClick={handleGenerate} 
              className="recommendations-button"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Generating..." : "Discover Career Paths"}
            </Button>
          </div>
        </div>
        
        <div className="recommendations-right-panel">
          <div className="recommendations-results-header">
            <Title order={3}>Recommended Career Paths</Title>
            <Text color="dimmed">Click on a career to select it and view courses</Text>
          </div>
          
          {loading ? (
            <div className="recommendations-loading">
              <Loader size="lg" variant="dots" />
              <Text>Analyzing your profile and finding the best career matches...</Text>
            </div>
          ) : (
            <div className="recommendations-cards">
              {recommendations.length > 0 ? recommendations.map((rec, index) => (
                <Card 
                  key={index}
                  className={`recommendation-card ${profileData.recommendedCareer === rec.title ? "recommendation-card-selected" : ""}`}
                  onClick={() => handleConfirmCareer(rec)}
                >
                  <div className="recommendation-card-header">
                    <Title order={4}>{rec.title}</Title>
                    {profileData.recommendedCareer === rec.title && 
                      <Badge color="green" variant="filled" className="selected-badge">Selected</Badge>
                    }
                  </div>
                  
                  <Text className="recommendation-description">{rec.description}</Text>
                  
                  <div className="recommendation-details">
                    <div className="recommendation-detail-item">
                      <Text weight={600}>Growth Path</Text>
                      <Text>{rec.growthPath}</Text>
                    </div>
                    
                    <div className="recommendation-detail-item">
                      <Text weight={600}>Improvement Tips</Text>
                      <Text>{rec.improvementTips}</Text>
                    </div>
                    
                    {jobSkillGapData[rec.title] && (
                      <>
                        <div className="recommendation-skill-gap">
                          <Text weight={600}>Missing Skills</Text>
                          <div className="skill-tags">
                            {jobSkillGapData[rec.title].missingSkills?.length > 0 ? 
                              jobSkillGapData[rec.title].missingSkills.map((skill, i) => (
                                <Badge key={i} color="red" variant="light" className="skill-badge">{skill}</Badge>
                              )) : <Text size="sm">None</Text>
                            }
                          </div>
                        </div>
                        
                        <div className="recommendation-skill-gap">
                          <Text weight={600}>Weak Skills</Text>
                          <div className="skill-tags">
                            {jobSkillGapData[rec.title].weakSkills?.length > 0 ? 
                              jobSkillGapData[rec.title].weakSkills.map((skill, i) => (
                                <Badge key={i} color="yellow" variant="light" className="skill-badge">{skill}</Badge>
                              )) : <Text size="sm">None</Text>
                            }
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="recommendation-footer">
                    <Button 
                      className="view-courses-btn"
                      variant={profileData.recommendedCareer === rec.title ? "filled" : "outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConfirmCareer(rec);
                      }}
                    >
                      {profileData.recommendedCareer === rec.title ? "View Courses" : "Select Career"}
                    </Button>
                  </div>
                </Card>
              )) : (
                !loading && (
                  <div className="no-recommendations">
                    <Text align="center">No recommendations available yet. Generate recommendations to get started.</Text>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Recommendations;