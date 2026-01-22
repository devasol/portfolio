import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  CommandLineIcon,
  ArrowPathIcon,
  XMarkIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    blurb: '',
    details: '',
    tags: '',
    iconName: 'CommandLineIcon',
    order: 0
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await api.getServices();
      setServices(data || []);
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : formData.tags
    };

    try {
      if (editingService) {
        await api.updateService(editingService._id, data);
      } else {
        await api.createService(data);
      }
      setIsModalOpen(false);
      fetchServices();
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      blurb: service.blurb,
      details: service.details,
      tags: Array.isArray(service.tags) ? service.tags.join(', ') : '',
      iconName: service.iconName || 'CommandLineIcon',
      order: service.order || 0
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.deleteService(id);
        fetchServices();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const resetForm = () => {
    setEditingService(null);
    setFormData({
      title: '',
      blurb: '',
      details: '',
      tags: '',
      iconName: 'CommandLineIcon',
      order: 0
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="h-10 w-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 backdrop-blur-md">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Services & Offerings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Define and refine your professional value proposition</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="btn-primary flex items-center gap-2 group"
        >
          <PlusIcon className="h-5 w-5 group-hover:rotate-90 transition-transform" />
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {services.map((service, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={service._id}
              className="card group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-xl">
                  <CommandLineIcon className="h-6 w-6" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{service.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6 min-h-[60px]">{service.blurb}</p>
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden"
            >
              <div className="flex justify-between items-center p-8 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-600 rounded-lg">
                    <SparklesIcon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                    {editingService ? 'Refine Service' : 'Catalog New Service'}
                  </h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="label-style">Service Title</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Full-Stack Web Development"
                      className="input-field"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="label-style">Market Blurb</label>
                    <textarea
                      required
                      placeholder="A short elevator pitch for this service..."
                      className="input-field min-h-[100px] py-4"
                      value={formData.blurb}
                      onChange={(e) => setFormData({...formData, blurb: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="label-style">Technical Details</label>
                    <textarea
                      required
                      placeholder="Detailed breakdown of what's included..."
                      className="input-field min-h-[140px] py-4"
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label-style">Tech Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="React, Tailwind, Node.js"
                      className="input-field"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label-style">Priority Index</label>
                    <input
                      type="number"
                      className="input-field"
                      value={formData.order}
                      onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="btn-primary flex-1 py-4">
                    {editingService ? 'Deploy Updates' : 'Launch Service'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary px-8 py-4"
                  >
                    Discard
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
