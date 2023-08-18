const express = require('express');
const router = express.Router();
const ShiftSchema = require('../database/ShiftSchema');
const User = require('../database/schema');

router.post('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const employeeCheck = await ShiftSchema.findOne({ email });
    if (employeeCheck) {
      return res.status(409).json('You have already applied' );
    }

    const { shiftType, dateFrom, reason } = req.body;
    if (!shiftType || !dateFrom || !reason) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const selectedDate = new Date(dateFrom);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return res.status(400).json({ error: 'Selected date is in the past' });
    }
    // Save the leave application to the database
    const shiftApplication = new ShiftSchema({
      email: email,
      shiftType,
      dateFrom,
      reason,
      status: false,
    });

    await shiftApplication.save();
    res.status(200).json({ message: 'Request for shift change submitted successfully' });
  } catch (err) {
    console.error('Error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
