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
                <Route path="skills" element={<Skills />} />
                <Route path="experience" element={<Experience />} />
            </Route>
        </Routes>
    );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;