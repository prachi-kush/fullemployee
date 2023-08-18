const express = require('express');
const mongoose = require('mongoose');
const ShiftSchema =require('../database/ShiftSchema')
const Employee =require('../database/schema')

const router = express.Router();

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const employee = await ShiftSchema.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.status = true; // Set isApproved to true for the employee
    await employee.save();

    res.status(200).json({ message: 'Request for change shift approved successfully' });
   

  } catch (err) {
    console.log('Error:', err);
    res.status(500).send('Internal server error');
  }
});

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
