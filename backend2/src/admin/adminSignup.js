const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const AdminModel = require('../database/adminSchema');

router.post('/', async (req, res) => {
  try {
    const { email, password, isAdminKey } = req.body;

    // Check if the admin key is correct
    const correctAdminKey = 'iamtheowner334455';
    if (isAdminKey !== correctAdminKey) {
      return res.status(403).json({ error: 'Invalid admin key' });
    }

    // Check if there is an existing admin in the database
    const existingAdmin = await AdminModel.findOne();
    if (existingAdmin) {
      return res.status(400).json({ error: 'An admin already exists, Please Login' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new admin with hashed password
    const newAdmin = new AdminModel({ email, password: hashedPassword,isAdminKey });

    // Save the admin to the database
    await newAdmin.save();

    // If signup is successful, return a success response
    res.status(201).json({ message: 'Admin signup successful' });
  } catch (error) {
    console.error('Error during admin signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
