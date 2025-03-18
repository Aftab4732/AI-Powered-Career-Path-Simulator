const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt"); 
const Question = require("../models/Question"); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getQuizQuestions = async (req, res) => {
  try {
    const { career, difficulty, type, email, forceGenerate } = req.query;

    if (!career || !difficulty || !type) {
      return res.status(400).json({ error: "Missing career, difficulty, or type" });
    }

    if (email) {
      const unfinishedAttempt = await QuizAttempt.findOne({
        email,
        career,
        difficulty,
        type,
        completed: false,
      });

      if (unfinishedAttempt) {
        const answeredCount = unfinishedAttempt.answers.length || 0;
        const remainingQuestions = unfinishedAttempt.questions.slice(answeredCount);
        return res.json({
          questions: remainingQuestions,
          resume: true,
          answeredCount
        });
      }
    }

    let quizQuestions = await Quiz.aggregate([
      { $match: { career, difficulty, type } },
      { $sample: { size: type === 'MCQ' ? 30 : 2 } } 
    ]);

    if (quizQuestions.length > 0 && !forceGenerate) {
      return res.json({ questions: quizQuestions });
    }

    const aiQuestions = await generateQuizWithAI(career, difficulty, type);

    if (!aiQuestions.length) return res.status(500).json({ error: "Failed to generate questions" });

    const questionsToSave = aiQuestions.map(q => ({
      ...q,
      career,
      difficulty,
      type
    }));

    await Quiz.insertMany(questionsToSave);
    return res.json({ questions: questionsToSave });

  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    res.status(500).json({ error: "Server error" });
  }
};



const submitQuizAttempt = async (req, res) => {
  try {
    const {
      email,
      career,
      difficulty,
      type,
      questions,
      answers,   
      score,
      timeTaken,
      completed,
      autoSubmitted
    } = req.body;

    const attemptData = {
      email,
      career,
      difficulty,
      type,
      questions,
      answers,
      score,
      timeTaken,
      completed,
      autoSubmitted,
      attemptedAt: new Date() 
    };
    if (!questions || !Array.isArray(questions) || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Questions and answers must be provided as arrays." });
    }
    

    const newAttempt = new QuizAttempt(attemptData);
    await newAttempt.save();

    res.status(200).json({ message: 'Quiz attempt submitted successfully!' });

  } catch (error) {
    console.error('Error submitting quiz attempt:', error);
    res.status(500).json({ error: 'Failed to submit quiz attempt.' });
  }
};





const getRecommendedQuizzes = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Missing user email" });

    const weakAttempts = await QuizAttempt.find({
      email,
      completed: true,
      score: { $lt: 50 }
    }).sort({ attemptedAt: -1 }).limit(5);

    if (!weakAttempts.length) {
      return res.json({ recommendations: [] });
    }


    const seen = new Set();
    const weakAreas = [];

    weakAttempts.forEach(attempt => {
      const key = `${attempt.career}-${attempt.difficulty}-${attempt.type}`;
      if (!seen.has(key)) {
        weakAreas.push({
          career: attempt.career,
          difficulty: attempt.difficulty,
          type: attempt.type
        });
        seen.add(key);
      }
    });

    res.json({ recommendations: weakAreas });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Server error" });
  }
};



const autoSubmitQuiz = async (req, res) => {
  try {
    const {
      email,
      career,
      difficulty,
      type,
      questions,
      answers,
      score,
      timeTaken
    } = req.body;

    if (!questions || !Array.isArray(questions) || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Questions and answers must be arrays." });
    }

    const existingAttempt = await QuizAttempt.findOne({
      email,
      career,
      difficulty,
      type,
      completed: false
    });

    if (existingAttempt) {

      existingAttempt.answers = answers;
      existingAttempt.score = score;
      existingAttempt.timeTaken = timeTaken;
      existingAttempt.completed = true;
      existingAttempt.autoSubmitted = true;
      existingAttempt.attemptedAt = new Date();

      await existingAttempt.save();

      return res.status(200).json({ message: "Quiz auto-submitted successfully!" });
    } else {

      const attemptData = {
        email,
        career,
        difficulty,
        type,
        questions,
        answers,
        score,
        timeTaken,
        completed: true,
        autoSubmitted: true,
        attemptedAt: new Date()
      };

      const newAttempt = new QuizAttempt(attemptData);
      await newAttempt.save();

      return res.status(200).json({ message: "New auto-submitted quiz attempt saved!" });
    }
  } catch (error) {
    console.error("Error during auto-submit:", error);
    res.status(500).json({ error: "Failed to auto-submit quiz." });
  }
};



