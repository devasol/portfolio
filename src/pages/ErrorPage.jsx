import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoiseBackground from '../components/home/NoiseBackground';
import BackgroundGrid from '../components/common/BackgroundGrid';
import FadeIn from '../components/common/FadeIn';

const ErrorPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Floating particles
  const particles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <NoiseBackground />
      <BackgroundGrid />
      
      {/* Ambient Glows - Subtle and Neutral */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ink/5 rounded-full blur-[150px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-ink/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Content Container - Perfectly Centered */}
      <div className="relative z-10 px-6 text-center flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full">
          <FadeIn variant="scale-in">
            <div className="relative inline-block mb-8">
              {/* The 404 Text - Massive and Bold */}
              <h1 className="display-font text-[100px] sm:text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-ink select-none">
                404
              </h1>
              
              {/* Subtle background effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-ink/10 to-transparent blur-3xl -z-10 scale-110 animate-blob-morph" />
              
              {/* Decorative corner brackets */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-ink/20 rounded-tl-2xl" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-ink/20 rounded-br-2xl" />
            </div>
          </FadeIn>

          <FadeIn variant="fade-up" delay={200}>
            <div className="space-y-4 mb-10">
              <h2 className="display-font text-2xl sm:text-3xl md:text-4xl text-ink font-bold">
                Page Not Found
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Error</span>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
              </div>
              <p className="text-ink/70 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                Oops! The page you're looking for seems to have wandered off into the digital void. 
                Let's get you back on track.
              </p>
            </div>
          </FadeIn>

          <FadeIn variant="fade-up" delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => navigate('/')}
                className="btn-premium-interactive group relative px-8 py-4 rounded-full overflow-hidden bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                  Return Home
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>

              <button
                onClick={() => window.history.back()}
                className="group px-8 py-4 rounded-full border border-ink/10 bg-ink/5 text-ink font-bold backdrop-blur-md transition-all duration-300 hover:border-ink/20 hover:bg-ink/10 active:scale-95 shadow-sm flex items-center gap-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                >
                  <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                </svg>
                Go Back
              </button>
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn variant="fade-up" delay={600}>
            <div className="pt-8 border-t border-ink/5">
              <p className="text-ink/50 text-sm mb-4 uppercase tracking-wider font-bold">Quick Links</p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <button onClick={() => navigate('/#about')} className="text-ink/60 hover:text-emerald-400 transition-colors">About</button>
                <span className="text-ink/20">•</span>
                <button onClick={() => navigate('/#services')} className="text-ink/60 hover:text-emerald-400 transition-colors">Services</button>
                <span className="text-ink/20">•</span>
                <button onClick={() => navigate('/#work')} className="text-ink/60 hover:text-emerald-400 transition-colors">Work</button>
                <span className="text-ink/20">•</span>
                <button onClick={() => navigate('/#contact')} className="text-ink/60 hover:text-emerald-400 transition-colors">Contact</button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Decorative footer text */}
      <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none z-20">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-ink/5 backdrop-blur-md border border-ink/5">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="display-font text-xs uppercase tracking-[0.2em] text-ink/40 font-bold">
            Error 404 • Not Found
          </span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;