const express=require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

require('./src/database/config');
app.use(cors());
//user side===========================
const signup=require('./src/userRoutes/signup')
const login=require('./src/userRoutes/login')
const leave=require('./src/userRoutes/leave')
const getUser=require('./src/userRoutes/getUser')
const shift=require('./src/userRoutes/shift')
const updateprofile=require('./src/userRoutes/updateProfile')
const uploadImage=require('./src/userRoutes/uploadImage')
const searchUser =require('./src/userRoutes/searchUser')

// app.use('/user', require("user/index"))
// app.use('/admin', require("user/index"))

//user side===========================
app.use(signup)
app.use(login)
app.use(leave)
app.use(getUser)
app.use(shift)
app.use(updateprofile)
app.use(uploadImage)
app.use(searchUser)


// admin side=================================
const approve =require('./src/admin/approve')
const deleteUser =require('./src/admin/deleteUser')
const waitingUser =require('./src/admin/waitingUser')
const leaveUsers=require('./src/admin/leaveUsers')
const leaveApprove =require('./src/admin/leaveApprove')
const shiftApprove =require('./src/admin/shiftApprove')


app.use(approve)
app.use(deleteUser)
app.use(waitingUser)
app.use(leaveUsers)
app.use(leaveApprove)
app.use(shiftApprove)





app.listen(6700,()=>{
    console.log("port is running on 6300");
});
