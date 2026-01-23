import React from 'react';
import { useSettings } from '../../context/SettingsContext';

const Footer = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  const { hero, socials } = settings || {};
  const name = hero?.name || "Dawit Solomon";
  const githubUrl = socials?.github || "https://github.com/devasol";
  const linkedinUrl = socials?.linkedin || "https://www.linkedin.com/in/dawit-solomon-0450602a0/";

  return (
    <footer className="w-full mt-12 border-t border-white/5 pt-10 pb-12 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-emerald-400/50" />
              <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-[0.2em]">Designed & Crafted</span>
            </div>
            
            <p className="text-ink/80 text-sm font-medium leading-relaxed max-w-sm">
              Built and designed with focus by{" "}
              <a 
                href={linkedinUrl} 
                className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 relative group inline-block"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </p>
            
            <div className="mt-4 flex flex-col items-center md:items-start gap-1">
              <p className="text-ink/40 text-[10px] sm:text-xs tracking-[0.1em] uppercase font-bold">
                © {currentYear} {name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-12 w-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-emerald-400/20 transition-all duration-300 shadow-xl hover:shadow-emerald-400/20"
              aria-label="GitHub Profile"
            >
              <svg 
                className="h-6 w-6 fill-emerald-400 group-hover:fill-emerald-300 transition-all duration-300 group-hover:scale-110" 
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            
            <a 
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-12 w-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-emerald-400/20 transition-all duration-300 shadow-xl hover:shadow-emerald-400/20"
              aria-label="LinkedIn Profile"
            >
              <svg 
                className="h-6 w-6 fill-emerald-400 group-hover:fill-emerald-300 transition-all duration-300 group-hover:scale-110" 
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

        </div>
      </div>
      
      {/* Decorative accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl h-px bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent" />
    </footer>
  );
};

export default Footer;
