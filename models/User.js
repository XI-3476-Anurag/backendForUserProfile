const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, maxlength: 40 },
  lastName: { type: String, required: true, maxlength: 40 },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  photo: { data: Buffer, contentType: String },
});

module.exports = mongoose.model('User', userSchema);
