const moongoose = require('mongoose');

const projectSchema = new moongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your project name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide your project description'],
  },
  publicKey: {
    type: String,
    required: [true, 'Please provide your project public key'],
  },
  instagram: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedin: {
    type: String,
  },
});

const Project = moongoose.model('Project', projectSchema);

module.exports = Project;
