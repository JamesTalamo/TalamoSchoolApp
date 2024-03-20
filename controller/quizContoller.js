const Quiz = require('../database/Quiz')
const User = require('../database/Users')

const showQuiz = async (req, res) => {
    const allQuiz = await Quiz.find()
    res.send(allQuiz)
}

const addQuiz = async (req, res) => {
    const {question , choice1 , choice2 , choice3 ,correctAnswer} = req.body
    if(!question || !choice1 || !choice2 || !choice3 || !correctAnswer) return res.status(400).json({"error" : "you need to fill out the parameter!"})

    try { 

        const newQuiz = await Quiz.create({
            question : question,
            choice1 : choice1,
            choice2 : choice2,
            choice3 : choice3,
            correctAnswer : correctAnswer
        })

        return res.status(201).json({ message: 'Quiz added successfully' });

    }catch{
        res.sendStatus(400)
    }

}

const delQuiz = async (req, res) => {
    try {
        await Quiz.deleteMany({});
        res.sendStatus(201)
       
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}   

const resetQuizScore = async (req, res) => {
    await User.updateMany({}, { $set: { userScore: 0 } });
}

const changeQuizScore = async (req, res) => {
    const cookies = req.cookies.jwt
    try {
        const user = await User.find({});
        const exist = user.find(person => person.accessToken === cookies)
        if (exist) {
            exist.userScore++;
            await exist.save(); // Save the changes back to the database
        }
    } catch (error) {
        console.error('Error finding user:', error);
        // Handle error
    }

}

module.exports = {
    showQuiz,
    addQuiz,
    delQuiz,
    
    resetQuizScore,
    changeQuizScore
}