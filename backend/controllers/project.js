const Project = require('../models/project');

exports.getAllProjects = async (req, res, next) => {
  const projects = await Project.find();

  if (!projects) return next(new AppError(404, 'Project not found'));

  res.status(200).json({
    message: `${projects.length} project(s) found`,
    data: {
      projects,
    },
  });
};

exports.getProject = async (req, res, next) => {
  const { projectID } = req.params;
  const project = await Project.findById(projectID);

  if (!project) return next(new AppError(404, 'Project not found'));

  res.status(200).json({
    message: 'Project found',
    data: {
      project,
    },
  });
};

exports.createProject = async (req, res, next) => {
  const { name, description, publicKey, instagram, twitter, linkedin } =
    req.body;
  if (!name || !description || !publicKey)
    return next(
      new AppError(400, 'Please provide your name, description and public key')
    );

  const project = await Project.create({
    name,
    description,
    publicKey,
    instagram,
    twitter,
    linkedin,
  });

  res.status(201).json({
    message: 'Project created',
    data: {
      project,
    },
  });
};
