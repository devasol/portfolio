import { useEffect } from "react";
import Hero from "../components/home/Hero";
import About from "../components/about/About";
import Services from "../components/services/Services";
import WorkPage from "./WorkPage";
import ResumePage from "./ResumePage";
import ContactPage from "./ContactPage";
import FadeIn from "../components/common/FadeIn";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      {/* Home Section - Always visible */}
      <section id="home" className="min-h-screen pt-24 flex items-center justify-center relative z-10">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 w-full flex justify-center relative z-20">
        <div className="w-full max-w-7xl">
          <FadeIn variant="fade-up">
            <About />
          </FadeIn>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-20 w-full flex justify-center relative z-20">
        <div className="w-full max-w-7xl">
          <FadeIn variant="scale-in">
            <Services />
          </FadeIn>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-12 sm:py-20 w-full flex justify-center relative z-20">
        <div className="w-full max-w-7xl">
          <FadeIn variant="blur">
            <WorkPage />
          </FadeIn>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-12 sm:py-20 w-full flex justify-center relative z-20">
        <div className="w-full max-w-7xl">
          <FadeIn variant="fade-up">
            <ResumePage />
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 w-full flex justify-center relative z-20">
        <div className="w-full max-w-7xl">
          <FadeIn variant="scale-in">
            <ContactPage />
          </FadeIn>
        </div>
      </section>
    </main>
  );
}




