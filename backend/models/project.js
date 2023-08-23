const moongoose = require('mongoose');
const Sequence = require('./sequence');

const projectSchema = new moongoose.Schema({
  incrementId: {
    type: Number,
  },
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

projectSchema.pre('save', async function (next) {
  if (!this.incrementId) {
    try {
      const sequenceDoc = await Sequence.findByIdAndUpdate(
        { _id: 'projectId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.incrementId = sequenceDoc.sequence_value;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Project = moongoose.model('Project', projectSchema);

module.exports = Project;
