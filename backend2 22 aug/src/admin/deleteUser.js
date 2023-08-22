
const express = require('express');
const router = express.Router();
const EmployeeSchema = require('../database/schema');
const mongoose = require('mongoose');

router.delete('/deleteUser/:id', async (req, res) => {
  const userId = req.params.id;

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const deleteUser = await EmployeeSchema.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.send("Data deleted successfully");
    res.status(200);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
