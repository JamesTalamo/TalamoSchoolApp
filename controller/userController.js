const User = require('../database/Users')
const bcrypt = require('bcrypt')


const jwt = require('jsonwebtoken')
require('dotenv').config()


const getAllUser = async (req, res) => {
    const allUser = await User.find()
    res.send(allUser)
}

const createUser = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ "error": "user and pwd are required!" })

    const dup = await User.findOne({ username: user }).exec();
    if (dup) return res.status(400).json({ "error": "user already exist!" })

    try {
        const hashPwd = await bcrypt.hash(pwd, 10)

        const result = await User.create({
            username: user,
            password: hashPwd
        })

        res.status(200).json({ result })

    } catch (err) {
        console.error(err)
    }
}

const loginUser = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ "error": "user and pwd are required!" })

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.status(400).json({ "error": "user does not exist!" })
    
    try {
        const match = await bcrypt.compare(pwd, foundUser.password)
        if (match) {

            // const roles = Object.values(foundUser.roles)// to see what roles are logging in
            // console.log(roles)

            const accessToken = jwt.sign(
                {
                    "username": foundUser.username,
                    "roles": foundUser.roles
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            )


            foundUser.accessToken = accessToken
            await foundUser.save();

            res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            res.status(200).json({ "Success": `Welcome ${user}` })
        } else {
            res.status(400).json({ "error": "wrong password" })
        }


    } catch (err) {
        console.error(err)
    }
}

const logoutUser = async (req, res) => {
    const cookie = req.cookies.jwt
    if (!cookie) return res.sendStatus(409)

    const foundUser = await User.findOne({ accessToken: cookie })
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 6 * 24 * 24 * 1000 })
        res.sendStatus(200)
    }

    if (foundUser) {
        foundUser.accessToken = ''
        const result = await foundUser.save()

        res.status(200).json({ result })
    }
}

const getCookie = async (req, res) => {
    const cookie = req.cookies

    res.send(cookie)
}


module.exports = {
    getAllUser,

    createUser,
    loginUser,
    logoutUser,

    getCookie
}
