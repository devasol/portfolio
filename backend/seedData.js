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
    title: "Mobile App Development",
    blurb: "Building cross-platform mobile experiences with React Native.",
    details: "I develop high-quality, performant mobile applications for iOS and Android, ensuring consistent branding and functionality across all platforms.",
    tags: ["React Native", "Expo", "Mobile", "UI/UX"],
    iconName: "DevicePhoneMobileIcon",
    order: 4
  },
  {
    title: "Database Design & Management",
    blurb: "Organizing your data for speed, reliability, and scalability.",
    details: "I implement efficient database schemas and management strategies using SQL and NoSQL technologies like PostgreSQL, MySQL, and MongoDB.",
    tags: ["SQL", "NoSQL", "MongoDB", "PostgreSQL"],
    iconName: "CircleStackIcon",
    order: 5
  },
  {
    title: "UI/UX Design & Prototyping",
    blurb: "Designing high-fidelity prototypes and user-centric interfaces.",
    details: "I focus on user psychology and modern design principles to create interfaces that are not only beautiful but also intuitive and functional.",
    tags: ["Figma", "UI/UX", "Prototyping", "A/B Testing"],
    iconName: "BeakerIcon",
    order: 6
  },
  {
    title: "Authentication & Authorization",
    blurb: "Securing your applications with robust user management systems.",
    details: "I implement secure login flows, role-based access control, and protect sensitive data using industry standards like OAuth, JWT, and Auth0.",
    tags: ["OAuth", "JWT", "Security", "Auth0"],
    iconName: "LockClosedIcon",
    order: 7
  },
  {
    title: "Performance Optimization",
    blurb: "Speeding up your web apps for better engagement and SEO.",
    details: "I analyze and optimize code, assets, and delivery pipelines to achieve lightning-fast load times and smooth interactions.",
    tags: ["Web Vitals", "Optimization", "Speed", "SEO"],
    iconName: "RocketLaunchIcon",
    order: 8
  },
  {
    title: "Maintenance & Feature Enhancements",
    blurb: "Keeping your digital products up-to-date and evolving.",
    details: "I provide ongoing support, bug fixes, and feature additions to ensure your application remains modern, secure, and competitive.",
    tags: ["Support", "Refactoring", "Updates", "CI/CD"],
    iconName: "WrenchScrewdriverIcon",
    order: 9
  },
  {
    title: "Responsive & Cross-Browser Design",
    blurb: "Ensuring your site looks perfect on every screen and browser.",
    details: "I utilize responsive design principles and testing strategies to guarantee a consistent and high-quality experience for all users, regardless of their device.",
    tags: ["Responsive", "Mobile-First", "CSS", "Testing"],
    iconName: "ComputerDesktopIcon",
    order: 10
  }
];

