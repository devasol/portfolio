import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { 
  PlusIcon, 
  XMarkIcon, 
  CalendarIcon, 
  PencilSquareIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: [],
    location: '',
    type: 'Full-time'
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await api.getExperience();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'technologies') {
      // Handle technologies as an array
      setFormData(prev => ({
        ...prev,
        technologies: value.split(',').map(t => t.trim()).filter(t => t)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const experienceData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : null
      };

      if (editingExperience) {
        // Update existing experience
        const updatedExperience = await api.updateExperience(editingExperience._id, experienceData);
        // Update the local state
        const updatedExperiences = experiences.map(exp =>
          exp._id === editingExperience._id ? updatedExperience.data : exp
        );
        setExperiences(updatedExperiences);
      } else {
        // Add new experience
        const newExperience = await api.createExperience(experienceData);
        setExperiences([...experiences, newExperience.data]);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving experience:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.company || '',
      position: experience.position || '',
      startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
      endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
      current: experience.current || false,
      description: experience.description || '',
      technologies: Array.isArray(experience.technologies) ? experience.technologies.join(',') : '',
      location: experience.location || '',
      type: experience.type || 'Full-time'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await api.deleteExperience(id);
        const updatedExperiences = experiences.filter(exp => exp._id !== id);
        setExperiences(updatedExperiences);
      } catch (error) {
        console.error('Error deleting experience:', error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      technologies: [],
      location: '',
      type: 'Full-time'
    });
    setEditingExperience(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Experience</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your career timeline and milestones</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add Experience
        </button>
      </div>

      {showForm && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card shadow-2xl shadow-primary-500/10"
        >
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {editingExperience ? 'Edit Milestone' : 'New Career Milestone'}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g. Google, Apple, Freelance"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                  Designation / Role
                </label>
                <input
                  type="text"
                  name="position"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={formData.position}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  disabled={formData.current}
                  className={`input-field ${formData.current ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
              </div>

              <div className="flex items-end pb-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="current"
                      checked={formData.current}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full dark:bg-gray-700 peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover:text-emerald-500 transition-colors">
                    Currently working here
                  </span>
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                  Work Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Remote, San Francisco"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                  Employment Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input-field appearance-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your responsibilities and achievements..."
                className="input-field resize-none"
                required
              ></textarea>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                name="technologies"
                placeholder="React, Node.js, AWS, TypeScript..."
                value={Array.isArray(formData.technologies) ? formData.technologies.join(',') : formData.technologies}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <button type="submit" className="btn-primary flex-1">
                {editingExperience ? 'Update Milestone' : 'Save Milestone'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary px-8"
              >
                Discard
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Role & Company</th>
                <th>Timeline</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience) => {
                const startDate = new Date(experience.startDate);
                const endDate = experience.endDate ? new Date(experience.endDate) : null;
                
                const formatDate = (date) => {
                  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
                };
                
                const duration = experience.current 
                  ? `${formatDate(startDate)} — Present`
                  : `${formatDate(startDate)} — ${endDate ? formatDate(endDate) : 'Present'}`;
                  
                return (
                  <tr key={experience._id}>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 dark:text-white">{experience.position}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{experience.company}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4" />
                        {duration}
                      </div>
                    </td>
                    <td>
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                        experience.current 
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' 
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'
                      }`}>
                        {experience.current ? 'Current' : 'Previous'}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(experience)}
                          className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                          title="Edit"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(experience._id)}
                          className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Experience;