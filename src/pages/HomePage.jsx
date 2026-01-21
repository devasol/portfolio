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
    <main className="flex flex-col gap-0 w-full">
      {/* Home Section - Always visible */}
      <section id="home" className="min-h-screen flex items-center justify-center">
        <Hero />
      </section>

      {/* Conditionally reveal all sections with zero gap logic */}
      {!isMobile && (
        <>
          {/* Services Section */}
          <section id="services" className="py-16 sm:py-20 w-full flex justify-center">
            <div className="w-full max-w-7xl">
              <FadeIn variant="scale-in">
                <Services />
              </FadeIn>
            </div>
          </section>

          {/* Work Section */}
          <section id="work" className="py-16 sm:py-20 w-full flex justify-center">
            <div className="w-full max-w-7xl">
              <FadeIn variant="blur">
                <WorkPage />
              </FadeIn>
            </div>
          </section>

          {/* Resume Section */}
          <section id="resume" className="py-16 sm:py-20 w-full flex justify-center">
            <div className="w-full max-w-7xl">
              <FadeIn variant="fade-up">
                <ResumePage />
              </FadeIn>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-16 sm:py-20 w-full flex justify-center">
            <div className="w-full max-w-7xl">
              <FadeIn variant="scale-in">
                <ContactPage />
              </FadeIn>
            </div>
          </section>
        </>
      )}

      {/* Conditionally show mobile version */}
      {isMobile && (
        <div className="flex flex-col gap-0 -mt-10">
          <section id="services" className="w-full flex justify-center">
            <div className="w-full max-w-7xl">
              <Services />
            </div>
          </section>

          <section id="work" className="-mt-16 sm:-mt-24 w-full flex justify-center">
            <div className="w-full max-w-7xl">
              <WorkPage />
            </div>
          </section>

          <section id="resume" className="-mt-16 sm:-mt-24 w-full flex justify-center">
            <div className="w-full max-w-7xl">
              <ResumePage />
            </div>
          </section>

          <section id="contact" className="-mt-16 sm:-mt-24 w-full flex justify-center">
            <div className="w-full max-w-7xl">
              <ContactPage />
            </div>
          </section>
        </div>
      )}
    </main>
  );
}




