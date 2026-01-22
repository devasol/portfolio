import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { 
  PlusIcon, 
  XMarkIcon, 
  PencilSquareIcon, 
  TrashIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  StarIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    githubLink: '',
    liveLink: '',
    category: 'Other',
    featured: false,
    order: 0
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
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
      const projectData = {
        ...formData,
        technologies: Array.isArray(formData.technologies) 
          ? formData.technologies 
          : formData.technologies.split(',').map(t => t.trim()).filter(t => t)
      };

      if (editingProject) {
        const updatedProject = await api.updateProject(editingProject._id, projectData);
        const updatedProjects = projects.map(proj =>
          proj._id === editingProject._id ? updatedProject.data : proj
        );
        setProjects(updatedProjects);
      } else {
        const newProject = await api.createProject(projectData);
        setProjects([...projects, newProject.data]);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      image: project.image || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(',') : '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      category: project.category || 'Other',
      featured: project.featured || false,
      order: project.order || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.deleteProject(id);
        const updatedProjects = projects.filter(proj => proj._id !== id);
        setProjects(updatedProjects);
      } catch (error) {
        console.error('Error deleting project:', error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: [],
      githubLink: '',
      liveLink: '',
      category: 'Other',
      featured: false,
      order: 0
    });
    setEditingProject(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="h-12 w-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm gap-4 transition-all">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Project Portfolio
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and showcase your best work</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <PlusIcon className="h-5 w-5" />
          Add New Project
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Project List Sidebar */}
        <div className="md:w-64 lg:w-80 flex-shrink-0 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm lg:sticky lg:top-24 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Your Projects</h3>
            <div className="space-y-2">
              {projects.map((project) => (
                <button
                  key={project._id}
                  onClick={() => handleEdit(project)}
                  className={`w-full text-left p-3 rounded-xl transition-all border flex gap-3 group ${
                    editingProject?._id === project._id
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/50 hover:border-gray-100 dark:hover:border-gray-800'
                  }`}
                >
                  <div className="h-12 w-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <img 
                      src={project.image} 
                      alt="" 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => e.target.src = 'https://placehold.co/600x400?text=No+Image'}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 dark:text-white truncate text-sm flex items-center gap-1.5">
                      {project.title}
                      {project.featured && <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight truncate mt-0.5">
                      {project.category}
                    </div>
                  </div>
                </button>
              ))}
              {projects.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No projects found</p>
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
                    {editingProject ? 'Modify Project' : 'Launch New Project'}
                  </h2>
                  <div className="flex items-center gap-2">
                    {editingProject && (
                      <button 
                        onClick={() => handleDelete(editingProject._id)}
                        className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                        title="Delete Project"
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
                      <label className="label-style">Project Title</label>
                      <input
                        type="text"
                        name="title"
                        placeholder="e.g. AI Dashboard, Web Shop"
                        value={formData.title}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="label-style">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="input-field appearance-none"
                      >
                        <option value="Frontend">Frontend Development</option>
                        <option value="Backend">Backend / API</option>
                        <option value="Full Stack">Full Stack Application</option>
                        <option value="Mobile">Mobile App</option>
                        <option value="UI/UX">UI/UX Design</option>
                        <option value="Other">Other Category</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="label-style">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell the story of this project..."
                      className="input-field resize-none"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-style">Preview Image URL</label>
                      <div className="relative">
                        <PhotoIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="image"
                          placeholder="https://..."
                          value={formData.image}
                          onChange={handleChange}
                          className="input-field pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="label-style">Stack (comma separated)</label>
                      <div className="relative">
                        <CodeBracketIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="technologies"
                          placeholder="React, Tailwind, Node.js..."
                          value={Array.isArray(formData.technologies) ? formData.technologies.join(',') : formData.technologies}
                          onChange={handleChange}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-style">Repository Link</label>
                      <input
                        type="text"
                        name="githubLink"
                        placeholder="https://github.com/..."
                        value={formData.githubLink}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="label-style">Production URL</label>
                      <div className="relative">
                        <GlobeAltIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="liveLink"
                          placeholder="https://..."
                          value={formData.liveLink}
                          onChange={handleChange}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                    <div className="space-y-2">
                      <label className="label-style">Display Order</label>
                      <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    
                    <div className="flex items-center lg:pt-6">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="peer sr-only"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full dark:bg-gray-700 peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 group-hover:text-emerald-500 transition-colors">
                          Featured Project
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="btn-primary flex-1">
                      {editingProject ? 'Update Project' : 'Publish Project'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-secondary px-8"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50/50 dark:bg-gray-900/30 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-700 h-[600px] flex flex-col items-center justify-center text-center p-8 transition-all"
              >
                <div className="p-6 bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none mb-6">
                  <StarIcon className="h-12 w-12 text-emerald-500 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Showcase your brilliance</h3>
                <p className="max-w-xs text-gray-500 dark:text-gray-400">
                  Select a project from the left to edit its details, or launch a new one into your portfolio.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-8 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                >
                  Create New Project
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Projects;