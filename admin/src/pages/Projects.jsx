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
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Portfolio</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and showcase your best work</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add Project
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card shadow-2xl shadow-primary-500/10 relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingProject ? 'Modify Project' : 'Launch New Project'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Project Title
                  </label>
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
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Project Category
                  </label>
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
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                  Description
                </label>
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
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Preview Image URL
                  </label>
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
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Stack (comma separated)
                  </label>
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
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Repository Link
                  </label>
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
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Production URL
                  </label>
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                
                <div className="flex items-center pb-3">
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
        )}
      </AnimatePresence>

      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Project Details</th>
                <th>Categories</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="group">
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <img 
                          src={project.image} 
                          alt="" 
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => e.target.src = 'https://placehold.co/600x400?text=No+Image'}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          {project.title}
                          {project.featured && <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />}
                        </span>
                        <span className="text-xs text-gray-400 line-clamp-1 max-w-[200px]">{project.description}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                     <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold uppercase rounded-lg">
                       {project.category}
                     </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {project.githubLink && <CodeBracketIcon className="h-4 w-4 text-emerald-500" />}
                      {project.liveLink && <GlobeAltIcon className="h-4 w-4 text-blue-500" />}
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2 pr-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                        title="Edit Project"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
                        title="Delete Project"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Projects;