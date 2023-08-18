// userRoutes.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const signup = require('./userRoutes/signup');
const login = require('./userRoutes/login');
const leave = require('./userRoutes/leave');
const getUser = require('./userRoutes/getUser');
const shift = require('./userRoutes/shift');
const updateprofile = require('./userRoutes/updateProfile');
const uploadImage = require('./userRoutes/uploadImage');
const searchUser = require('./userRoutes/searchUser');
const feedback = require('./userRoutes/feedback');
const birthday = require('./userRoutes/birthday');
const getShiftData = require('./admin/getShiftData')
const verifyToken = require('../src/auth/verifyToken'); 
const generateRefreshToken = require('./userRoutes/generateRefreshToken')


router.use(bodyParser.json());
router.use('/signup', signup);
router.use('/login', login);
router.use('/applyLeave', leave);
router.use('/getUser', getUser);
router.use('/chooseshift',shift);
router.use('/getShiftData',getShiftData)
router.use('/updateprofile', updateprofile);
router.use('/searchUser', searchUser);
router.use('/feedback' ,feedback);
router.use('/birthday', birthday);
router.use('/refresh',generateRefreshToken)


module.exports = router;
