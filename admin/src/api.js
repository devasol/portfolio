// api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};

export const api = {
  // Projects
  getProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch projects');
    return data.data;
  },

  createProject: async (projectData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create project');
    return data;
  },

  updateProject: async (id, projectData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update project');
    return data;
  },

  deleteProject: async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete project');
    return data;
  },

  // Skills
  getSkills: async () => {
    const response = await fetch(`${API_BASE_URL}/skills`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch skills');
    return data.data;
  },

  createSkill: async (skillData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(skillData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create skill');
    return data;
  },

  updateSkill: async (id, skillData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(skillData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update skill');
    return data;
  },

  deleteSkill: async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete skill');
    return data;
  },

  // Experience
  getExperience: async () => {
    const response = await fetch(`${API_BASE_URL}/experience`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch experience');
    return data.data;
  },

  createExperience: async (experienceData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/experience`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(experienceData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create experience');
    return data;
  },

  updateExperience: async (id, experienceData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/experience/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(experienceData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update experience');
    return data;
  },

  deleteExperience: async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/experience/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete experience');
    return data;
  },

  // Services
  getServices: async () => {
    const response = await fetch(`${API_BASE_URL}/services`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch services');
    return data.data;
  },

  createService: async (serviceData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(serviceData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create service');
    return data;
  },

  updateService: async (id, serviceData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(serviceData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update service');
    return data;
  },

  deleteService: async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete service');
    return data;
  },

  // Authentication
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  // Settings
  getSettings: async () => {
    const response = await fetch(`${API_BASE_URL}/settings`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch settings');
    return data.data;
  },

  updateSettings: async (settingsData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(settingsData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update settings');
    return data;
  },
};