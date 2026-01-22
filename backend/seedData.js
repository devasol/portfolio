import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Experience from './models/Experience.js';
import Setting from './models/Setting.js';
import Service from './models/Service.js';
import User from './models/User.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-admin');
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

const servicesData = [
  {
    title: "Full-Stack Web Development",
    blurb: "Building complete, scalable web applications from front to back.",
    details: "I deliver end-to-end solutions, seamlessly integrating robust backends with dynamic frontends using modern frameworks like React, Next.js, and Node.js.",
    tags: ["React", "Node.js", "Next.js", "Full-Stack"],
    iconName: "CommandLineIcon",
    order: 1
  },
  {
    title: "Frontend Development",
    blurb: "Crafting beautiful, responsive, and interactive user interfaces.",
    details: "I specialize in creating pixel-perfect, accessible, and high-performance UIs that provide delightful user experiences across all devices.",
    tags: ["React", "Tailwind CSS", "JavaScript", "UI/UX"],
    iconName: "PaintBrushIcon",
    order: 2
  },
  {
    title: "Backend Development & APIs",
    blurb: "Architecting secure and efficient server-side logic and APIs.",
    details: "I design and build scalable RESTful and GraphQL APIs, ensuring meaningful data exchange, security, and high availability for your applications.",
    tags: ["Node.js", "Express", "GraphQL", "REST"],
    iconName: "ServerIcon",
    order: 3
  },
  {
    title: "Database Design & Management",
    blurb: "Organizing your data for speed, reliability, and scalability.",
    details: "I implement efficient database schemas and management strategies using SQL and NoSQL technologies like PostgreSQL, MySQL, and MongoDB.",
    tags: ["SQL", "NoSQL", "MongoDB", "PostgreSQL"],
    iconName: "CircleStackIcon",
    order: 4
  },
  {
    title: "Authentication & Authorization",
    blurb: "Securing your applications with robust user management systems.",
    details: "I implement secure login flows, role-based access control, and protect sensitive data using industry standards like OAuth, JWT, and Auth0.",
    tags: ["OAuth", "JWT", "Security", "Auth0"],
    iconName: "LockClosedIcon",
    order: 5
  },
  {
    title: "Performance Optimization",
    blurb: "Speeding up your web apps for better engagement and SEO.",
    details: "I analyze and optimize code, assets, and delivery pipelines to achieve lightning-fast load times and smooth interactions.",
    tags: ["Web Vitals", "Optimization", "Speed", "SEO"],
    iconName: "RocketLaunchIcon",
    order: 6
  },
  {
    title: "Maintenance & Feature Enhancements",
    blurb: "Keeping your digital products up-to-date and evolving.",
    details: "I provide ongoing support, bug fixes, and feature additions to ensure your application remains modern, secure, and competitive.",
    tags: ["Support", "Refactoring", "Updates", "CI/CD"],
    iconName: "WrenchScrewdriverIcon",
    order: 7
  },
  {
    title: "Responsive & Cross-Browser Design",
    blurb: "Ensuring your site looks perfect on every screen and browser.",
    details: "I utilize responsive design principles and testing strategies to guarantee a consistent and high-quality experience for all users, regardless of their device.",
    tags: ["Responsive", "Mobile-First", "CSS", "Testing"],
    iconName: "ComputerDesktopIcon",
    order: 8
  }
];

const settingsData = {
  hero: {
    role: "Web Developer",
    welcomeText: "Hello I’m",
    name: "Dawit Solomon",
    bio: "I’m a passionate developer who enjoys turning ideas into clean, efficient, and user-friendly digital experiences. I love solving real problems with code, learning new technologies, and building applications that are purposeful, scalable, and impactful—all driven by curiosity and continuous growth.",
    stats: [
      { value: "1+", label1: "Years of", label2: "experience" },
      { value: "5+", label1: "Projects", label2: "completed" },
      { value: "15+", label1: "Technologies", label2: "mastered" },
      { value: "100+", label1: "Code", label2: "commits" }
    ]
  },
  about: {
    codeBlock: {
      firstName: "Dawit",
      lastName: "Solomon",
      role: "Full Stack Engineer",
      traits: ["Creative", "Curious", "Detail-oriented"],
      bioLines: [
        "I build digital products that are",
        "not just functional, but clear,",
        "performant, and delightful to use."
      ]
    },
    title: "Coding with",
    subtitle: "purpose & passion.",
    paragraphs: [
      "I'm a developer who genuinely loves the craft of building software. For me, it's not just about writing code—it's about solving real-world challenges and creating experiences that feel effortless to the user.",
      "My journey started with a curiosity for how things work on the web, and that quickly evolved into a career of building robust applications. I thrive in the constantly changing landscape of technology, always eager to learn the next best tool to add to my arsenal.",
      "When I'm not coding, you'll likely find me exploring new design trends, optimizing performance metrics, or collaborating with others to bring ambitious ideas to life."
    ]
  },
  site: {
    logoText: "Dawit",
    resumeLink: "/resume/Dawit_Solomon_Resume.pdf",
    profileImage: "/assets/profile-image/profile-image.png"
  },
  socials: {
    github: "https://github.com/devasol",
    linkedin: "https://www.linkedin.com/in/dawit-solomon-0450602a0/",
    email: "dawit8908@gmail.com",
    twitter: ""
  },
  education: [
    {
      degree: "B.Sc. in Computer Science",
      school: "Unity University",
      period: "2021 — Present"
    }
  ],
  contact: {
    capabilities: ["Web Apps", "Design Systems", "APIs", "SEO", "E2E"],
    tools: ["React", "TypeScript", "Tailwind", "Node", "GraphQL"],
    availability: "Taking new projects starting next month."
  }
};