const generateQuizWithAI = async (career, difficulty, type) => { 
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


    let promptType;
    if (type === "MCQ") {
      promptType = "Generate exactly 30 multiple-choice questions (MCQs) for";
    } else if (type === "Code") {
      promptType = "Generate exactly 2 coding questions for";
    } else {

      promptType = "Generate exactly 15 multiple-choice questions (MCQs) and 3 coding questions for";
    }

    const prompt = `${promptType} a ${career} career at ${difficulty} difficulty level.

    ${type === "MCQ" || type === "Both" ? `**MCQ Questions:**
    - Each MCQ must have a **question**, four **options**, and a **correct answer**.
    - Assign a **reasonable time limit in seconds**.` : ""}

    ${type === "Code" || type === "Both" ? `**Coding Questions:**
    - Each question must include a **clear problem statement** without providing the function signature.
    - Provide a **sample input** and the **expected output** as JSON.
    - Include a **detailed explanation** of how the expected output is derived.
    - Assign a **reasonable time limit in seconds**.` : ""}

    Return ONLY valid JSON with no additional text. Ensure all JSON values are correctly escaped.
    Format the response as follows:
    {
      ${type === "MCQ" || type === "Both" ? `"mcqs": [
        {
          "question": "Sample MCQ?",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "A",
          "timeLimit": 60
        }
      ]${type === "Both" ? "," : ""}` : ""}
      ${type === "Code" || type === "Both" ? `"coding": [
        {
          "problemStatement": "Given a list of numbers, find the maximum element.",
          "sampleInput": { "numbers": [1, 5, 3, 9, 2] },
          "expectedOutput": 9,
          "explanation": "The maximum element in [1, 5, 3, 9, 2] is 9.",
          "timeLimit": 300
        }
      ]` : ""}
    }`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();
    
    let extractedData;
    
    try {

      responseText = responseText.replace(/```json|```/g, "").trim();
    
      let jsonStartIndex = responseText.indexOf('{');
      let jsonEndIndex = responseText.lastIndexOf('}');
      
      if (jsonStartIndex >= 0 && jsonEndIndex >= 0) {
        responseText = responseText.substring(jsonStartIndex, jsonEndIndex + 1);
      }
      
      extractedData = JSON.parse(responseText);
    } catch (initialError) {
      console.error("Initial JSON parse failed:", initialError.message);
      

      try {

        const fixedText = responseText
          .replace(/(\w+):'([^']*)'/g, '"$1":"$2"')
          .replace(/'/g, '"')
          .replace(/(\w+):/g, '"$1":') 
          .replace(/:\s*"([^"]*),([^"]*)"/g, ':"$1,$2"');
        
        extractedData = JSON.parse(fixedText);
      } catch (basicFixError) {
        console.error("Basic JSON fixes failed:", basicFixError.message);
        

        try {

          if (type === "Code" || type === "Both") {
            const codingData = { coding: [] };
            

            const problemRegex = /"problemStatement"\s*:\s*"([^"]*)"/g;
            const sampleInputRegex = /"sampleInput"\s*:\s*({[^}]*})/g;
            const expectedOutputRegex = /"expectedOutput"\s*:\s*([^,\n]*)/g;
            const explanationRegex = /"explanation"\s*:\s*"([^"]*)"/g;
            const timeLimitRegex = /"timeLimit"\s*:\s*(\d+)/g;
            

            const problems = [...responseText.matchAll(problemRegex)].map(m => m[1]);
            const sampleInputs = [...responseText.matchAll(sampleInputRegex)].map(m => m[1]);
            const expectedOutputs = [...responseText.matchAll(expectedOutputRegex)].map(m => m[1]);
            const explanations = [...responseText.matchAll(explanationRegex)].map(m => m[1]);
            const timeLimits = [...responseText.matchAll(timeLimitRegex)].map(m => parseInt(m[1]));
            

            for (let i = 0; i < problems.length; i++) {
              try {
                const sampleInput = sampleInputs[i] ? JSON.parse(sampleInputs[i]) : {};
                const expectedOutput = expectedOutputs[i] ? 
                  (expectedOutputs[i].startsWith('{') ? 
                    JSON.parse(expectedOutputs[i]) : 
                    isNaN(expectedOutputs[i]) ? 
                      expectedOutputs[i].replace(/['"]/g, '') : 
                      Number(expectedOutputs[i])
                  ) : null;
                
                codingData.coding.push({
                  problemStatement: problems[i] || `Coding Problem ${i+1}`,
                  sampleInput: sampleInput,
                  expectedOutput: expectedOutput,
                  explanation: explanations[i] || "",
                  timeLimit: timeLimits[i] || 300
                });
              } catch (parsingError) {
                console.error(`Error parsing question ${i}:`, parsingError.message);
              }
            }
            
            if (codingData.coding.length > 0) {
              extractedData = codingData;

            } else {
              throw new Error("Failed to extract any coding questions");
            }
          }
          

          if ((type === "MCQ" || type === "Both") && (!extractedData || !extractedData.mcqs)) {

            const mcqData = { mcqs: [] };

            const questionRegex = /"question"\s*:\s*"([^"]*)"/g;
            const optionsRegex = /"options"\s*:\s*\[((?:"[^"]*"(?:,\s*)?)+)\]/g;
            const correctAnswerRegex = /"correctAnswer"\s*:\s*"([^"]*)"/g;
            const timeLimitRegex = /"timeLimit"\s*:\s*(\d+)/g;
            

            const questions = [...responseText.matchAll(questionRegex)].map(m => m[1]);
            const optionsSets = [...responseText.matchAll(optionsRegex)].map(m => {
              try {
                return JSON.parse(`[${m[1]}]`);
              } catch {

                const optionsText = m[1];
                return optionsText.split(',').map(opt => opt.trim().replace(/^"|"$/g, ''));
              }
            });
            const correctAnswers = [...responseText.matchAll(correctAnswerRegex)].map(m => m[1]);
            const timeLimits = [...responseText.matchAll(timeLimitRegex)].map(m => parseInt(m[1]));

            for (let i = 0; i < questions.length; i++) {
              try {
                mcqData.mcqs.push({
                  question: questions[i] || `MCQ Question ${i+1}`,
                  options: Array.isArray(optionsSets[i]) && optionsSets[i].length === 4 
                    ? optionsSets[i] 
                    : ["Option A", "Option B", "Option C", "Option D"],
                  correctAnswer: correctAnswers[i] || "Option A",
                  timeLimit: timeLimits[i] || 60
                });
              } catch (parsingError) {
                console.error(`Error parsing MCQ ${i}:`, parsingError.message);
              }
            }
            
            if (mcqData.mcqs.length > 0) {
              if (!extractedData) {
                extractedData = mcqData;
              } else {
                extractedData.mcqs = mcqData.mcqs;
              }
            } else if (type === "MCQ") {
              throw new Error("Failed to extract any MCQ questions");
            }
          }
        } catch (regexError) {
          console.error("Regex extraction failed:", regexError.message);

          if (type === "Code") {
            extractedData = {
              coding: [{
                problemStatement: "Please try again. Failed to generate a valid coding question.",
                sampleInput: "{}",
                expectedOutput: "{}",
                explanation: "Error occurred during question generation.",
                timeLimit: 300
              }]
            };
          } else if (type === "MCQ") {
            extractedData = {
              mcqs: [{
                question: "Please try again. Failed to generate a valid MCQ.",
                options: ["Option A", "Option B", "Option C", "Option D"],
                correctAnswer: "Option A",
                timeLimit: 60
              }]
            };
          } else if (type === "Both" && !extractedData) {
            extractedData = {
              mcqs: [{
                question: "Please try again. Failed to generate a valid MCQ.",
                options: ["Option A", "Option B", "Option C", "Option D"],
                correctAnswer: "Option A",
                timeLimit: 60
              }],
              coding: [{
                problemStatement: "Please try again. Failed to generate a valid coding question.",
                sampleInput: "{}",
                expectedOutput: "{}",
                explanation: "Error occurred during question generation.",
                timeLimit: 300
              }]
            };
          }
        }
      }
    }
    

    if (!extractedData) {
      console.error("All JSON extraction methods failed");
      return [];
    }
    
    let aiQuestions = [];


    if ((type === "MCQ" || type === "Both") && extractedData.mcqs && Array.isArray(extractedData.mcqs)) {


      aiQuestions.push(
        ...extractedData.mcqs.map(q => ({
          career,
          skill: "General",
          type: "MCQ",
          difficulty,
          question: q.question || "Question unavailable",
          options: Array.isArray(q.options) ? q.options : ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: q.correctAnswer || "Option A",
          timeLimit: q.timeLimit || 60
        }))
      );
    }

    if ((type === "Code" || type === "Both") && extractedData.coding && Array.isArray(extractedData.coding)) {

      aiQuestions.push(
        ...extractedData.coding.map(q => ({
          career,
          skill: "General",
          type: "Coding",
          difficulty,
          problemStatement: q.problemStatement || "Problem statement unavailable",
          sampleInput: typeof q.sampleInput === 'object' ? JSON.stringify(q.sampleInput) : "{}",
          expectedOutput: typeof q.expectedOutput === 'object' ? 
            JSON.stringify(q.expectedOutput) : 
            (q.expectedOutput !== undefined ? String(q.expectedOutput) : "{}"),
          explanation: q.explanation || "Explanation unavailable",
          timeLimit: q.timeLimit || 300
        }))
      );
    }




    return aiQuestions.map(q => ({
      career,
      skill: "General",
      type: q.type,
      difficulty,
      question: q.type === "MCQ" ? q.question : q.problemStatement,
      options: q.type === "MCQ" ? q.options : undefined,
      correctAnswer: q.type === "MCQ" ? q.correctAnswer : undefined,
      problemStatement: q.type === "MCQ" ? undefined : q.problemStatement,
      sampleInput: q.type === "MCQ" ? undefined : q.sampleInput,
      expectedOutput: q.type === "MCQ" ? undefined : q.expectedOutput,
      explanation: q.type === "MCQ" ? undefined : q.explanation,
      timeLimit: q.timeLimit || (q.type === "MCQ" ? 60 : 300)
    }));
    
  } catch (error) {
    console.error("Error generating AI quiz:", error);

    if (type === "Code") {
      return [{
        career,
        skill: "General",
        type: "Coding",
        difficulty,
        question: "Write a function to reverse a string.",
        problemStatement: "Write a function to reverse a string.",
        sampleInput: JSON.stringify({"input": "hello"}),
        expectedOutput: JSON.stringify("olleh"),
        explanation: "The function should return the input string with characters in reverse order.",
        timeLimit: 300
      }];
    } else {
      return [{
        career,
        skill: "General",
        type: "MCQ",
        difficulty,
        question: "Which data structure uses LIFO ordering?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: "Stack",
        timeLimit: 60
      }];
    }
  }
};

module.exports = { 
  getQuizQuestions,
  submitQuizAttempt,
  getRecommendedQuizzes, 
  autoSubmitQuiz,
};