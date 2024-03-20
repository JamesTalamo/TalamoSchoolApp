const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/userDB', userController.getAllUser) // to get all the Users

router.post('/register', userController.createUser); // to create new users

router.post('/login', userController.loginUser)

router.get('/logout', userController.logoutUser)

module.exports = router;
