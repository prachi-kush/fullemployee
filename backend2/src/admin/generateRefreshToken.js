const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const AdminModel = require('../database/adminSchema');
const secretKey = 'hewfehfhbgbshfbeheheh22122hhgfkdvbpdmgdnAfhcgdfd';

// Endpoint to refresh the access token using a refresh token
router.post('/', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Verify the refresh token
    const decodedRefreshToken = jwt.verify(refreshToken, secretKey);

    // Find the admin based on the decoded refresh token data
    const admin = await AdminModel.findOne({ email: decodedRefreshToken.email });

    // Generate a new access token
    const newAccessToken = jwt.sign({ email: admin.email }, secretKey, {
      expiresIn: '1m', // Set an appropriate expiration for the new access token
    });

    // Return the new access token
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error during token refresh:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
