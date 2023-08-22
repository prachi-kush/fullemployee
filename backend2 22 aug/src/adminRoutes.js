// adminRoutes.js
const express = require('express');
const router = express.Router();
const approve = require('./admin/approve');
const deleteUser = require('./admin/deleteUser');
const waitingUser = require('./admin/waitingUser');
const leaveUsers = require('./admin/leaveUsers');
const leaveApprove = require('./admin/leaveApprove');
const shiftApprove = require('./admin/shiftApprove');
const searchDepartment = require('./admin/searchDepartment');
const rejectLeave = require('./admin/rejectLeave');
const addEmployee = require('./admin/addEmployee');

router.use('/approve', approve);
router.use('/deleteUser', deleteUser);
router.use('/waitingUser', waitingUser);
router.use('/leaveUsers', leaveUsers);
router.use('/leaveApprove', leaveApprove);
router.use('/shiftApprove', shiftApprove);
router.use('/searchDepartment', searchDepartment);
router.use('/rejectLeave', rejectLeave);
router.use('/addEmployee', addEmployee);

module.exports = router;
