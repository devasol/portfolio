import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { 
  PlusIcon, 
  XMarkIcon, 
  CalendarIcon, 
  PencilSquareIcon, 
  TrashIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm gap-4 transition-all">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Professional Experience
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your career timeline and milestones</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <PlusIcon className="h-5 w-5" />
          Add Experience
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Experience List Sidebar */}
        <div className="md:w-64 lg:w-80 flex-shrink-0 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm lg:sticky lg:top-24 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Career Timeline</h3>
            <div className="space-y-2">
              {experiences.map((exp) => (
                <button
                  key={exp._id}
                  onClick={() => handleEdit(exp)}
                  className={`w-full text-left p-3 rounded-xl transition-all border flex flex-col gap-1 group ${
                    editingExperience?._id === exp._id
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/50 hover:border-gray-100 dark:hover:border-gray-800'
                  }`}
                >
                  <div className="font-bold text-gray-900 dark:text-white text-sm truncate">{exp.position}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{exp.company}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md ${
                      exp.current 
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' 
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'
                    }`}>
                      {exp.current ? 'Current' : 'Past'}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(exp.startDate).getFullYear()}
                    </span>
                  </div>
                </button>
              ))}
              {experiences.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No milestones recorded</p>
              )}
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 shadow-sm"
              >
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {editingExperience ? 'Edit Milestone' : 'New Career Milestone'}
                  </h2>
                  <div className="flex items-center gap-2">
                    {editingExperience && (
                      <button 
                        onClick={() => handleDelete(editingExperience._id)}
                        className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                        title="Delete Milestone"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                    <button onClick={resetForm} className="text-gray-400 hover:text-emerald-500 transition-colors">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-style">Company Name</label>
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
                      <label className="label-style">Designation / Role</label>
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
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="label-style">Start Date</label>
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
                      <label className="label-style">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        disabled={formData.current}
                        className={`input-field ${formData.current ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                    </div>
      
                    <div className="flex items-center sm:pt-6">
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
                      <label className="label-style">Work Location</label>
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
                      <label className="label-style">Employment Type</label>
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
                    <label className="label-style">Job Description</label>
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
                    <label className="label-style">Technologies (comma separated)</label>
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
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50/50 dark:bg-gray-900/30 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-700 h-[500px] flex flex-col items-center justify-center text-center p-8 transition-all"
              >
                <div className="p-6 bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none mb-6 text-emerald-500">
                  <BriefcaseIcon className="h-12 w-12 animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Build your legacy</h3>
                <p className="max-w-xs text-gray-500 dark:text-gray-400">
                  Select a milestone from your past to refine its details or add a fresh experience to your timeline.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-8 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                >
                  Create New Entry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Experience;