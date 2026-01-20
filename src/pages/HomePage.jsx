import Hero from "../components/home/Hero";
import Services from "../components/services/Services";
import WorkPage from "./WorkPage";
import ResumePage from "./ResumePage";
import ContactPage from "./ContactPage";
import FadeIn from "../components/common/FadeIn";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full">
      {/* Home Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        <Hero />
      </section>


      {/* Services Section */}
      <section id="services" className="min-h-screen flex flex-col justify-center py-20">
        <FadeIn variant="scale-in">
          <Services />
        </FadeIn>
      </section>

      {/* Work Section */}
      <section id="work" className="min-h-screen flex flex-col justify-center py-20">
        <FadeIn variant="blur">
          <WorkPage />
        </FadeIn>
      </section>

      {/* Resume Section */}
      <section id="resume" className="min-h-screen flex flex-col justify-center py-20">
        <FadeIn variant="fade-up">
          <ResumePage />
        </FadeIn>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex flex-col justify-center py-20">
        <FadeIn variant="scale-in">
          <ContactPage />
        </FadeIn>
      </section>
    </main>
  );
}




