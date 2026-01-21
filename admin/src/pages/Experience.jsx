import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
} from '@heroicons/react/24/outline';

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    location: '',
    type: 'Full-time'
  });

  const fetchExperience = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/experience');
      setExperience(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (currentExp) {
            await axios.put(`http://localhost:5000/api/experience/${currentExp._id}`, formData);
        } else {
            await axios.post('http://localhost:5000/api/experience', formData);
        }
        setIsModalOpen(false);
        fetchExperience();
        resetForm();
    } catch (error) {
        console.error(error);
    }
  };

  const handleDelete = async (id) => {
      if (window.confirm('Delete this experience?')) {
          await axios.delete(`http://localhost:5000/api/experience/${id}`);
          fetchExperience();
      }
  };

  const handleEdit = (exp) => {
      setCurrentExp(exp);
      setFormData({
          ...exp,
          startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
          endDate: exp.endDate ? exp.endDate.split('T')[0] : ''
      });
      setIsModalOpen(true);
  };

  const resetForm = () => {
      setCurrentExp(null);
      setFormData({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        location: '',
        type: 'Full-time'
      });
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Experience</h1>
            <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="btn-primary flex items-center">
                <PlusIcon className="w-5 h-5 mr-2" /> Add Experience
            </button>
        </div>

        <div className="space-y-4">
            {experience.map((exp) => (
                <motion.div 
                    key={exp._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between group"
                >
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-primary-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button onClick={() => handleEdit(exp)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><PencilSquareIcon className="w-5 h-5"/></button>
                        <button onClick={() => handleDelete(exp._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><TrashIcon className="w-5 h-5"/></button>
                    </div>
                </motion.div>
            ))}
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                <div className="bg-white rounded-2xl w-full max-w-lg z-10 p-6 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">{currentExp ? 'Edit' : 'Add'} Experience</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input className="input-field" placeholder="Company" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
                        <input className="input-field" placeholder="Position" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} required />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="date" className="input-field" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} required />
                            <input type="date" className="input-field" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} disabled={formData.current} />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" checked={formData.current} onChange={e => setFormData({...formData, current: e.target.checked})} />
                            <label>I currently work here</label>
                        </div>
                        <textarea className="input-field" rows="4" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                            <button type="submit" className="btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};

export default Experience;
