const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const EmployeeSchema = require('../database/schema');

router.put('/updateprofile/:email', async (req, res) => {
  try {
    const { name, number, address, password, age,
      joiningDate, dob, department, education, motherName,
      fatherName, gender, skills } = req.body;
    const email = req.params.email;

    // Find the employee in the database using the email
    const employee = await EmployeeSchema.findOne({ email });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Proceed with updating the profile
    employee.name = name || employee.name;
    employee.number = number || employee.number;
    employee.address = address || employee.address;
    employee.age = age || employee.age;
    employee.joiningDate = joiningDate || employee.joiningDate;
    employee.dob = dob || employee.dob;
    employee.department = department || employee.department;
    employee.education = education || employee.education;
    employee.motherName = motherName || employee.motherName;
    employee.fatherName = fatherName || employee.fatherName;
    employee.gender = gender || employee.gender;
    employee.skills = skills || employee.skills;
    employee.isApproved = true || employee.isApproved;

    await employee.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
