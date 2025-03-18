const express = require("express");
const { getQuizQuestions,
    submitQuizAttempt, 
    getRecommendedQuizzes,
    autoSubmitQuiz
} = require("../app/quizController");

const router = express.Router();

// Route to fetch quiz questions 
router.get('/test', (req, res) => res.send('Test working!'));

router.get("/questions", getQuizQuestions);
router.post('/submit-attempt', submitQuizAttempt);
router.get('/recommendations', getRecommendedQuizzes);
router.post('/auto-submit', autoSubmitQuiz);


module.exports = router;
