import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HomeIcon, 
  FolderIcon, 
  WrenchScrewdriverIcon, 
  BriefcaseIcon, 
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (windowWidth < 768) setIsOpen(false);
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'Projects', path: '/projects', icon: FolderIcon },
    { name: 'Services', path: '/services', icon: WrenchScrewdriverIcon },
    { name: 'Skills', path: '/skills', icon: Square3Stack3DIcon },
    { name: 'Experience', path: '/experience', icon: BriefcaseIcon },
    { name: 'Settings', path: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <motion.div 
      initial={false}
      animate={{ 
        x: (windowWidth >= 768 || isOpen) ? 0 : -280,
      }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={`fixed inset-y-0 left-0 w-64 bg-white/60 dark:bg-gray-900/40 backdrop-blur-2xl border-r border-gray-100 dark:border-gray-800/50 z-30 flex flex-col ${isOpen ? 'shadow-2xl' : ''}`}
    >
      <div className="flex items-center justify-between px-6 h-20 border-b border-gray-50/50 dark:border-gray-800/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-600 rounded-lg">
            <RocketLaunchIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-400 dark:to-white bg-clip-text text-transparent">
            CORE
          </h1>
        </div>

        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (windowWidth < 768) setIsOpen(false);
            }}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-2xl transition-all duration-300 group relative ${
                isActive
                  ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/20'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/40 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-5 w-5 mr-3 transition-transform duration-300 ${
                  isActive 
                    ? 'text-white scale-110' 
                    : 'text-gray-400 dark:text-gray-500 group-hover:scale-110'
                }`} />
                <span className="text-sm font-bold tracking-wide">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-primary-600 -z-10 rounded-2xl blur-sm opacity-20"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-4 py-3.5 text-sm font-bold text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-all duration-300 group"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Logout System
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;