const express=require('express')
const router=express.Router();
const Leave=require('../database/leaveSchema')
const Employee =require('../database/schema')



// app.get('/leaveUsers', async (req,res)=>{
//     const user=await Leave.find()
//      //  const user=await User.find({},{password: 0})
//        res.send(user).status(200)
//    })


router.get('/leaveUsers/:key',async(req,res)=>{
    try{
        let leaveData=await Leave.find({
            "$or":[
               {"status":req.params.key}
             ]
        })
        console.log('leaveData: ', leaveData);
        const empIDs = leaveData.map((emp) => emp.email)
        console.log('empIDs: ', empIDs);
        let userData = await Employee.find({ "email": { "$in": empIDs } })
        console.log('userData: ', userData);

        res.send({leaveData,userData})

        // let leaveData=await Leave.find({
        //     "$or":[
        //        {"status":req.params.key}
        //      ]
        // }).populate({})
     
    }catch(errr){
        console.log("errrr",errr)
        res.send(errr)
    }
})

module.exports=router;