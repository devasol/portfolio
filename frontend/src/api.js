import { API_BASE_URL } from './config';

export const api = {
  // Projects
  getProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch projects');
    return data.data;
  },

  // Skills
  getSkills: async () => {
    const response = await fetch(`${API_BASE_URL}/skills`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch skills');
    return data.data;
  },

  // Experience
  getExperience: async () => {
    const response = await fetch(`${API_BASE_URL}/experience`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch experience');
    return data.data;
  },

  // Contact form
  submitContact: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to send message');
    return data;
  },
};