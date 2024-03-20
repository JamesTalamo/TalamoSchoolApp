const express = require('express')
const router = express.Router()
const pageControls = require('../controller/pageController')

router.get('/register', pageControls.registerPage)
router.get('/login', pageControls.loginPage)


module.exports = router;