//QuizSelection.jsx
import React, { useState, useEffect } from "react";
import { Select, Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizSelectionPage = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "";
  const [career, setCareer] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, settype] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/email/${userEmail}`);
        const profile = response.data;
        

        if (profile?.recommendedCareer) {
          setCareer(profile.recommendedCareer);
          setError(""); // Clear error if career is found
        } else {
          setError("No career selected. Please update your profile.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile data.");
      }
    };

    if (userEmail.trim()) {
      fetchCareer();
    }
  }, [userEmail]);

  const startQuiz = () => {
    if (!career || !difficulty || !type) {
      alert("Please select all fields before starting the quiz!");
      return;
    }
    navigate(`/quiz-instructions`, { state: { career, difficulty, type } });
  };
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 py-6">
      {/* Header Banner - similar to Job Market Trends */}
      <div className="w-full bg-indigo-500 rounded-lg mb-8 py-10 px-6 text-center relative overflow-hidden">
        <div className="absolute w-40 h-40 rounded-full bg-indigo-400 opacity-20 -left-10 -top-10"></div>
        <div className="absolute w-32 h-32 rounded-full bg-indigo-400 opacity-20 -right-10 -bottom-10"></div>
        <h1 className="text-4xl font-bold text-white mb-2">Skill Challenge</h1>
        <div className="inline-block bg-indigo-400 bg-opacity-50 rounded-full px-5 py-2 text-white">
          <span>{career || "Select a career path"}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Select Your Challenge</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Career Path</label>
          <div className="p-3 bg-gray-100 rounded-md text-gray-800 font-medium">
            {career || "Loading..."}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Quiz Type</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => settype(e.target.value)}
          >
            <option value="">Choose quiz type</option>
            <option value="MCQ">Multiple Choice (MCQ)</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Select Difficulty</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Choose difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>


        <button 
          onClick={startQuiz} 
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-md transition duration-200"
          disabled={!career || !!error}
        >
          Start Challenge
        </button>
      </div>
    </div>
  );
};

export default QuizSelectionPage;
