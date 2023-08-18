const express = require('express');
const ShiftSchema =require('../database/ShiftSchema')
const Employee =require('../database/schema')
const router = express.Router();

router.get('/:key', async (req,res)=>{
    try{
        let shiftData=await ShiftSchema.find({
            "$or":[
               
                {"status":req.params.key}
             ]
        });
        console.log('shiftData: ', shiftData);
        const empIDs = shiftData.map((emp) => emp.email)
        console.log('empIDs: ', empIDs);
        let userData = await Employee.find({ "email": { "$in": empIDs } })
        console.log('userData: ', userData);

        res.send({shiftData,userData})
    }catch(errr){
        console.log("errrr",errr)
        res.send(errr)
    }

})

module.exports = router;