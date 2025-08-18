import Navbar from "./components/home/Navbar";
import Hero from "./components/home/Hero";
import NoiseBackground from "./components/home/NoiseBackground";
import "./index.css";

export default function App() {
  return (
    <div className="min-h-dvh antialiased">
      <NoiseBackground />
      <Navbar />
      <main className="pb-24">
        <Hero />
      </main>
    </div>
  );
}
