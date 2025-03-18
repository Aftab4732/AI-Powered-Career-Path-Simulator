//QuizInstruction.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Text } from "@mantine/core";

const QuizInstructions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract data from location.state safely
  const { career, difficulty, type, mode = "Default" } = location.state || {};

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="w-full bg-indigo-500 rounded-lg mb-8 py-10 px-6 text-center relative overflow-hidden">
        <div className="absolute w-40 h-40 rounded-full bg-indigo-400 opacity-20 -left-10 -top-10"></div>
        <div className="absolute w-32 h-32 rounded-full bg-indigo-400 opacity-20 -right-10 -bottom-10"></div>
        <h1 className="text-4xl font-bold text-white mb-2">Challenge Instructions</h1>
        <div className="inline-block bg-indigo-400 bg-opacity-50 rounded-full px-5 py-2 text-white">
          <span>{mode} Mode</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center mb-3">
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium mr-2">{career}</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mr-2">{difficulty}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{type}</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Challenge Instructions</h2>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg mb-6">
          <div className="flex items-start mb-3">
            <div className="flex-shrink-0 bg-indigo-500 rounded-full p-1 mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="text-gray-700">The quiz is time-limited. Answer quickly!</p>
          </div>
          <div className="flex items-start mb-3">
            <div className="flex-shrink-0 bg-indigo-500 rounded-full p-1 mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="text-gray-700">Each correct answer earns points.</p>
          </div>
          <div className="flex items-start mb-3">
            <div className="flex-shrink-0 bg-indigo-500 rounded-full p-1 mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="text-gray-700">No negative marking for wrong answers.</p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-indigo-500 rounded-full p-1 mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="text-gray-700">Once submitted, you cannot change your answers.</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => navigate("/quiz-selection")}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-200"
          >
            Go Back
          </button>
          <button 
            onClick={() => navigate("/quiz", { state: { career, difficulty, type, mode } })}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-200"
            disabled={!career || !difficulty || !type}
          >
            Start Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;
