const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Import your User model
const User = require('../models/User');

// Profile API
router.get('/profile', async (req, res) => {
  const userId = req.userId;

  try {
    // Get user profile from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Profile API
router.put('/profile', upload.single('photo'), async (req, res) => {
  const userId = req.userId;
  const { firstName, lastName, city, state, country } = req.body;
  const photo = req.file;

  try {
    // Get user profile from the database
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user profile fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.city = city;
    user.state = state;
    user.country = country;

    // Update user photo if provided
    if (photo) {
      user.photo = {
        data: photo.buffer,
        contentType: photo.mimetype,
      };
    }

    // Save the updated user profile
    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
