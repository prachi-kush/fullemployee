const express=require('express');
const router=express.Router();
const User=require('../database/schema')

router.get('/searchUser/:key', async (req,res)=>{
    console.log("req",req.body)
    try{
        const user = await User.findOne(
            {"email":{$regex:req.params.key}}
        )

        if (!user) {
            console.log("User not found")
            return res.status(404).send({ error: "User not found" });
          }
        res.send(user)
    } catch(err){
        console.log(err)
        res.send(err)
    }
   

})

module.exports=router;