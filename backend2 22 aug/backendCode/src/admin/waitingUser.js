const express=require('express')
const router=express.Router();
const User=require('../database/schema')

router.get('/userList/:key',async(req,res)=>{
    
    try{
        let data=await User.find({
            "$or":[
                {"isApproved":req.params.key},
                {"role":req.params.key},
                {"status":req.params.key}
             ]
        });
        res.send(data)
    }catch(errr){
        console.log("errrr",errr)
        res.send(errr)
    }
})

module.exports=router;