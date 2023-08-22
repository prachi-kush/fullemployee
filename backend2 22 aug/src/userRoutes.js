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

router.use(bodyParser.json());

router.use('/signup', signup);
router.use('/login', login);
router.use('/leave', leave);
router.use('/getUser', getUser);
router.use('/shift', shift);
router.use('/updateprofile', updateprofile);
router.use('/uploadImage', uploadImage);
router.use('/searchUser', searchUser);
router.use('/feedback', feedback);
router.use('/birthday', birthday);

module.exports = router;
