import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BackgroundGrid from './BackgroundGrid';
import NoiseBackground from './NoiseBackground';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen transition-colors duration-300 relative overflow-hidden bg-gray-50 dark:bg-[#0f172a]">
      {/* Interactive Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NoiseBackground />
        <BackgroundGrid />
      </div>

      <Sidebar />

      {/* Main content */}
      <div className="ml-64 px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="py-6 border-b border-gray-100 dark:border-gray-800 mb-8 flex justify-between items-center bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-md sticky top-0 z-20">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
            {window.location.pathname.split('/')[1] || 'dashboard'}
          </h2>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </button>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;