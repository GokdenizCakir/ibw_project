const router = require('express').Router();
const { tryCatch } = require('../utils/tryCatch');
const donationController = require('../controllers/donation');

router
  .get('/', tryCatch(donationController.getAllDonations))
  .post('/', tryCatch(donationController.createDonation))
  .get('/:id', tryCatch(donationController.getDonation));

module.exports = router;
