const express = require('express')
const router = express.Router()
const quizControls = require('../controller/quizContoller')

router.get('/showQuiz', quizControls.showQuiz)

router.post('/addQuiz', quizControls.addQuiz)
router.get('/delQuiz', quizControls.delQuiz)

router.get('/resetAllScore', quizControls.resetQuizScore)
router.get('/quizScore', quizControls.changeQuizScore)


module.exports = router