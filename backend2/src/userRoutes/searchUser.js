const express = require('express');
const router = express.Router();
const User = require('../database/schema');

router.get('/:key', async (req, res) => {
  console.log("req", req.body);
  try {
    const key = req.params.key;
    const data = await User.find({
      $or: [
        { email: { $regex: key, $options: 'i' } }, // Case-insensitive email match using regex
        { department: { $regex: key, $options: 'i' } }, // Case-insensitive department match using regex
      ],
    });

    if (data.length === 0) {
      console.log("data not found");
      return res.status(404).send({ error: "data not found" });
    }
     res.json(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
