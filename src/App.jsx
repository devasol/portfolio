import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import "./index.css";

// Flexible application structure:
// On desktop, it acts as a multi-page site.
// On mobile, the HomePage consolidates content for easier navigation.
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh antialiased flex flex-col items-center">
        <GlobalLoader />
        <ScrollProgress />
        <NoiseBackground />
        <BackgroundGrid />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* All other sections are handled via scrolling on the HomePage */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

