import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 50,
    icon: ''
  });

  const fetchSkills = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/skills');
      setSkills(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSkill) {
        await axios.put(`http://localhost:5000/api/skills/${currentSkill._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/skills', formData);
      }
      setIsModalOpen(false);
      fetchSkills();
      resetForm();
    } catch (error) {
      console.error(error);
      alert('Error saving skill');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await axios.delete(`http://localhost:5000/api/skills/${id}`);
        fetchSkills();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openEditModal = (skill) => {
    setCurrentSkill(skill);
    setFormData(skill);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setCurrentSkill(null);
    setFormData({
      name: '',
      category: 'Frontend',
      proficiency: 50,
      icon: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Skills</h1>
          <p className="text-gray-500 mt-2">Manage your technical skills</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Skill
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-primary-50 rounded-lg text-primary-600 font-bold text-xl">
                    {skill.icon ? <i className={skill.icon}></i> : skill.name.charAt(0)}
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => openEditModal(skill)} className="text-gray-400 hover:text-gray-600">
                        <PencilSquareIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={() => handleDelete(skill._id)} className="text-red-400 hover:text-red-600">
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                 </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{skill.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{skill.category}</p>
              
              <div className="w-full bg-gray-100 rounded-full h-2">
                 <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${skill.proficiency}%` }}
                 />
              </div>
              <p className="text-right text-xs text-gray-400 mt-1">{skill.proficiency}%</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal - Simplified for brevity */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
             <div className="bg-white rounded-2xl w-full max-w-md z-10 p-6">
                <h2 className="text-xl font-bold mb-4">{currentSkill ? 'Edit' : 'Add'} Skill</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                       <label className="block text-sm font-medium mb-1">Name</label>
                       <input className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div>
                       <label className="block text-sm font-medium mb-1">Category</label>
                       <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                          <option>Frontend</option>
                          <option>Backend</option>
                          <option>Database</option>
                          <option>DevOps</option>
                          <option>Tools</option>
                          <option>Soft Skills</option>
                          <option>Other</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-medium mb-1">Proficiency ({formData.proficiency}%)</label>
                       <input type="range" className="w-full" min="0" max="100" value={formData.proficiency} onChange={e => setFormData({...formData, proficiency: e.target.value})} />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                        <button type="submit" className="btn-primary">Save</button>
                    </div>
                </form>
             </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;
