const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import your User model
const User = require('../models/User');

// Generate OTP
function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(`Generated OTP: ${otp}`);
  return otp.toString();
}

// Login/Signup API
router.post('/login', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists in the database
    let user = await User.findOne({ email });

    // Generate OTP
    const otp = generateOTP();

    if (!user) {
      // Create user account if it doesn't exist
      user = new User({ email });
      await user.save();
    }

    console.log("yaha pe!");
    // Create JWT token
    const token = jwt.sign({ userId: user._id }, 'secret_key');
    console.log({token});
    res.json({ otp, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
