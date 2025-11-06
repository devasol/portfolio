import Hero from "../components/home/Hero";
import Services from "../components/services/Services";
import ResumePage from "./ResumePage";
import WorkPage from "./WorkPage";
import ContactPage from "./ContactPage";

export default function SinglePage() {
  return (
    <>
      <Hero />
      <Services />
      <ResumePage />
      <WorkPage />
      <ContactPage />
    </>
  );
}