const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    max: 255,
    default: null
  },
  last_name: {
    type: String,
    max: 255,
    default: null
  },
  guestId: {type: String},
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
  },
  verified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: [true, 'Please enter Password'],
  },
  DOB: {
    type: Date,
  },
  age: {
    type: Number
  },
  token: {
    type: String
  },
  role: {
    type: String,
    enum: {
      values: ['tier-1', 'user', 'instructor'],
      message: '${VALUE} is not a valid role.'
    },
    default: 'user'
  }
})

module.exports = mongoose.model('Users', userSchema);