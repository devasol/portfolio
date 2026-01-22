import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { 
  PlusIcon, 
  XMarkIcon, 
  PencilSquareIcon, 
  TrashIcon,
  AcademicCapIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Other',
    proficiency: 50,
    order: 0
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await api.getSkills();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingSkill) {
        const updatedSkill = await api.updateSkill(editingSkill._id, formData);
        const updatedSkills = skills.map(skill =>
          skill._id === editingSkill._id ? updatedSkill.data : skill
        );
        setSkills(updatedSkills);
      } else {
        const newSkill = await api.createSkill(formData);
        setSkills([...skills, newSkill.data]);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving skill:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name || '',
      category: skill.category || 'Other',
      proficiency: skill.proficiency || 50,
      order: skill.order || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.deleteSkill(id);
        const updatedSkills = skills.filter(skill => skill._id !== id);
        setSkills(updatedSkills);
      } catch (error) {
        console.error('Error deleting skill:', error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Other',
      proficiency: 50,
      order: 0
    });
    setEditingSkill(null);
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Expertise & Skills</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quantify and categorize your professional abilities</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add Skill
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="card shadow-2xl shadow-primary-500/10"
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingSkill ? 'Refine Skill' : 'New Ability'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Skill Identity
                  </label>
                  <div className="relative">
                    <BoltIcon className="absolute left-3 top-3.5 h-5 w-5 text-emerald-500" />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. React.js, Python, AWS"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Domain
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field appearance-none"
                  >
                    <option value="Frontend">Frontend Development</option>
                    <option value="Backend">Backend / Server</option>
                    <option value="Database">Database Management</option>
                    <option value="DevOps">Cloud & DevOps</option>
                    <option value="Tools">Development Tools</option>
                    <option value="Soft Skills">Interpersonal Skills</option>
                    <option value="Other">Miscellaneous</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    <span>Proficiency Level</span>
                    <span className="text-emerald-500">{formData.proficiency}%</span>
                  </div>
                  <input
                    type="range"
                    name="proficiency"
                    min="0"
                    max="100"
                    value={formData.proficiency}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Sorting Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  {editingSkill ? 'Apply Changes' : 'Catalog Skill'}
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
      </AnimatePresence>

      <div className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Skill & Taxonomy</th>
                <th>Mastery Level</th>
                <th>Priority</th>
                <th className="text-right">Manage</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill._id} className="group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                        <AcademicCapIcon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 dark:text-white">{skill.name}</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">{skill.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="w-1/3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-gray-600 dark:text-gray-400">{skill.proficiency}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs font-medium text-gray-400">Rank #{skill.order}</span>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2 pr-4">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
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

export default Skills;