import { useState, useEffect } from "react";
import Hero from "../components/home/Hero";
import Services from "../components/services/Services";
import WorkPage from "./WorkPage";
import ResumePage from "./ResumePage";
import ContactPage from "./ContactPage";
import FadeIn from "../components/common/FadeIn";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="flex flex-col gap-0">
      {/* Home Section - Always visible */}
      <section id="home" className="min-h-screen flex items-center">
        <Hero />
      </section>

      {/* Conditionally reveal all sections with zero gap logic */}
      {isMobile && (
        <div className="flex flex-col gap-0 -mt-10">
          <section id="services">
            <Services />
          </section>

          <section id="work" className="-mt-16 sm:-mt-24">
            <WorkPage />
          </section>

          <section id="resume" className="-mt-16 sm:-mt-24">
            <ResumePage />
          </section>

          <section id="contact" className="-mt-16 sm:-mt-24">
            <ContactPage />
          </section>
        </div>
      )}
    </main>
  );
}