const settingsData = {
  hero: {
    role: "Full Stack Developer (MERN)",
    welcomeText: "Hello I’m",
    name: "Dawit Solomon",
    bio: "Dynamic Full Stack Developer specializing in the MERN stack with a proven track record of building scalable, high-performance web applications. Expertise in crafting seamless user experiences across various domains.",
    stats: [
      { value: "3+", label1: "Years of", label2: "Impact" },
      { value: "10+", label1: "Successful", label2: "Deliveries" },
      { value: "20+", label1: "Tools &", label2: "Tech" },
      { value: "500+", label1: "Code", label2: "Commits" }
    ]
  },
  about: {
    codeBlock: {
      firstName: "Dawit",
      lastName: "Solomon",
      role: "Full Stack Developer",
      traits: ["Solution-Oriented", "Reliable", "Performance-Driven"],
      bioLines: [
        "I engineer digital solutions that",
        "deliver technical excellence and",
        "measurable business outcomes."
      ]
    },
    title: "Engineering with",
    subtitle: "Precision & Impact.",
    paragraphs: [
      "I'm a Full Stack Developer who bridges the gap between complex technical challenges and intuitive user experiences. My focus is on writing clean, maintainable code that directly contributes to business growth and user satisfaction.",
      "With deep expertise in the MERN stack, I've delivered everything from optimized e-commerce platforms to high-performance social mapping applications. I thrive on solving scaling issues and improving application performance metrics."
    ]
  },
  site: {
    logoText: "Dawit",
    resumeLink: "/resume/Dawit_Solomon_Resume.pdf",
    profileImage: "/assets/profile-image/profile-image.png"
  },
  socials: {
    github: "https://github.com/devasol",
    linkedin: "https://www.linkedin.com/in/dawit-solomon-t/",
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
    capabilities: ["MERN Apps", "Secure APIs", "Performance Optimization", "E-commerce"],
    tools: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    availability: "Available for freelance and strategic contract work."
  },
  certifications: [
    {
      name: "The Ultimate React Course",
      issuer: "Jonas Schmedtmann (Udemy)",
      date: "2024"
    },
    {
      name: "MERN Stack Development",
      issuer: "Self-Directed Learning",
      date: "2023"
    },
    {
      name: "Modern JavaScript & TypeScript Mastery",
      issuer: "Advanced Certification",
      date: "2024"
    }
  ]
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
    description: "High-performance social discovery platform enabling real-time landmark sharing. Built with React 19.",
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
    description: "End-to-end digital verification system that reduced manual license processing time by 40%.",
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
    description: "Premium furniture shopping experience featuring advanced filtering and secure checkout.",
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
    description: "Scalable full-stack blog ecosystem with advanced content management and real-time nested analytics for engagement tracking.",
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
    description: "Next-gen e-commerce platform with localized TeleBirr payment integration and high-performance admin dashboard for enterprise-grade inventory management.",
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
  { name: "JavaScript (ES6+)", category: "Languages", proficiency: 90, order: 1 },
  { name: "TypeScript", category: "Languages", proficiency: 85, order: 2 },
  { name: "React", category: "Frontend", proficiency: 95, order: 3 },
  { name: "Next.js", category: "Frontend", proficiency: 85, order: 4 },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 90, order: 5 },
  { name: "Node.js", category: "Backend", proficiency: 85, order: 6 },
  { name: "Express", category: "Backend", proficiency: 85, order: 7 },
  { name: "MongoDB", category: "Backend", proficiency: 85, order: 8 },
  { name: "Git", category: "Tools", proficiency: 90, order: 9 },
  { name: "Figma", category: "Tools", proficiency: 80, order: 10 }
];

const experienceData = [
  {
    company: "Freelance",
    position: "Full Stack Developer",
    startDate: new Date("2021-01-01"),
    current: true,
    description: "Providing technical consulting and end-to-end development for SME clients.",
    responsibilities: [
      "Engineered high-performance web applications using the MERN stack, reducing page load times by 35%.",
      "Developed custom e-commerce solutions with secure payment integrations, driving a 20% increase in sales conversion.",
      "Streamlined administrative workflows through custom dashboards, reducing manual processing time by over 50%."
    ],
    technologies: ["MERN stack", "Typescript", "Redux", "JWT"],
    location: "Remote",
    type: "Freelance"
  },
  {
    company: "Prodigy InfoTech",
    position: "Software Developer Intern",
    startDate: new Date("2024-10-01"),
    current: true,
    description: "Engineering scalable web solutions within agile workflows.",
    responsibilities: [
      "Collaborated in agile workflows to deliver modular React components for enterprise projects.",
      "Optimized client-side rendering logic, improving Lighthouse performance scores by an average of 25 points."
    ],
    technologies: ["React.js", "Tailwind CSS", "Full-Stack"],
    location: "Remote",
    type: "Internship"
  }
];

const seedData = async () => {
  try {
    await connectDB();
    console.log('Clearing existing data...');
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await User.deleteMany({});
    await Setting.deleteMany({});
    await Service.deleteMany({});

    console.log('Inserting data...');
    await Project.insertMany(projectsData);
    await Skill.insertMany(skillsData);
    await Experience.insertMany(experienceData);
    await Setting.create(settingsData);
    await Service.insertMany(servicesData);
    await User.create(adminUser);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();