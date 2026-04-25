import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { api } from "./api";
import Navbar from "./components/home/Navbar";
import NoiseBackground from "./components/home/NoiseBackground";
import ScrollProgress from "./components/common/ScrollProgress";
import BackgroundGrid from "./components/common/BackgroundGrid";
import GlobalLoader from "./components/common/GlobalLoader";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ResumePage from "./pages/ResumePage";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";
import ErrorPage from "./pages/ErrorPage";
import PrintableResume from "./pages/PrintableResume";
import { SettingsProvider } from "./context/SettingsContext";
import Footer from "./components/common/Footer";
import "./index.css";

function AppContent() {
  const location = useLocation();
  const isPrintPage = location.pathname === "/resume-print";

  useEffect(() => {
    api.logVisit();
  }, []);

  return (
    <div className="min-h-dvh antialiased flex flex-col items-center">
      {!isPrintPage && <GlobalLoader />}
      {!isPrintPage && <ScrollProgress />}
      {!isPrintPage && <NoiseBackground />}
      {!isPrintPage && <BackgroundGrid />}
      {!isPrintPage && <Navbar />}
      <div className="w-full flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* We can re-enable other specific page routes if needed, but keeping Home consolidated for now */}
          <Route path="/resume-print" element={<PrintableResume />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      {!isPrintPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </BrowserRouter>
  );
}
