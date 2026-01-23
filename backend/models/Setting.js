import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  // Section: Hero
  hero: {
    role: { type: String, default: 'Web Developer' },
    welcomeText: { type: String, default: 'Hello I’m' },
    name: { type: String, default: 'Dawit Solomon' },
    bio: { type: String, default: 'I’m a passionate developer who enjoys turning ideas into clean, efficient, and user-friendly digital experiences.' },
    stats: [
      {
        value: { type: String },
        label1: { type: String },
        label2: { type: String }
      }
    ]
  },
  
  // Section: About
  about: {
    codeBlock: {
      firstName: { type: String, default: 'Dawit' },
      lastName: { type: String, default: 'Solomon' },
      role: { type: String, default: 'Full Stack Engineer' },
      traits: [{ type: String }],
      bioLines: [{ type: String }]
    },
    title: { type: String, default: 'Coding with' },
    subtitle: { type: String, default: 'purpose & passion.' },
    paragraphs: [{ type: String }]
  },

  // Section: Site Identity
  site: {
    logoText: { type: String, default: 'Dawit' },
    resumeLink: { type: String, default: '/resume/Dawit_Solomon_Resume.pdf' },
    profileImage: { type: String, default: '/assets/profile-image/profile-image.png' }
  },

  // Section: Social Links
  socials: {
    github: { type: String, default: 'https://github.com/devasol' },
    linkedin: { type: String, default: 'https://www.linkedin.com/in/dawit-solomon-0450602a0/' },
    email: { type: String, default: 'dawit8908@gmail.com' },
    twitter: { type: String, default: '' }
  },
  education: [
    {
      degree: { type: String },
      school: { type: String },
      period: { type: String }
    }
  ],
  contact: {
    capabilities: [{ type: String }],
    tools: [{ type: String }],
    availability: { type: String, default: 'Taking new projects starting next month.' }
  },

}, {
  timestamps: true,
  capped: { size: 4096, max: 1 } // Only one document allowed
});

// Since capped doesn't strictly prevent multiple inserts via mongoose sometimes if not handled, 
// we will handle it in the controller/route logic to ensure only one exists.

export default mongoose.model('Setting', settingSchema);
