const bcrypt = require('bcrypt');
const express=require('express');
const router=express.Router()
const userSchema = require('../database/schema');
var jwt = require('jsonwebtoken');
const secretAccesskey='hewfehfhbgbshfbeheheh22122hhgfkdvbpdmgdnAfhcgdfd'

router.post('/login', async (req, res, next) => {
    console.log(req.body,"=================>req.body");
    try {
        const { email, password } = req.body;

        const user = await userSchema.findOne({ email });
        console.log(user,"user")
        if (!user) {
            return res.send("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("isPasswordValid",isPasswordValid)
        if (!isPasswordValid) {
            return res.send("Invalid password");
        }

        const token=jwt.sign({id:user._id, isAdmin:user.isAdmin},secretAccesskey,{
            expiresIn: '7d'
          })
        console.log("token",token)
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).send({data:"Login successful",user:user,token:token});
    } catch (err) {
        next(err);
    }
});

 module.exports = router;
