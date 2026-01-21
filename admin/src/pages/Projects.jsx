import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    githubLink: '',
    liveLink: '',
    category: 'Other',
    technologies: '',
    featured: false
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim())
    };

    try {
      if (currentProject) {
        await axios.put(`http://localhost:5000/api/projects/${currentProject._id}`, data);
      } else {
        await axios.post('http://localhost:5000/api/projects', data);
      }
      setIsModalOpen(false);
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error(error);
      alert('Error saving project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openEditModal = (project) => {
    setCurrentProject(project);
    setFormData({
      ...project,
      technologies: project.technologies.join(', ')
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setCurrentProject(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      githubLink: '',
      liveLink: '',
      category: 'Other',
      technologies: '',
      featured: false
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-2">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Project
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="h-48 w-full bg-gray-200 relative group">
                <img 
                  src={project.image || 'https://via.placeholder.com/400x300'} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <button 
                    onClick={() => openEditModal(project)}
                    className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(project._id)}
                    className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-primary-50 text-primary-600 rounded-full">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-xs font-semibold px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                     <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form id="projectForm" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                       <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                       <input type="text" required className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div className="col-span-2">
                       <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                       <textarea rows="3" required className="input-field" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div className="col-span-2">
                       <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                       <input type="text" required className="input-field" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Github Link</label>
                       <input type="text" className="input-field" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Live Link</label>
                       <input type="text" className="input-field" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                       <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                          <option>Frontend</option>
                          <option>Backend</option>
                          <option>Full Stack</option>
                          <option>Mobile</option>
                          <option>UI/UX</option>
                          <option>Other</option>
                       </select>
                    </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
                       <div className="flex items-center h-full">
                           <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
                           <span className="ml-2 text-sm text-gray-600">Show on Home Page</span>
                       </div>
                    </div>
                    <div className="col-span-2">
                       <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma separated)</label>
                       <input type="text" className="input-field" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} />
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                 <button type="submit" form="projectForm" className="btn-primary">Save Project</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;