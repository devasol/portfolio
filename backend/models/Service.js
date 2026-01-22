import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  blurb: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  tags: [String],
  iconName: {
    type: String,
    default: 'CommandLineIcon' // Default Heroicon name or similar
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Service', serviceSchema);
