import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Projects from './pages/Projects';
import ProtectedRoute from './components/ProtectedRoute';

import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Services from './pages/Services';
import Settings from './pages/Settings';
import Messages from './pages/Messages';

const AppRoutes = () => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) return <div>Loading...</div>;

    return (
        <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            
            <Route path="/" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Layout />
                </ProtectedRoute>
            }>
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<Projects />} />
                <Route path="services" element={<Services />} />
                <Route path="skills" element={<Skills />} />
                <Route path="experience" element={<Experience />} />
                <Route path="settings" element={<Settings />} />
                <Route path="messages" element={<Messages />} />
            </Route>
        </Routes>
    );
};

import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;