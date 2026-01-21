import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useSidebar } from '../context/SidebarContext';
import styles from './Header.module.css';

const Header = ({ setIsAuthenticated }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={styles.header}
    >
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          {/* Mobile menu button */}
          <button
            type="button"
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
          </button>

          <div className={styles.headerCenter}>
            <div className={styles.headerLogo}>
              <h1 className={styles.headerTitle}>Admin Dashboard</h1>
            </div>
          </div>

          <div className={styles.headerActions}>
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={styles.iconButton}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className={styles.iconButton}>
                <BellIcon className="h-5 w-5" />
                <span className={styles.notificationBadge}>3</span>
              </button>
            </div>

            {/* Settings */}
            <Link
              to="/settings"
              className={styles.iconButton}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </Link>

            {/* User dropdown */}
            <div className={styles.userSection}>
              <div className={styles.userInfo}>
                <p className={styles.userName}>Admin User</p>
                <p className={styles.userRole}>Administrator</p>
              </div>
              <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <UserCircleIcon className="h-8 w-8 text-gray-400 dark:text-gray-300" />
              </button>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={styles.mobileMenu}
        >
          <div className={styles.mobileMenuContent}>
            <Link
              to="/dashboard"
              className={styles.mobileMenuItem}
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className={styles.mobileMenuItem}
              onClick={closeMobileMenu}
            >
              Projects
            </Link>
            <Link
              to="/messages"
              className={styles.mobileMenuItem}
              onClick={closeMobileMenu}
            >
              Messages
            </Link>
            <Link
              to="/settings"
              className={styles.mobileMenuItem}
              onClick={closeMobileMenu}
            >
              Settings
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;