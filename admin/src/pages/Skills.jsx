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
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm gap-4 transition-all">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Expertise & Skills
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quantify and categorize your professional abilities</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <PlusIcon className="h-5 w-5" />
          Add New Skill
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Skills List Sidebar */}
        <div className="md:w-64 lg:w-80 flex-shrink-0 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm lg:sticky lg:top-24 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Abilities Dashboard</h3>
            <div className="space-y-2">
              {skills.map((skill) => (
                <button
                  key={skill._id}
                  onClick={() => handleEdit(skill)}
                  className={`w-full text-left p-3 rounded-xl transition-all border flex flex-col gap-2 group ${
                    editingSkill?._id === skill._id
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/50 hover:border-gray-100 dark:hover:border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white text-sm truncate">{skill.name}</span>
                    <span className="text-[10px] font-bold text-emerald-500">{skill.proficiency}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-500" 
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{skill.category}</span>
                  </div>
                </button>
              ))}
              {skills.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No skills cataloged</p>
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
                    {editingSkill ? 'Refine Skill' : 'New Ability'}
                  </h2>
                  <div className="flex items-center gap-2">
                    {editingSkill && (
                      <button 
                        onClick={() => handleDelete(editingSkill._id)}
                        className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                        title="Delete Skill"
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
                      <label className="label-style">Skill Identity</label>
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
                      <label className="label-style">Domain</label>
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
                      <label className="label-style">Sorting Order</label>
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
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50/50 dark:bg-gray-900/30 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-700 h-[400px] flex flex-col items-center justify-center text-center p-8 transition-all"
              >
                <div className="p-6 bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none mb-6 text-emerald-500">
                  <BoltIcon className="h-12 w-12 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Master your craft</h3>
                <p className="max-w-xs text-gray-500 dark:text-gray-400">
                  Select a skill to refine your proficiency, or add a new expertise to your radar.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-8 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                >
                  Create New Skill
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Skills;