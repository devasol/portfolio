import Navbar from "./components/home/Navbar";
import Hero from "./components/home/Hero";
import NoiseBackground from "./components/home/NoiseBackground";
import "./index.css";

export default function App() {
  return (
    <div className="min-h-dvh bg-[#0b0f14] text-gray-200 antialiased">
      <NoiseBackground />
      <Navbar />
      <main className="pb-24">
        <Hero />
      </main>
    </div>
  );
}
