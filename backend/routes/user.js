const { tryCatch } = require('../utils/tryCatch');
const userController = require('../controllers/user');

const router = require('express').Router();

router
  .get('/', tryCatch(userController.getAllUsers))
  .get('/get-me', tryCatch(userController.getMe))
  .get('/:id', tryCatch(userController.getUser))
  .put('/:id', tryCatch(userController.updateUser))
  .delete('/:id', tryCatch(userController.deleteUser));

module.exports = router;
