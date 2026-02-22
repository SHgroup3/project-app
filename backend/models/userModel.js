const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,   
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      match: [/^(03)[0-4][0-9]{8}$/, "Please enter a valid phone number"]
    }
  },
  password: {
    type: String,
    required: true,   
    minlength: [8, "Password must be at least 8 characters long"]
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

module.exports = mongoose.model('User', userSchema);
