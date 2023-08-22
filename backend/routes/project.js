const router = require('express').Router();

const { tryCatch } = require('../utils/tryCatch');
const projectController = require('../controllers/project');

router
  .get('/', tryCatch(projectController.getAllProjects))
  .get('/:projectID', tryCatch(projectController.getProject))
  .post('/', tryCatch(projectController.createProject));

module.exports = router;
