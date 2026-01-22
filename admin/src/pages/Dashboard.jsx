import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { 
  FolderIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  UsersIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  SparklesIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSkills: 0,
    totalExperience: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills, experience] = await Promise.all([
          api.getProjects(),
          api.getSkills(),
          api.getExperience()
        ]);

        setStats({
          totalProjects: projects.length,
          totalSkills: skills.length,
          totalExperience: experience.length,
          totalUsers: 1
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <SparklesIcon className="h-6 w-6 text-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Projects', value: stats.totalProjects, icon: FolderIcon, color: 'emerald', trend: '+12%', up: true },
    { label: 'Skills Mastered', value: stats.totalSkills, icon: AcademicCapIcon, color: 'blue', trend: '+5%', up: true },
    { label: 'Work Experience', value: stats.totalExperience, icon: BriefcaseIcon, color: 'purple', trend: 'STABLE', up: true },
    { label: 'Unique Visitors', value: '1.2k', icon: UsersIcon, color: 'orange', trend: '+18%', up: true },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto space-y-8 pb-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm gap-4 transition-all">
        <div className="max-w-full overflow-hidden">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent truncate">
            System Overview
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time performance and portfolio analytics</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
           <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-bold rounded-full flex items-center gap-1">
             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             Live System
           </span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, idx) => {
          const colorClasses = {
            emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
            blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
            purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
            orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
          };
          
          const sparklineClasses = {
            emerald: 'bg-emerald-500',
            blue: 'bg-blue-500',
            purple: 'bg-purple-500',
            orange: 'bg-orange-500',
          };

          return (
            <motion.div key={idx} variants={item} className="stat-card group">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${colorClasses[stat.color]}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.up ? <ArrowTrendingUpIcon className="h-3 w-3" /> : <ArrowTrendingDownIcon className="h-3 w-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">{stat.value}</div>
                <div className="text-sm font-medium text-gray-400 dark:text-gray-500 mt-1">{stat.label}</div>
              </div>
              {/* Minimal Sparkline (SVG) */}
              <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden opacity-20 group-hover:opacity-100 transition-opacity">
                 <div className={`h-full w-full transform -translate-x-1/2 group-hover:translate-x-0 transition-transform duration-1000 ${sparklineClasses[stat.color]}`}></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Chart Mock */}
        <motion.div variants={item} className="lg:col-span-2 card overflow-hidden group">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Portfolio Engagement</h3>
              <p className="text-sm text-gray-400">Visitor interactions over the last 30 days</p>
            </div>
            <select className="bg-gray-50 dark:bg-gray-900 border-none text-xs font-bold rounded-lg px-3 py-2 outline-none cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          
          <div className="h-64 w-full relative">
            <svg viewBox="0 0 800 200" className="w-full h-full">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.2 }} />
                  <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                d="M0,150 Q100,50 200,120 T400,80 T600,140 T800,60" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />
              <path d="M0,150 Q100,50 200,120 T400,80 T600,140 T800,60 V200 H0 Z" fill="url(#grad)" />
              {/* Data points */}
              {[100, 200, 400, 600, 800].map((x, i) => (
                <circle key={i} cx={x} cy={i % 2 === 0 ? 120 : 60} r="4" fill="#10b981" className="animate-pulse" />
              ))}
            </svg>
            <div className="absolute inset-0 flex items-end justify-between px-2 pt-40 pointer-events-none">
               {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'].map((w, idx) => (
                 <span key={idx} className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{w}</span>
               ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Timeline */}
            <motion.div variants={item} className="card">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-primary-500" />
                Recent Activity
              </h3>
              <div className="space-y-6">
                {[
                  { type: 'project', title: 'New Project Added', time: '2 hours ago', icon: CheckCircleIcon, color: 'emerald' },
                  { type: 'skill', title: 'Skill Proficiency Updated', time: '5 hours ago', icon: ArrowTrendingUpIcon, color: 'blue' },
                  { type: 'settings', title: 'Site Bio Modified', time: 'Yesterday', icon: FolderIcon, color: 'purple' },
                  { type: 'system', title: 'System Backup Complete', time: '2 days ago', icon: CheckCircleIcon, color: 'gray' },
                ].map((activity, idx) => {
                  const activityColors = {
                    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
                    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
                    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
                    gray: 'bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400',
                  };

                  return (
                    <div key={idx} className="flex gap-4 group cursor-default">
                      <div className="relative flex flex-col items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center z-10 border-2 border-white dark:border-gray-800 transition-transform group-hover:scale-110 ${activityColors[activity.color]}`}>
                          <activity.icon className="h-4 w-4" />
                        </div>
                        {idx !== 3 && <div className="w-0.5 h-full bg-gray-100 dark:bg-gray-800 absolute top-8"></div>}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-800 dark:text-gray-200">{activity.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{activity.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
          <button className="w-full mt-8 py-2 text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
            View All Logs
          </button>
        </motion.div>

        {/* Category Breakdown Mock */}
        <motion.div variants={item} className="card group">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Category Breakdown</h3>
          <p className="text-sm text-gray-400 mb-8">Distribution of projects by domain</p>
          
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="relative h-48 w-48">
              <svg viewBox="0 0 100 100" className="rotate-[-90deg] h-full w-full">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-gray-100 dark:text-gray-800" />
                <motion.circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  stroke="#10b981" 
                  strokeWidth="12" 
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 * (1 - 0.45) }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  strokeLinecap="round" 
                />
                <motion.circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  stroke="#3b82f6" 
                  strokeWidth="12" 
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 * (1 - 0.30) }}
                  // This is simplified, real pie would offset correctly
                  style={{ rotate: '162deg', transformOrigin: '50% 50%' }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                  strokeLinecap="round" 
                />
                <motion.circle 
                  cx="50" cy="50" r="40" 
                  fill="transparent" 
                  stroke="#a855f7" 
                  strokeWidth="12" 
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 * (1 - 0.25) }}
                  style={{ rotate: '270deg', transformOrigin: '50% 50%' }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">100%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Profiled</span>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {[
                { name: 'Frontend', percent: 45, color: 'bg-emerald-500' },
                { name: 'Backend', percent: 30, color: 'bg-blue-500' },
                { name: 'Full Stack', percent: 25, color: 'bg-purple-500' },
              ].map((cat, i) => (
                <div key={i} className="flex items-center justify-between group/legend cursor-default">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${cat.color} group-hover/legend:scale-125 transition-transform`}></div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{cat.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{cat.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Launch Section */}
      <motion.div variants={item} className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-500/20">
        <SparklesIcon className="absolute -right-4 -top-4 h-24 w-24 sm:h-32 sm:w-32 opacity-10 animate-pulse" />
        <div className="relative z-10 max-w-xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome to your refined control center</h2>
          <p className="text-sm sm:text-base text-emerald-50 opacity-80 mb-6">Your portfolio is currently performing optimally. Manage your professional presence with these quick actions.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="w-full sm:w-auto px-6 py-2.5 bg-white text-emerald-700 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-colors active:scale-95 text-sm sm:text-base">
              Add New Work
            </button>
            <button className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500/30 text-white font-bold rounded-xl border border-white/20 hover:bg-emerald-500/40 transition-colors active:scale-95 text-sm sm:text-base">
              Update Skills
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;