// QuizPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";

const QuizPage = () => {
  const location = useLocation();
  const { career, difficulty, type } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [codeOutput, setCodeOutput] = useState("");
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userEmail = localStorage.getItem("userEmail");
  // Fetch Questions
  useEffect(() => {
    if (!career || !difficulty || !type) {
      console.error("Missing quiz parameters.");
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quiz/questions", {
          params: { career, difficulty, type },
        });

        if (!response.data || !response.data.questions || response.data.questions.length === 0) {
          console.error("No questions returned from API!");
          setQuestions([]);
          return;
        }

        setQuestions(response.data.questions);
        calculateTotalTime(response.data.questions.length);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [career, difficulty, type]);

  // Timer Management with Auto Submit
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          if (!autoSubmitted && !quizCompleted) handleAutoSubmit(); // Auto-submit once when time runs out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, autoSubmitted, quizCompleted]);

  // Add event listener for beforeunload
  useEffect(() => {
    // Only add the listener if quiz is in progress
    if (!loading && questions.length > 0 && !quizCompleted && !autoSubmitted) {
      const handleBeforeUnload = (e) => {
        // Cancel the event and show confirmation dialog
        e.preventDefault();
        // Auto-submit current progress
        handlePageLeaveSubmit();
        // Chrome requires returnValue to be set
        e.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [loading, questions, quizCompleted, autoSubmitted, userAnswers]);

  // Calculate Total Time
  const calculateTotalTime = (numQuestions) => {
    if (type === "MCQ") {
      setTimeLeft(40 * 60); // 40 minutes
    } else {
      setTimeLeft(numQuestions * 45 * 60); // 45 minutes per coding question
    }
  };

  // Handle MCQ Answer Select
const handleAnswerSelect = (answer) => {
  setSelectedAnswer(answer);
  setShowAnswer(true);
  setAnsweredQuestions(prev => prev + 1);

  // Store user's answer with more detailed structure
  const updatedAnswers = [...userAnswers];
  updatedAnswers[currentQuestionIndex] = { 
    questionId: questions[currentQuestionIndex]._id, 
    answer,
    questionType: "MCQ",
    isCorrect: answer === questions[currentQuestionIndex].correctAnswer
  };
  setUserAnswers(updatedAnswers);

  // Update score if correct
  if (answer === questions[currentQuestionIndex].correctAnswer) {
    setScore((prevScore) => prevScore + 1);
  }
};

 
  // Handle Next Question (Final auto submit when reaching last question)
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setUserCode("");
      setCodeOutput("");
      setShowAnswer(false);
    } else {
      if (window.confirm("Are you sure you want to submit the quiz?")) {
        handleSubmitAttempt(false); // Final submission when last question
        setQuizCompleted(true);
      }
    }
  };

  // Page Leave Auto-Submit Handler
  const handlePageLeaveSubmit = () => {
    // Only submit if not already submitting/submitted and we have answers
    if (!isSubmitting && !autoSubmitted && !quizCompleted && userAnswers.length > 0) {
      setIsSubmitting(true);
      
      // Calculate attempt data for backend
      const totalTime = type === "MCQ" ? 40 * 60 : questions.length * 45 * 60;
      const timeTaken = totalTime - timeLeft;
      
      // Send the data to our API endpoint synchronously using navigator.sendBeacon
      // This is more reliable for beforeunload events than async requests
      const data = JSON.stringify({
        email: userEmail,
        career,
        difficulty,
        type,
        questions: questions.map(q => q._id),
        answers: userAnswers,
        score,
        timeTaken,
        completed: true,
        autoSubmitted: true
      });
      
      // Use sendBeacon for more reliable delivery during page unload
      navigator.sendBeacon(
        "http://localhost:5000/api/quiz/auto-submit",
        new Blob([data], { type: 'application/json' })
      );
      
      setAutoSubmitted(true);
      setIsSubmitting(false);
      
      // Set session storage flag to indicate auto-submission happened
      // This will let us detect it when the user returns
      sessionStorage.setItem('quizAutoSubmitted', JSON.stringify({
        career,
        difficulty, 
        type,
        timestamp: Date.now()
      }));
    }
  };

  // Final Submission Handler (Common for both manual and auto submit)
  const handleSubmitAttempt = async (isAutoSubmitted) => {
    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);
    
    const totalTime = type === "MCQ" ? 40 * 60 : questions.length * 45 * 60;
    const timeTaken = totalTime - timeLeft;

    try {
      await axios.post("http://localhost:5000/api/quiz/submit-attempt", {
        email: userEmail,
        career,
        difficulty,
        type,
        questions: questions.map(q => q._id), // Correct format
        answers: userAnswers,
        score,
        timeTaken,
        completed: true,
        autoSubmitted: isAutoSubmitted,
      });
      console.log("Quiz attempt submitted successfully!");
      
      // If it's a manual submission, clear any auto-submit flags
      if (!isAutoSubmitted) {
        sessionStorage.removeItem('quizAutoSubmitted');
      }
    } catch (error) {
      console.error("Error submitting quiz attempt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto Submit Handler (Locks the quiz after auto-submit)
  const handleAutoSubmit = () => {
    if (quizCompleted || autoSubmitted) return; // Prevent double submission
    setAutoSubmitted(true);
    setQuizCompleted(true); // Prevent interaction
    handleSubmitAttempt(true); // Auto submit flag
  };

  // Check for previous auto-submission on component mount
  useEffect(() => {
    // Check if returning after auto-submit
    const autoSubmitData = sessionStorage.getItem('quizAutoSubmitted');
    
    if (autoSubmitData) {
      const submittedQuiz = JSON.parse(autoSubmitData);
      
      // If matches current quiz, mark as completed
      if (submittedQuiz.career === career && 
          submittedQuiz.difficulty === difficulty && 
          submittedQuiz.type === type) {
        setQuizCompleted(true);
        setAutoSubmitted(true);
      }
    }
  }, [career, difficulty, type]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      <p className="ml-3 text-indigo-600">Loading questions...</p>
    </div>
  );

  if (questions.length === 0) return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="text-red-500 text-xl mb-2">
        <svg className="w-8 h-8 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        No questions available.
      </div>
    </div>
  );

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 py-6">
        <div className="w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Quiz Completed!</h2>
            {autoSubmitted && <p className="text-orange-500 mt-2">This quiz was automatically submitted when you left the page.</p>}
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700">Your Score: <span className="font-bold text-indigo-600">{score}</span> / {questions.length}</p>
          </div>

          <button onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition duration-200">
            Retry Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="w-full bg-indigo-500 rounded-lg mb-8 py-8 px-6 text-center relative overflow-hidden">
        <div className="absolute w-40 h-40 rounded-full bg-indigo-400 opacity-20 -left-10 -top-10"></div>
        <div className="absolute w-32 h-32 rounded-full bg-indigo-400 opacity-20 -right-10 -bottom-10"></div>
        <h1 className="text-3xl font-bold text-white mb-2">Skill Challenge</h1>
        
        {/* Timer */}
        <div className="bg-white bg-opacity-20 rounded-full py-2 px-4 inline-block">
          <span className="text-white font-medium">
            Time Left: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 font-medium">Progress</span>
          <span className="text-indigo-600 font-medium">{answeredQuestions}/{questions.length} answered</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-500 h-2.5 rounded-full" 
            style={{ width: `${(answeredQuestions / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Question {currentQuestionIndex + 1}: {currentQuestion.question}
        </h2>

        {type === "MCQ" ? (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-3 rounded-md border transition duration-200 ${
                  selectedAnswer === option 
                    ? (showAnswer && option === currentQuestion.correctAnswer 
                      ? 'bg-green-100 border-green-500 text-green-800' 
                      : (showAnswer ? 'bg-red-100 border-red-500 text-red-800' : 'bg-indigo-100 border-indigo-500 text-indigo-800')) 
                    : (showAnswer && option === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700')
                }`}
                onClick={() => handleAnswerSelect(option)}
                disabled={showAnswer}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="code-editor">
            <div className="mb-3">
              <Editor
                height="300px"
                language="javascript"
                theme="vs-dark"
                value={userCode}
                onChange={(value) => setUserCode(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  automaticLayout: true,
                }}
                className="border rounded-md overflow-hidden"
              />
            </div>
            
            <button 
              onClick={handleRunCode} 
              disabled={showAnswer}
              className={`mb-4 px-4 py-2 rounded-md ${
                showAnswer 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }`}
            >
              Run Code
            </button>
            
            {codeOutput && (
              <div className="mt-4 p-3 bg-gray-100 rounded-md border border-gray-300">
                <div className="text-sm font-medium text-gray-700 mb-1">Output:</div>
                <div className="font-mono text-sm whitespace-pre-wrap">{codeOutput}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quiz Footer */}
      <div className="w-full bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
        <div>
          {showAnswer && type === "MCQ" && (
            <div className="text-green-600 font-medium">
              Correct Answer: {currentQuestion.correctAnswer}
            </div>
          )}
        </div>
        
        <button
          onClick={handleNextQuestion}
          disabled={!showAnswer}
          className={`px-6 py-2 rounded-md transition duration-200 ${
            showAnswer 
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;