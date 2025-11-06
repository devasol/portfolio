import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import NoiseBackground from "./components/home/NoiseBackground";
import BackgroundGrid from "./components/common/BackgroundGrid";
import GlobalLoader from "./components/common/GlobalLoader";
import SinglePage from "./pages/SinglePage";
import "./index.css";

// Component to handle scrolling to sections
function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToSection />
      <div className="min-h-dvh antialiased">
        <GlobalLoader />
        <NoiseBackground />
        <BackgroundGrid />
        <Navbar />
        <Routes>
          <Route path="/" element={<SinglePage />} />
          {/* Keep individual routes for direct access but redirect to main page */}
          <Route path="/services" element={<SinglePage />} />
          <Route path="/resume" element={<SinglePage />} />
          <Route path="/work" element={<SinglePage />} />
          <Route path="/contact" element={<SinglePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
