const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const userSchema = require('../database/schema');
var jwt = require('jsonwebtoken');
const secretAccessKey = 'hewfehfhbgbshfbeheheh22122hhgfkdvbpdmgdnAfhcgdfd';

router.post('/', async (req, res, next) => {
  console.log(req.body, "=================>req.body");
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    console.log(user, "user");
    if (!user) {
      return res.status(401).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, secretAccessKey, {
      expiresIn: '1h' // Shorter expiration for access token
    });
    const refreshToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, secretAccessKey, {
      expiresIn: '7d'
    });
    console.log("token", token);

  
    user.token=token;
    user.refreshToken=refreshToken;
    await user.save();

    const userData = {
      email: user.email,
      isApproved: user.isApproved,
    };
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).send({ data: "Login successful", user: userData ,token:token,refreshToken:refreshToken});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
