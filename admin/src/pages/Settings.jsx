import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  HomeIcon,
  UserIcon,
  GlobeAltIcon,
  ShareIcon,
  AcademicCapIcon,
  PlusIcon,
  TrashIcon,
  ArrowPathIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await api.getSettings();
      setSettings(data);
    } catch (err) {
      setError('Failed to load settings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      await api.updateSettings(settings);
      setSuccess('Settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'hero', name: 'Hero Section', icon: HomeIcon },
    { id: 'about', name: 'About Content', icon: UserIcon },
    { id: 'site', name: 'Site Identity', icon: GlobeAltIcon },
    { id: 'education', name: 'Education', icon: AcademicCapIcon },
    { id: 'contact', name: 'Contact Info', icon: EnvelopeIcon },
    { id: 'socials', name: 'Social Links', icon: ShareIcon },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <ArrowPathIcon className="h-8 w-8 text-emerald-500 animate-spin mb-4" />
      <p className="text-gray-500">Loading site content...</p>
    </div>
  );

  if (!settings) return (
    <div className="p-8 text-center">
      <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <p className="text-red-500 font-bold">Error: Settings not found</p>
      <button onClick={fetchSettings} className="mt-4 btn-secondary">Try Again</button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Site Settings
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Manage everything visible on your portfolio</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-xl font-bold transition-all justify-center w-full sm:w-auto ${
            saving 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-95'
          }`}
        >
          {saving ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <CheckCircleIcon className="h-5 w-5" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="md:w-60 lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-2 shadow-sm sticky top-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all mb-1 ${
                  activeTab === tab.id
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-8 shadow-sm"
            >
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-6">Hero Section Content</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="label-style">Full Name</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.hero.name}
                        onChange={(e) => setSettings({...settings, hero: {...settings.hero, name: e.target.value}})}
                      />
                    </div>
                    <div>
                      <label className="label-style">Welcome Text</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.hero.welcomeText}
                        onChange={(e) => setSettings({...settings, hero: {...settings.hero, welcomeText: e.target.value}})}
                      />
                    </div>
                    <div>
                      <label className="label-style">Professional Role</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.hero.role}
                        onChange={(e) => setSettings({...settings, hero: {...settings.hero, role: e.target.value}})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label-style">Hero Bio</label>
                      <textarea
                        className="input-field min-h-[120px]"
                        value={settings.hero.bio}
                        onChange={(e) => setSettings({...settings, hero: {...settings.hero, bio: e.target.value}})}
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Stats Counters</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {settings.hero.stats.map((stat, idx) => (
                        <div key={idx} className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/30">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Value</label>
                              <input
                                type="text"
                                className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none text-lg font-bold text-gray-900 dark:text-white"
                                value={stat.value}
                                onChange={(e) => {
                                  const newStats = [...settings.hero.stats];
                                  newStats[idx].value = e.target.value;
                                  setSettings({...settings, hero: {...settings.hero, stats: newStats}});
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <div>
                                <label className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Label Line 1</label>
                                <input
                                  type="text"
                                  className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none text-xs text-gray-700 dark:text-gray-300"
                                  value={stat.label1}
                                  onChange={(e) => {
                                    const newStats = [...settings.hero.stats];
                                    newStats[idx].label1 = e.target.value;
                                    setSettings({...settings, hero: {...settings.hero, stats: newStats}});
                                  }}
                                />
                              </div>
                              <div>
                                <label className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Label Line 2</label>
                                <input
                                  type="text"
                                  className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none text-xs text-gray-700 dark:text-gray-300"
                                  value={stat.label2}
                                  onChange={(e) => {
                                    const newStats = [...settings.hero.stats];
                                    newStats[idx].label2 = e.target.value;
                                    setSettings({...settings, hero: {...settings.hero, stats: newStats}});
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">About Section Content</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-style">Section Title</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.about.title}
                        onChange={(e) => setSettings({...settings, about: {...settings.about, title: e.target.value}})}
                      />
                    </div>
                    <div>
                      <label className="label-style">Section Subtitle</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.about.subtitle}
                        onChange={(e) => setSettings({...settings, about: {...settings.about, subtitle: e.target.value}})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-style">Main Paragraphs</label>
                    <div className="space-y-4">
                      {settings.about.paragraphs.map((p, idx) => (
                        <textarea
                          key={idx}
                          className="input-field min-h-[100px]"
                          value={p}
                          onChange={(e) => {
                            const newPara = [...settings.about.paragraphs];
                            newPara[idx] = e.target.value;
                            setSettings({...settings, about: {...settings.about, paragraphs: newPara}});
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-6">Interactive Code Block Data</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label className="label-style">First Name</label>
                        <input
                          type="text"
                          className="input-field"
                          value={settings.about.codeBlock.firstName}
                          onChange={(e) => setSettings({...settings, about: {...settings.about, codeBlock: {...settings.about.codeBlock, firstName: e.target.value}}})}
                        />
                      </div>
                      <div>
                        <label className="label-style">Last Name</label>
                        <input
                          type="text"
                          className="input-field"
                          value={settings.about.codeBlock.lastName}
                          onChange={(e) => setSettings({...settings, about: {...settings.about, codeBlock: {...settings.about.codeBlock, lastName: e.target.value}}})}
                        />
                      </div>
                      <div>
                        <label className="label-style">Role Display</label>
                        <input
                          type="text"
                          className="input-field"
                          value={settings.about.codeBlock.role}
                          onChange={(e) => setSettings({...settings, about: {...settings.about, codeBlock: {...settings.about.codeBlock, role: e.target.value}}})}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="label-style">Bio Lines (Commented style)</label>
                      <div className="space-y-3">
                        {settings.about.codeBlock.bioLines.map((line, idx) => (
                          <input
                            key={idx}
                            type="text"
                            className="input-field font-mono text-xs"
                            value={line}
                            onChange={(e) => {
                              const newLines = [...settings.about.codeBlock.bioLines];
                              newLines[idx] = e.target.value;
                              setSettings({...settings, about: {...settings.about, codeBlock: {...settings.about.codeBlock, bioLines: newLines}}});
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'site' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Site Identity & Assets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-style">Logo / Navbar Name</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.site.logoText}
                        onChange={(e) => setSettings({...settings, site: {...settings.site, logoText: e.target.value}})}
                      />
                    </div>
                    <div>
                      <label className="label-style">Resume URL (PDF Path)</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.site.resumeLink}
                        onChange={(e) => setSettings({...settings, site: {...settings.site, resumeLink: e.target.value}})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label-style">Profile Image Link</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.site.profileImage}
                        onChange={(e) => setSettings({...settings, site: {...settings.site, profileImage: e.target.value}})}
                      />
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">Recommended: Relative path like /assets/profile.png or full URL</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Academic Background</h3>
                    <button
                      type="button"
                      onClick={() => {
                        const newEdu = [...(settings.education || [])];
                        newEdu.push({ degree: '', school: '', period: '' });
                        setSettings({...settings, education: newEdu});
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Education
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(settings.education || []).map((edu, idx) => (
                      <div key={idx} className="p-6 border border-gray-100 dark:border-gray-700 rounded-2xl bg-gray-50/50 dark:bg-gray-900/30 relative group">
                        <button
                          type="button"
                          onClick={() => {
                            const newEdu = [...settings.education];
                            newEdu.splice(idx, 1);
                            setSettings({...settings, education: newEdu});
                          }}
                          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="label-style">Degree / Qualification</label>
                            <input
                              type="text"
                              className="input-field"
                              value={edu.degree}
                              onChange={(e) => {
                                const newEdu = [...settings.education];
                                newEdu[idx].degree = e.target.value;
                                setSettings({...settings, education: newEdu});
                              }}
                            />
                          </div>
                          <div>
                            <label className="label-style">Institution / School</label>
                            <input
                              type="text"
                              className="input-field"
                              value={edu.school}
                              onChange={(e) => {
                                const newEdu = [...settings.education];
                                newEdu[idx].school = e.target.value;
                                setSettings({...settings, education: newEdu});
                              }}
                            />
                          </div>
                          <div>
                            <label className="label-style">Period (e.g. 2021 — Present)</label>
                            <input
                              type="text"
                              className="input-field"
                              value={edu.period}
                               onChange={(e) => {
                                 const newEdu = [...settings.education];
                                 newEdu[idx].period = e.target.value;
                                 setSettings({...settings, education: newEdu});
                               }}
                             />
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
 
               {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Contact Page Info</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="label-style">Availability Status</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.contact.availability}
                        onChange={(e) => setSettings({...settings, contact: {...settings.contact, availability: e.target.value}})}
                      />
                    </div>
                    <div>
                      <label className="label-style">Capabilities (comma separated)</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.contact.capabilities.join(', ')}
                        onChange={(e) => setSettings({...settings, contact: {...settings.contact, capabilities: e.target.value.split(',').map(s => s.trim())}})}
                      />
                    </div>
                    <div>
                      <label className="label-style">Preferred Tools (comma separated)</label>
                      <input
                        type="text"
                        className="input-field"
                        value={settings.contact.tools.join(', ')}
                        onChange={(e) => setSettings({...settings, contact: {...settings.contact, tools: e.target.value.split(',').map(s => s.trim())}})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'socials' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Social Media & Contact Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-style">GitHub Profile</label>
                      <div className="relative">
                        <GlobeAltIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                          type="text"
                          className="input-field pl-10"
                          value={settings.socials.github}
                          onChange={(e) => setSettings({...settings, socials: {...settings.socials, github: e.target.value}})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label-style">LinkedIn Profile</label>
                      <div className="relative">
                        <GlobeAltIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                          type="text"
                          className="input-field pl-10"
                          value={settings.socials.linkedin}
                          onChange={(e) => setSettings({...settings, socials: {...settings.socials, linkedin: e.target.value}})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label-style">Public Email</label>
                      <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                          type="text"
                          className="input-field pl-10"
                          value={settings.socials.email}
                          onChange={(e) => setSettings({...settings, socials: {...settings.socials, email: e.target.value}})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label-style">Twitter / X</label>
                      <div className="relative">
                        <ShareIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <input
                          type="text"
                          className="input-field pl-10"
                          value={settings.socials.twitter}
                          onChange={(e) => setSettings({...settings, socials: {...settings.socials, twitter: e.target.value}})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Persistence Notifications */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-6 right-6 p-4 bg-red-600 text-white rounded-xl shadow-2xl z-50 flex items-center gap-3"
          >
            <ExclamationTriangleIcon className="h-6 w-6" />
            <span className="font-bold">{error}</span>
          </motion.div>
        )}
        {success && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-6 right-6 p-4 bg-emerald-600 text-white rounded-xl shadow-2xl z-50 flex items-center gap-3"
          >
            <CheckCircleIcon className="h-6 w-6" />
            <span className="font-bold">{success}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  );
};

export default Settings;