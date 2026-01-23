import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date // null means 'Present'
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String // Summary of the role
  },
  responsibilities: [{
    type: String // Bullet points
  }],
  technologies: [{
    type: String
  }],
  location: {
    type: String
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    default: 'Full-time'
  }
}, {
  timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
