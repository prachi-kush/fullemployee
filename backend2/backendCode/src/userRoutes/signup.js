const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const EmployeeSchema = require('../database/schema');

router.post('/signup', async (req, res) => {
  try {
    const { name, email, number, address, password } = req.body;

    // Check if the email already exists in the database
    const existingEmployee = await EmployeeSchema.findOne({ email });
    if (existingEmployee) {
      return res.status(400).send('Email already exists');
    }

    // Hash the password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // You can set isApproved to false initially and then set it to true later based on the admin's approval
    const newEmployee = new EmployeeSchema({
      name,
      email,
      number,
      address,
      password: hashPassword,
      isApproved: false // Set isApproved to false initially
    });

    await newEmployee.save();

    // Send the response with the user's details, including the isApproved value
    res.status(200).json({
      user: {
        name,
        email,
        isApproved: newEmployee.isApproved // Include the isApproved value in the response
      }
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
