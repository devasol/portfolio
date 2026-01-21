import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FolderIcon, 
  WrenchScrewdriverIcon, 
  BriefcaseIcon,
  UsersIcon 
} from '@heroicons/react/24/outline';

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
        const res = await axios.get('http://localhost:5000/api/admin/stats');
        setStats(res.data.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Projects', value: stats.totalProjects, icon: FolderIcon, color: 'bg-blue-500', bg: 'bg-blue-50' },
    { name: 'Total Skills', value: stats.totalSkills, icon: WrenchScrewdriverIcon, color: 'bg-purple-500', bg: 'bg-purple-50' },
    { name: 'Experience', value: stats.totalExperience, icon: BriefcaseIcon, color: 'bg-emerald-500', bg: 'bg-emerald-50' },
    { name: 'Users', value: stats.totalUsers, icon: UsersIcon, color: 'bg-orange-500', bg: 'bg-orange-50' },
  ];

  if (loading) return <div className="flex h-96 items-center justify-center">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color} text-white rounded-lg`} style={{ color: 'inherit' }} /> 
                {/* Actually let's just use text color on bg */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
             {/* Placeholders for actions */}
             <button className="p-4 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors">
                Add New Project
             </button>
             <button className="p-4 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors">
                Add New Skill
             </button>
          </div>
        </div>
        
        {/* Placeholder for Recent Activity or Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-center">
            <p className="text-gray-400">Activity Chart Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;