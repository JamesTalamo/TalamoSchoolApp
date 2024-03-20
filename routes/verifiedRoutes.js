const express = require('express')
const router = express.Router()
const verifiedControls = require('../controller/verifiedController')

const ROLES_LIST = require('../config/roles_list')
const verifyRoles = require('../middleware/verifyRoles')

router.get('/studentDash' , verifyRoles(ROLES_LIST.Student),verifiedControls.studentDash)
router.get('/studentDash/dash',verifyRoles(ROLES_LIST.Student), verifiedControls.studentDashDash)
router.get('/studentDash/user',verifyRoles(ROLES_LIST.Student), verifiedControls.studentDashUser)




router.get('/teacherDash' , verifyRoles(ROLES_LIST.Teacher),verifiedControls.teacherDash)
router.get('/teacherDash/students',verifyRoles(ROLES_LIST.Teacher), verifiedControls.teacherDashStudents)
router.get('/teacherDash/work', verifyRoles(ROLES_LIST.Teacher),verifiedControls.teacherDashWork)
router.get('/teacherDash/workC',verifyRoles(ROLES_LIST.Teacher), verifiedControls.teacherDashWorkC)
router.get('/teacherDash/user', verifyRoles(ROLES_LIST.Teacher),verifiedControls.teacherDashUser)

module.exports = router