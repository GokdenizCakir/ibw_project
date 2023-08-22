const router = require('express').Router();

const { tryCatch } = require('../utils/tryCatch');
const authController = require('../controllers/auth.js');

router
  .post('/register', tryCatch(authController.register))
  .post('/login', tryCatch(authController.login));

module.exports = router;
