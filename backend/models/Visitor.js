import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true
  },
  visitDate: {
    type: Date,
    default: Date.now
  },
  userAgent: String
});

// Index to help with counting unique IPs per day if needed
visitorSchema.index({ ip: 1, visitDate: 1 });

export default mongoose.model('Visitor', visitorSchema);
