const jwt = require('jsonwebtoken')
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/dbConn');
const userRouter = require('./routes/User');
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const verifyRoles = require('./middleware/verifyRoles')

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(express.static('public'))

connectDB();

// API routes
app.use('/users', require('./routes/User'));

app.use('/getCookie', require('./routes/getCookie'))
app.use('/quiz', require('./routes/quiz'))

//static pages
app.use('/', require('./routes/Page'))


//verified pages
app.use(verifyJWT);
app.use('/verified', require('./routes/verifiedRoutes'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
