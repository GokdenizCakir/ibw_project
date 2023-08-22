const { default: mongoose } = require('mongoose');

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide your user ID'],
  },
  amount: {
    type: Number,
    required: [true, 'Please provide your donation amount'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
