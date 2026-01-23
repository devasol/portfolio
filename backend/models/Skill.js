import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Soft Skills', 'Other', 'Languages'],
    required: true
  },
  proficiency: {
    type: Number, // 0-100
    min: 0,
    max: 100,
    default: 50
  },
  icon: {
    type: String, // Class name or URL for icon
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
