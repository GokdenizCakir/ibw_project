const Donation = require('../models/donation');
const User = require('../models/user');
const AppError = require('../utils/AppError');

exports.getAllDonations = async (req, res, next) => {
  const isPopulateUser = req.query.users;
  let donations;
  if (isPopulateUser) {
    donations = await Donation.find().populate('user');
  } else {
    donations = await Donation.find();
  }

  if (!donations) return next(new AppError(404, 'Donation not found'));

  res.status(200).json({
    message: `${donations.length} donation(s) found`,
    data: {
      donations,
    },
  });
};

exports.getDonation = async (req, res, next) => {
  const isPopulateUser = req.query.users;
  let donation;
  if (isPopulateUser) {
    donation = await Donation.findById(req.params.id).populate('user');
  } else {
    donation = await Donation.findById(req.params.id);
  }

  if (!donation) return next(new AppError(404, 'Donation not found'));

  res.status(200).json({
    message: 'Donation found',
    data: {
      donation,
    },
  });
};

exports.createDonation = async (req, res, next) => {
  const { amount } = req.body;
  if (!amount) return next(new AppError(400, 'Please provide your amount'));

  const donation = await Donation.create({
    user: req.user._id,
    amount,
  });

  const user = await User.findById(req.user._id);
  user.donations.push(donation._id);
  await user.save();

  res.status(201).json({
    message: 'Donation created',
    data: {
      donation,
    },
  });
};
