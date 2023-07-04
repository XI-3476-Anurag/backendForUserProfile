const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://Anurag:sFk6bI4rcB4bB1EK@cluster0.lrkzpsr.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });

// Middleware to extract user ID from JWT token
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, 'secret_key');
    req.userId = decoded.userId;
  }
  next();
});

// Parse JSON bodies
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
