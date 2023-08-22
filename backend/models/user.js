const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [20, 'Name cannot be more than 20 characters'],
    minlength: [3, 'Name cannot be less than 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return emailRegex.test(value);
      },
    },
    message: 'Please provide a valid email',
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: [8, 'Password cannot be less than 8 characters'],
    select: false,
  },
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
