import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

// Default settings fallback
const defaultSettings = {
  hero: {
    role: "Full Stack Developer (MERN)",
    welcomeText: "Hello I'm",
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

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`);
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
