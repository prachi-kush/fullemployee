const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
var jwt = require('jsonwebtoken');
const AdminModel = require('../database/adminSchema');
const secretKey = 'hewfehfhbgbshfbeheheh22122hhgfkdvbpdmgdnAfhcgdfd';

// Admin login API
router.post('/', async (req, res) => {
  
    try {
      const { email, password, isAdminKey } = req.body;
      console.log(' req.body---------: ',  req.body);
  
      // Check if the email exists in the database
      const admin = await AdminModel.findOne({ email });
      if (!admin) {
        return res.status(401).json({ error: 'Invalid email' });
      }
  
      // Compare the provided isAdminKey with the stored isAdminKey
      if (isAdminKey !== req.body.isAdminKey) {
        return res.status(401).json({ error: 'Invalid Admin Key' });
      }
     // Compare the entered password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(password, admin.password);
      console.log('isPasswordMatch: ', isPasswordMatch);
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
    let token,refreshToken;
  if (admin.isFirstTimeLogin) {
        // Generate a JWT token with the admin's email as the payload
        token = jwt.sign({ email: admin.email }, secretKey, {
          expiresIn: '1h', 
        });
  refreshToken = jwt.sign({ email: admin.email }, secretKey, {
                      expiresIn: '7d', // Set an appropriate expiration for refresh tokens
                    });
  
        // Mark the account as not the first-time login
        admin.isFirstTimeLogin = false;
        admin.token = token;
      admin.refreshToken = refreshToken;
        await admin.save();
      } else {
        // Use the existing token for subsequent logins
        token = jwt.sign({ email: admin.email }, secretKey, {
          expiresIn: '1m', 
        });
        refreshToken = jwt.sign({ email: admin.email }, secretKey, {
          expiresIn: '7d', // Set an appropriate expiration for refresh tokens
          });
         
          admin.token = token;
          admin.refreshToken = refreshToken;
          await admin.save();
      }
      console.log('refreshToken: ', refreshToken);
      // If login is successful, return the JWT token along with a success response
      res.status(200).json({ message: 'Admin login successful', token ,refreshToken});
    } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  module.exports=router;
  