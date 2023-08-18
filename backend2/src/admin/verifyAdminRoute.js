const express = require('express');
const router = express.Router();
const verifyAdmin = require('./path-to-your-middleware/verifyAdmin');

// Apply the middleware to this route to verify admin authentication
router.get('/admin-only-route', verifyAdmin, (req, res) => {
  // The req.admin object is available here, containing the authenticated admin's details
  // Perform admin-specific actions
  res.json({ message: 'This is an admin-only route.' });
});

module.exports = router;
