const path = require('path')

const loginPage = (req,res) => {
    res.sendFile(path.join(__dirname,'..','staticFolder','login.html'))
}

const registerPage = (req, res) => {
    res.sendFile(path.join(__dirname,'..','staticFolder','register.html'))
}

module.exports = {
    loginPage,
    registerPage
}