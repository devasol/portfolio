import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

// Default settings fallback
const defaultSettings = {
  hero: {
    role: "Web Developer",
    welcomeText: "Hello I'm",
    name: "Dawit Solomon",
    bio: "I'm a passionate developer who enjoys turning ideas into clean, efficient, and user-friendly digital experiences.",
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
      "My journey started with a curiosity for how things work on the web, and that quickly evolved into a career of building robust applications.",
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

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const response = await fetch(`${API_URL}/settings`);
      const result = await response.json();
      if (result.success) {
        setSettings(result.data);
      } else {
        console.warn('Settings API returned unsuccessful, using defaults');
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error('Error fetching settings, using defaults:', error);
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
