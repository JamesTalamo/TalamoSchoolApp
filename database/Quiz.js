const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quizSchema = new Schema({
    question : {
        type: String,
        required: true
    },
    choice1 : {
        type: String,
        required:true
    },
    choice2 : {
        type: String,
        required: true
    },
    choice3: {
        type : String,
        required: true
    },
    correctAnswer : {
        type: String,
        required: true
    }
}, { versionKey: false })


module.exports = mongoose.model('Quiz', quizSchema);