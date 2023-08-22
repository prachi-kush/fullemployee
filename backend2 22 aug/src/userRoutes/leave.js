const express = require('express');
const router = express.Router();
const LeaveSchema = require('../database/leaveSchema');
const User = require('../database/schema');

router.post('/applyLeave/:email', async (req, res) => {
    console.log("leave========>", req.params.email);
    try {
        const email = req.params.email;
        const employee = await User.findOne({ email });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const { leaveType, dateFrom, dateTo, description } = req.body;

        if (!leaveType || !dateFrom || !dateTo || !description) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the user has already applied for leave on the specified date
        const existingApplication = await LeaveSchema.findOne({
            email: email,
            dateFrom: dateFrom,
            dateTo: dateTo,
        });

        if (existingApplication) {
            return res.status(409).send('You have already applied for leave on this date');
        }

        // Save the leave application to the database
        const leaveApplication = new LeaveSchema({
            email: email,
            leaveType,
            dateFrom,
            dateTo,
            description,
            status: 'pending',
        });

        await leaveApplication.save();
        res.status(200).send('Leave application submitted successfully');
        console.log("Leave application submitted successfully")

    } catch (err) {
        console.log("Error", err);
        res.status(500).json(err);
    }
});

module.exports = router;
