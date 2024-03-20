const express = require('express')
const router = express.Router();
const cookieControls = require('../controller/userController')

router.get('/', cookieControls.getCookie)

module.exports = router 