const adminUser = {
  name: "Dawit Solomon",
  email: "dawit8908@gmail.com",
  password: "devasol@123",
  role: "admin",
  isActive: true
};

const projectsData = [
  {
    title: "PinQuest",
    description: "A free, high-performance social mapping platform for explorers. Allows users to discover hidden gems, share local landmarks, and connect in real-time on a beautifully designed interactive map.",
    image: "/Project_Images/PinQuest.png",
    technologies: ["React", "Tailwind", "MongoDB", "Express", "Socket.io"],
    githubLink: "https://github.com/devasol/PinQuest",
    liveLink: "https://pinquest-app.onrender.com/",
    category: "Full Stack",
    featured: true,
    order: 1
  },
  {
    title: "DLMS - Driving License Management System",
    description: "A comprehensive digital platform for managing driving license applications, renewals, examinations, and verifications with admin dashboards and traffic police integration.",
    image: "/Project_Images/DLMS.png",
    technologies: ["React", "Material-UI", "Node.js", "MongoDB", "JWT"],
    githubLink: "https://github.com/devasol/DLMS--Driving-license-management-system",
    liveLink: "https://get-dlms.onrender.com/",
    category: "Full Stack",
    featured: true,
    order: 2
  },
  {
    title: "Furni",
    description: "Modern Furniture E-commerce Platform that transforms living spaces with premium quality furniture, sleek design, and an exceptional shopping experience.",
    image: "/Project_Images/Furni.png",
    technologies: ["React", "Vite", "Tailwind", "GSAP", "Framer Motion"],
    githubLink: "https://github.com/devasol/Furni",
    liveLink: "https://get-furni.onrender.com/",
    category: "Frontend",
    featured: true,
    order: 3
  },
  {
    title: "NEEON",
    description: "A modern, full-stack blog platform with user-facing and admin interfaces, featuring content management, analytics, and responsive design.",
    image: "/Project_Images/Neeon.png",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    githubLink: "https://github.com/devasol/NEEON",
    liveLink: "https://neeon-1.onrender.com/",
    category: "Full Stack",
    featured: true,
    order: 4
  },
  {
    title: "Ethio E-Commerce",
    description: "A modern full-stack e-commerce platform with TeleBirr payment integration, admin dashboard, and responsive mobile-first interface tailored for Ethiopian market.",
    image: "/Project_Images/E-Commerce.png",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "TeleBirr"],
    githubLink: "https://github.com/devasol/E-Commerce__C-2-C",
    liveLink: "https://e-shop-shop.onrender.com/",
    category: "Full Stack",
    featured: true,
    order: 5
  }
];

const skillsData = [
  { name: "React.js", category: "Frontend", proficiency: 90, order: 1 },
  { name: "JavaScript", category: "Frontend", proficiency: 85, order: 2 },
  { name: "TypeScript", category: "Frontend", proficiency: 80, order: 3 },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 85, order: 4 },
  { name: "HTML5 & CSS3", category: "Frontend", proficiency: 90, order: 5 },
  { name: "Node.js", category: "Backend", proficiency: 80, order: 6 },
  { name: "Python", category: "Backend", proficiency: 70, order: 7 },
  { name: "Git & GitHub", category: "Tools", proficiency: 85, order: 8 },
  { name: "VS Code", category: "Tools", proficiency: 90, order: 9 },
  { name: "Postman", category: "Tools", proficiency: 75, order: 10 },
  { name: "Figma", category: "Other", proficiency: 70, order: 11 },
  { name: "UI/UX", category: "Other", proficiency: 75, order: 12 }
];

const experienceData = [
  {
    company: "Prodigy InfoTech",
    position: "Software Development Intern",
    startDate: new Date("2024-10-01"),
    current: true,
    description: "Contributing to the development of scalable web applications. Gaining hands-on experience in full-stack development and modern agile workflows.",
    technologies: ["React.js", "Tailwind CSS", "Full-Stack"],
    location: "Remote",
    type: "Internship"
  },
  {
    company: "Freelance",
    position: "Frontend Developer",
    startDate: new Date("2022-01-01"),
    endDate: new Date("2024-12-31"),
    current: false,
    description: "Developed custom websites and web applications for various clients, delivering high-performance and user-centric solutions.",
    technologies: ["MERN stack", "Figma", "SEO"],
    location: "Remote",
    type: "Freelance"
  }
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await User.deleteMany({});
    await Setting.deleteMany({});
    await Service.deleteMany({});

    console.log('Cleared existing data...');

    // Insert new data
    await Project.insertMany(projectsData);
    await Skill.insertMany(skillsData);
    await Experience.insertMany(experienceData);
    await Setting.create(settingsData);
    await Service.insertMany(servicesData);
    
    // Create admin user
    await User.create(adminUser);
    console.log('Admin user created');

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();