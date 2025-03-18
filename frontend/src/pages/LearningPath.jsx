// frontend/src/pages/LearningPath.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LearningPath.css";

const LearningPath = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [career, setCareer] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // First, fetch the user's profile to get the selected career
  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/email/${userEmail}`);
        const profile = response.data;
        if (profile && profile.recommendedCareer) {
          setCareer(profile.recommendedCareer);
        } else {
          setError("No career selected. Please update your profile.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile data.");
      }
    };
    fetchCareer();
  }, [userEmail]);

  // Fetch the learning path from the backend based on the career
  useEffect(() => {
    const fetchLearningPath = async () => {
      if (!career) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/learning-path/${encodeURIComponent(career)}`);
        setRoadmap(response.data.roadmap);
      } catch (err) {
        console.error("Error fetching learning path:", err);
        setError("Failed to fetch learning path.");
      } finally {
        setLoading(false);
      }
    };
    fetchLearningPath();
  }, [career]);

  if (loading) {
    return <div className="loading">Loading learning path...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="learning-path-container">
      <div className="header-banner">
        <h1>Learning Path</h1>
        <div className="career-label">{career}</div>
        <div className="action-button">
          <span className="icon">📚</span> View Resources
        </div>
      </div>

      <div className="tabs-container">
        <div className="tab active">
          <div className="tab-icon">📋</div>
          <div>Roadmap</div>
        </div>
      </div>

      <div className="roadmap">
        {roadmap.map((step) => (
          <div key={step.step} className="roadmap-step">
            <div className="step-header">
              <div className="step-number">Step {step.step}</div>
              
            </div>
            <div className="step-details">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;