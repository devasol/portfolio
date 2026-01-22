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
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm gap-4 transition-all">
        <div className="max-w-full overflow-hidden">
          <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent truncate">
            Services & Offerings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Define and refine your professional value proposition</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center"
        >
          <PlusIcon className="h-5 w-5 group-hover:rotate-90 transition-transform" />
          Add New Service
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Services List Sidebar */}
        <div className="md:w-64 lg:w-80 flex-shrink-0 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm md:sticky md:top-24 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Catalog</h3>
            <div className="space-y-2">
              {services.map((service) => (
                <button
                  key={service._id}
                  onClick={() => handleEdit(service)}
                  className={`w-full text-left p-3 rounded-xl transition-all border flex flex-col gap-1 group ${
                    editingService?._id === service._id
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/50 hover:border-gray-100 dark:hover:border-gray-800'
                  }`}
                >
                  <div className="font-bold text-gray-900 dark:text-white text-sm truncate">{service.title}</div>
                  <div className="text-[10px] text-gray-500 line-clamp-1">{service.blurb}</div>
                  <div className="flex gap-1 mt-1 overflow-hidden">
                    {service.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 font-bold uppercase">
                        {tag}
                      </span>
                    ))}
                    {service.tags.length > 2 && <span className="text-[9px] text-gray-400">+{service.tags.length - 2}</span>}
                  </div>
                </button>
              ))}
              {services.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No services cataloged</p>
              )}
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {isModalOpen ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 shadow-sm"
              >
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <SparklesIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {editingService ? 'Refine Service' : 'Catalog New Service'}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    {editingService && (
                      <button 
                        onClick={() => handleDelete(editingService._id)}
                        className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                        title="Delete Service"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                    <button onClick={() => { resetForm(); setIsModalOpen(false); }} className="text-gray-400 hover:text-emerald-500 transition-colors">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
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
                  
                  <div className="space-y-2">
                    <label className="label-style">Market Blurb</label>
                    <textarea
                      required
                      placeholder="A short elevator pitch for this service..."
                      className="input-field min-h-[80px]"
                      value={formData.blurb}
                      onChange={(e) => setFormData({...formData, blurb: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="label-style">Detailed Breakdown</label>
                    <textarea
                      required
                      placeholder="List exactly what you offer in this service..."
                      className="input-field min-h-[120px]"
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-style">Stack Tags (comma separated)</label>
                      <input
                        type="text"
                        placeholder="React, Node.js, Cloud"
                        className="input-field"
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label-style">Display Priority</label>
                      <input
                        type="number"
                        className="input-field"
                        value={formData.order}
                        onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="btn-primary flex-1">
                      {editingService ? 'Update Service' : 'Save Service'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { resetForm(); setIsModalOpen(false); }}
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
                  <CommandLineIcon className="h-12 w-12 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Package your value</h3>
                <p className="max-w-xs text-gray-500 dark:text-gray-400">
                  Select a service to refine your offering or create a brand new one to showcase your skills.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-8 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                >
                  Create Service
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Services;
