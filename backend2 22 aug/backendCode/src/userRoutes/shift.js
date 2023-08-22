const express = require('express');
const router = express.Router();
const ShiftSchema = require('../database/ShiftSchema');
const User = require('../database/schema');

router.post('/chooseshift/:email', async (req, res) => {
    console.log("leave========>", req.params.email)
    try {
        const email = req.params.email;
        const employee = await User.findOne({ email });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        const employeeCheck = await ShiftSchema.findOne({ email });
        if (employeeCheck) {
            return res.status(200).send('You have to wait for approval by admin' );
        }

        const { shiftType, dateFrom, reason } = req.body;       
        if (!shiftType || !dateFrom || !reason) {
            return res.status(400).json({ error: 'All fields are required' });
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
        console.log("Request for shift change submitted successfully")

    } catch (err) {
        console.log("Error", err);
        res.status(500).json(err);
    }
});

module.exports = router;
