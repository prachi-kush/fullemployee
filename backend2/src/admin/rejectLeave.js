const express = require('express');
const mongoose = require('mongoose');
const LeaveSchema =require('../database/leaveSchema')
const router = express.Router();

router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      const employee = await LeaveSchema.findById(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      employee.status = 'rejected'; // Set isApproved to true for the employee
      await employee.save();
  
      res.status(200).json({ message: 'Employee Leave rejected successfully' });
    } catch (err) {
      console.log('Error:', err);
      res.status(500).send('Internal server error');
    }
  });

  module.exports=router;