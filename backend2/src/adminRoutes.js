// adminRoutes.js
const express = require('express');
const router = express.Router();
const verifyAdminWithRefresh = require('./admin/verifyAdminWithRefresh')
const adminSignup =require('./admin/adminSignup')
const adminLogin =require('./admin/adminLogin')
const approve = require('./admin/approve');
const deleteUser = require('./admin/deleteUser');
const waitingUser = require('./admin/waitingUser');
const leaveUsers = require('./admin/leaveUsers');
const leaveApprove = require('./admin/leaveApprove');
const shiftApprove = require('./admin/shiftApprove');
const searchDepartment = require('./admin/searchDepartment');
const rejectLeave = require('./admin/rejectLeave');
const addEmployee = require('./admin/addEmployee');
const usersFeedback = require('./admin/usersFeedback');
const getShiftData = require('./admin/getShiftData')
const generateRefreshToken = require('./admin/generateRefreshToken')

router.use('/login',adminLogin)
router.use('/signup',adminSignup)
router.use('/approve', verifyAdminWithRefresh,approve);
router.use('/deleteUser', verifyAdminWithRefresh,deleteUser);
router.use('/userList', waitingUser);
router.use('/leaveUsers', leaveUsers);
router.use('/leaveApprove',verifyAdminWithRefresh, leaveApprove);
router.use('/getShiftData',getShiftData)
router.use('/shiftApprove', verifyAdminWithRefresh,shiftApprove);
router.use('/searchDepartment', searchDepartment);
router.use('/rejectLeave',verifyAdminWithRefresh, rejectLeave);
router.use('/addEmployee',verifyAdminWithRefresh, addEmployee);
router.use('/users-feedback',usersFeedback)
router.use('/refresh',generateRefreshToken)

module.exports = router;
