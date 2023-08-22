const User = require('../models/user');

exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('donations');

  return res.status(200).json({ message: 'User found.', data: user });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  return res
    .status(200)
    .json({ message: users.length + ' user(s) found.', data: users });
};

exports.getUser = async (req, res, next) => {
  const isPopulateDonations = req.query.donations;
  let user;
  if (isPopulateDonations) {
    user = await User.findById(req.params.id).populate('donations');
  } else {
    user = await User.findById(req.params.id);
  }

  if (!user) return next(new AppError(404, 'User not found.'));

  return res.status(200).json({ message: 'User found.', data: user });
};

exports.updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError(404, 'User not found.'));
  if (req.user.id !== user.id) return next(new AppError(403, 'Forbidden'));

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;

  await user.save();

  return res.status(200).json({ message: 'User updated.', data: user });
};

exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError(404, 'User not found.'));
  if (req.user.id !== user.id) return next(new AppError(403, 'Forbidden'));

  await user.remove();

  return res.status(200).json({ message: 'User deleted.', data: user });
};
