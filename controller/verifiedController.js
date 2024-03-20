const path = require('path')


//MAIN OF DASHBOARD
const studentDash = (req, res) => {
    res.sendFile(path.join(__dirname,'..','staticFolder','studentDash.html'))
}

const teacherDash = (req, res) => {
    res.sendFile(path.join(__dirname,'..','staticFolder','teacherDash.html'))
}
//MAIN OF DASHBOARD

//SUB PAGES STUDENT

const studentDashDash = (req, res) => {
    res.sendFile(path.join(__dirname,'..','staticFolder','studentDashRoutes','studentDash-dash.html'))
}

const studentDashUser = (req, res) => {
    res.sendFile(path.join(__dirname,'..','staticFolder','studentDashRoutes','studentDash-user.html'))
}

//SUB PAGES STUDENT

//SUB PAGES TEACHER

const teacherDashStudents = (req, res) => {
    res.sendFile(path.join(__dirname,'..','staticFolder','teacherDashRoutes','teacherDash-students.html'))
}

const teacherDashWork = (req,res) => {
    res.sendFile(path.join(__dirname,'..','staticFolder','teacherDashRoutes','teacherDash-work.html'))
}

const teacherDashWorkC = (req,res) => {
    res.sendFile(path.join(__dirname,'..','staticFolder','teacherDashRoutes','teacherDash-workC.html'))
}

const teacherDashUser = (req, res) => {
    res.sendFile(path.join(__dirname,'..','staticFolder','teacherDashRoutes','teacherDash-user.html'))
}

//SUB PAGES TEACHER



module.exports = {

    studentDash,
    studentDashDash,
    studentDashUser,

    teacherDash,
    teacherDashStudents,
    teacherDashWork,
    teacherDashWorkC,
    teacherDashUser

}