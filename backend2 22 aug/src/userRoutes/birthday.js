const express = require('express');
const moment = require('moment');
const router = express.Router();
const users = require('../database/schema');

router.get('/birthday', async (req, res) => {
  try {
    const today = moment();
    console.log("Today's date:", today.format("YYYY-MM-DD"));

    // Fetch all users from the database and exclude the 'password' field
    const allUsers = await users.find().select('-password');

    // Filter users whose birthday matches today's date
    const todayBirthdays = allUsers
      .filter((user) => {
        const dob = moment(user.dob, "YYYY-MM-DD");
        return dob.month() === today.month() && dob.date() === today.date();
      })
      .map((user) => ({
        id: user._id,
        name: user.name,
        dob: moment(user.dob).format('MM-DD'), // Format date and month (e.g., "MM-DD")
        imageUrl: user.imageUrl,
        email: user.email,
        department: user.department,
      }))
      .sort((a, b) => (a.dob > b.dob ? 1 : -1)); // Sort in ascending order based on dob

    console.log('Today\'s birthdays: ', todayBirthdays);

    const currentMonth = moment().month();
    console.log("currentMonth", currentMonth);

    // Fetch all users from the database
    const usersArray = await users.find();

    // Filter users whose birthday is in the current month and exclude the 'password' field
    const upcomingBdays = usersArray
      .filter((user) => {
        if (user.dob) {
          const dob = moment(user.dob, "YYYY-MM-DD");
          return dob.month() === currentMonth;
        }
        return false;
      })
      .map((user) => ({
        id: user._id,
        name: user.name,
        dob: moment(user.dob).format('MM-DD'), // Format date and month (e.g., "MM-DD")
        imageUrl: user.imageUrl,
        email: user.email,
        department: user.department,
      }))
      .sort((a, b) => (a.dob > b.dob ? 1 : -1)); // Sort in ascending order based on dob

    console.log('upcomingBdays: ', upcomingBdays);

    if (upcomingBdays.length === 0) {
      return res.status(200).json({ message: 'No upcoming birthdays this month.' });
    }

    res.status(200).json({ todayBirthdays, upcomingBdays });
  } catch (err) {
    console.error(err); // Log the error to the console for debugging
    res.status(400).json({ error: 'Error while fetching data.' });
  }
});

module.exports = router;
