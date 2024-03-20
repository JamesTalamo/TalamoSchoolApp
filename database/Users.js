const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: Object,
        default: { Student: 1000 }
    },
    accessToken: {
        type: String,
        default: ""
    },
    created: {
        type: String, // Set to string type for the formatted date
        default: () => new Date().toLocaleDateString('en-CA') // Set to current date only
    },
    userScore: {
        type: Number,
        default: 0
    }
    
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);
