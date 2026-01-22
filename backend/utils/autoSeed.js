import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import Service from '../models/Service.js';
import Setting from '../models/Setting.js';

const autoSeedData = async () => {
    try {
        const projectCount = await Project.countDocuments();
        const experienceCount = await Experience.countDocuments();
        
        if (projectCount === 0) {
            console.log('🌱 No projects found. Auto-seeding initial projects...');
            const projectsData = [
                {
                    title: "PinQuest",
                    description: "A social mapping platform for explorers to discover/share hidden gems.",
                    image: "/Project_Images/PinQuest.png",
                    technologies: ["React", "Tailwind", "MongoDB", "Express", "Socket.io"],
                    githubLink: "https://github.com/devasol/PinQuest",
                    liveLink: "https://pinquest-app.onrender.com/",
                    category: "Full Stack",
                    featured: true,
                    order: 1
                },
                {
                    title: "DLMS",
                    description: "A digital platform for managing driving license applications and renewals.",
                    image: "/Project_Images/DLMS.png",
                    technologies: ["React", "Material-UI", "Node.js", "MongoDB"],
                    githubLink: "https://github.com/devasol/DLMS--Driving-license-management-system",
                    liveLink: "https://get-dlms.onrender.com/",
                    category: "Full Stack",
                    featured: true,
                    order: 2
                }
            ];
            await Project.insertMany(projectsData);
        }

        if (experienceCount === 0) {
            console.log('🌱 No experience records found. Auto-seeding...');
            const experienceData = [
                {
                    company: "Prodigy InfoTech",
                    position: "Software Development Intern",
                    startDate: new Date("2024-10-01"),
                    current: true,
                    description: "Contributing to the development of scalable web applications.",
                    technologies: ["React.js", "Tailwind CSS"],
                    location: "Remote",
                    type: "Internship"
                }
            ];
            await Experience.insertMany(experienceData);
        }

        // Just check settings/skills quickly too
        const settingsCount = await Setting.countDocuments();
        if (settingsCount === 0) {
            console.log('🌱 Seeding default settings...');
            await Setting.create({
                hero: { name: "Dawit Solomon", role: "Web Developer", bio: "Developer building purposeful experiences." },
                site: { logoText: "Dawit" }
            });
        }

    } catch (error) {
        console.error('❌ Auto-seeding failed:', error);
    }
};

export default autoSeedData;
