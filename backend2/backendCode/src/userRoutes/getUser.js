const express=require('express')
const app=express()
const User=require('../database/schema')

app.get('/getuser', async (req,res)=>{
    // const user=await User.find().select('-password')
    const user=await User.find({},{password: 0})
    res.send(user).status(200)
})
app.get('/getuser/:key',async(req,res)=>{
    let data=await User.find({
        "$or":[
            // {"_id":{$regex:req.params.key}},
            {"name":{$regex:req.params.key}},
            {"email":{$regex:req.params.key}},
            {"age":{$regex:req.params.key}},
            {"role":{$regex:req.params.key}}
             ]
    }, {password: 0});
    res.send(data)
})

module.exports=app;