import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import NoiseBackground from "./components/home/NoiseBackground";
import BackgroundGrid from "./components/common/BackgroundGrid";
import GlobalLoader from "./components/common/GlobalLoader";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ResumePage from "./pages/ResumePage";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";
import ErrorPage from "./pages/ErrorPage";
import "./index.css";

// Flexible application structure: 
// On desktop, it acts as a multi-page site.
// On mobile, the HomePage consolidates content for easier navigation.
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh antialiased">
        <GlobalLoader />
        <NoiseBackground />
        <BackgroundGrid />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
