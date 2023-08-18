const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const EmployeeModel = require('../database/schema');


router.post('/', async (req, res) => {
  try {
    // Destructure the request body to get employee details
    const {
      name,
      email,
      number,
      address,
      joiningDate,
      dob,
      department,
      education,
      motherName,
      fatherName,
      gender,
      imageUrl,
      password,
      skills,
    } = req.body;

    // Check if the email already exists in the database
    const existingEmployee = await EmployeeModel.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee with this email already exists.' });
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
  
   const newEmployee = new EmployeeModel({
      name,
      email,
      number,
      address,
      joiningDate,
      dob,
      department,
      education,
      motherName,
      fatherName,
      gender,
      imageUrl,
      isApproved:true,
      password: hashPassword, // Use the hashed password
      skills,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully!', employee: savedEmployee });
  } catch (err) {
    console.error("errrrrrrrrr",err); // Log the error to the console for debugging
    res.status(400).json({ error: 'Error while adding employee.' });
  }
});

module.exports = router;
