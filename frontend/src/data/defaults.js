export const defaultProjects = [
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

export const defaultSkills = [
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

export const defaultExperiences = [
  {
    company: "Freelance",
    position: "Full Stack Developer",
    startDate: "2021-01-01",
    current: true,
    description: "Providing high-impact technical consulting and end-to-end development for SME clients.",
    responsibilities: [
      "Engineered high-performance web applications using the MERN stack, reducing page load times by 35%.",
      "Developed custom e-commerce solutions with secure multi-gateway payment integrations, driving a 20% increase in sales conversion.",
      "Streamlined administrative workflows through custom dashboards, reducing manual processing time by over 50%."
    ],
    technologies: ["MERN stack", "Typescript", "Redux", "JWT"],
    location: "Remote",
    type: "Freelance"
  },
  {
    company: "Prodigy InfoTech",
    position: "Software Developer Intern",
    startDate: "2024-10-01",
    current: true,
    description: "Engineering scalable web solutions within agile workflows, focusing on performance and cross-functional team collaboration.",
    responsibilities: [
      "Collaborated in agile workflows to deliver modular React components for enterprise-scale projects.",
      "Optimized client-side rendering logic, improving Lighthouse performance scores by an average of 25 points."
    ],
    technologies: ["React.js", "Tailwind CSS", "Full-Stack"],
    location: "Remote",
    type: "Internship"
  }
];
