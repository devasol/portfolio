import { useMemo, useRef, useState, useEffect } from "react";
import FadeIn from "../components/common/FadeIn";

// Image Imports
const pinquestImg = "/Project_Images/PinQuest.png";
const dlmsImg = "/Project_Images/DLMS.png";
const furniImg = "/Project_Images/Furni.png";
const neeonImg = "/Project_Images/Neeon.png";
const ethioEcommerceImg = "/Project_Images/E-Commerce.png";

const PROJECTS = [
  {
    title: "PinQuest",
    image: pinquestImg,
    blurb: "A free, high-performance social mapping platform for explorers. Allows users to discover hidden gems, share local landmarks, and connect in real-time on a beautifully designed interactive map.",
    tags: ["React", "Tailwind", "MongoDB", "Express", "Socket.io"],
    demoUrl: "https://pinquest-app.onrender.com/",
    githubUrl: "https://github.com/devasol/PinQuest"
  },
  {
    title: "DLMS - Driving License Management System",
    image: dlmsImg,
    blurb: "A comprehensive digital platform for managing driving license applications, renewals, examinations, and verifications with admin dashboards and traffic police integration.",
    tags: ["React", "Material-UI", "Node.js", "MongoDB", "JWT"],
    demoUrl: "https://get-dlms.onrender.com/",
    githubUrl: "https://github.com/devasol/DLMS--Driving-license-management-system"
  },
  {
    title: "Furni",
    image: furniImg,
    blurb: "Modern Furniture E-commerce Platform that transforms living spaces with premium quality furniture, sleek design, and an exceptional shopping experience.",
    tags: ["React", "Vite", "Tailwind", "GSAP", "Framer Motion"],
    demoUrl: "https://get-furni.onrender.com/",
    githubUrl: "https://github.com/devasol/Furni"
  },
  {
    title: "NEEON",
    image: neeonImg,
    blurb: "A modern, full-stack blog platform with user-facing and admin interfaces, featuring content management, analytics, and responsive design.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    demoUrl: "https://neeon-1.onrender.com/",
    githubUrl: "https://github.com/devasol/NEEON"
  },
  {
    title: "Ethio E-Commerce",
    image: ethioEcommerceImg,
    blurb: "A modern full-stack e-commerce platform with TeleBirr payment integration, admin dashboard, and responsive mobile-first interface tailored for Ethiopian market.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "TeleBirr"],
    demoUrl: "https://e-shop-shop.onrender.com/",
    githubUrl: "https://github.com/devasol/E-Commerce__C-2-C"
  },
];

function useInView(ref, options = { threshold: 0.12 }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setInView(true));
    }, options);
    io.observe(node);
    return () => io.disconnect();
  }, [ref, options]);
  return inView;
}

function ProjectCard({ p, i, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      ref={ref}
      onClick={() => onOpen(p)}
      className={`group relative rounded-3xl border overflow-hidden transition-all duration-500 cursor-pointer select-none bg-surface/40 backdrop-blur-xl ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${
        hovered
          ? "border-emerald-400/40 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.25)] -translate-y-2"
          : "border-white/5 hover:border-white/10"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* Skeleton/Placeholder background */}
        <div className="absolute inset-0 bg-emerald-400/5 animate-pulse" />
        
        <img
          src={p.image}
          alt={p.title}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out z-10 relative ${
            hovered ? "scale-110" : "scale-100"
          }`}
        />
        
        {/* Glass Overlay on Hover */}
        <div className={`absolute inset-0 bg-emerald-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center`}>
           <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
             View Details
           </div>
        </div>

        {/* Floating Tag */}
        <div className="absolute top-4 left-4 z-30">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 backdrop-blur-md text-emerald-400 border border-emerald-400/30 flex items-center justify-center display-font text-xs">
            {i + 1}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="display-font text-xl text-ink group-hover:text-emerald-400 transition-colors duration-300">
          {p.title}
        </h3>
        
        <p className="mt-3 text-sm text-ink/70 leading-relaxed line-clamp-3">
          {p.blurb}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10px] px-2.5 py-1 rounded-lg bg-emerald-400/5 text-emerald-400/90 border border-emerald-400/10"
            >
              {t}
            </span>
          ))}
          {p.tags.length > 4 && (
            <span className="text-[10px] px-2 py-1 text-ink/40">+{p.tags.length - 4} more</span>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-1">
             <a
              href={p.demoUrl}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 text-ink/70 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300"
              title="Live Demo"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <a
              href={p.githubUrl}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 text-ink/70 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300"
              title="Source Code"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.92.43.372.814 1.102.814 2.222 0 1.606-.015 2.896-.015 3.293 0 .32.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onOpen(p); }}
            className="flex items-center gap-1 order-last group/btn text-emerald-400 font-bold text-xs uppercase tracking-widest transition-opacity duration-300"
          >
            Details
            <svg viewBox="0 0 24 24" className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

import { createPortal } from "react-dom";

function ProjectModal({ p, onClose }) {
  useEffect(() => {
    if (!p) return;

    // Premium scroll lock: Prevent background scroll on both body and html
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;

    const originalBodyOverflow = bodyStyle.overflow;
    const originalHtmlOverflow = htmlStyle.overflow;
    const originalBodyPadding = bodyStyle.paddingRight;

    bodyStyle.overflow = "hidden";
    htmlStyle.overflow = "hidden";
    bodyStyle.paddingRight = `${scrollBarWidth}px`;
    document.body.classList.add("modal-open");

    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);

    return () => {
      bodyStyle.overflow = originalBodyOverflow;
      htmlStyle.overflow = originalHtmlOverflow;
      bodyStyle.paddingRight = originalBodyPadding;
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleEsc);
    };
  }, [p, onClose]);

  if (!p) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-12 overflow-hidden pointer-events-auto">
      {/* Clear/Sharp Overlay Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xl transition-all animate-in fade-in duration-700"
        onClick={onClose}
      />
      
      {/* Premium Gallery Container */}
      <div className="relative w-full max-w-7xl max-h-full overflow-hidden rounded-[40px] bg-surface/95 backdrop-blur-3xl border border-ink/10 shadow-[0_40px_100px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row animate-modal-entry shadow-emerald-400/5">
        
        {/* Superior Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 z-[1010] flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-ink/5 border border-ink/10 backdrop-blur-2xl text-ink hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-all hover:rotate-90 active:scale-90 group shadow-xl"
          aria-label="Exit view"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Cinematic Preview Section (Left) */}
        <div className="lg:w-[65%] h-64 sm:h-72 lg:h-auto relative bg-ink/5 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-ink/5">
           {/* Abstract Light Elements */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#10b98115,transparent_50%)]" />
          
          <img 
            src={p.image} 
            alt={p.title} 
            className="w-full h-full object-cover lg:object-contain transform scale-100 lg:scale-[0.85] hover:scale-[0.9] transition-transform duration-1000 p-4 lg:p-0 relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Project Intelligence Sidebar (Right) */}
        <div className="lg:w-[40%] flex-1 min-h-0 p-8 lg:p-16 overflow-y-auto bg-surface/30 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] w-12 bg-emerald-400/50" />
              <span className="text-emerald-400 text-[10px] font-black tracking-[0.5em] uppercase opacity-80">Intelligence</span>
            </div>
            
            <h2 className="display-font text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.1] mb-8 tracking-tight">
              {p.title.split(' - ')[0]}
            </h2>

            <div className="space-y-12">
              <article>
                <div className="flex justify-between items-baseline mb-4">
                   <h4 className="text-[10px] font-black text-ink/40 uppercase tracking-[0.2em]">01 / Abstract</h4>
                </div>
                <p className="text-ink/70 text-base md:text-lg leading-relaxed font-medium">
                  {p.blurb}
                </p>
              </article>

              <article>
                <h4 className="text-[10px] font-black text-ink/40 uppercase tracking-[0.2em] mb-6">02 / Architecture</h4>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="px-4 py-2 rounded-xl bg-ink/5 border border-ink/10 text-[11px] font-bold text-emerald-500 tracking-wide hover:bg-emerald-400/10 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>

          {/* Action Hub */}
          <div className="mt-16 sm:mt-24 flex flex-col gap-4">
            <a 
              href={p.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-8 py-6 rounded-[24px] bg-emerald-400 text-black font-black text-xs tracking-[0.2em] uppercase transition-all hover:scale-[1.02] hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.3)] active:scale-95"
            >
              <span>Initialize Live Preview</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <a 
              href={p.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-[24px] bg-ink/5 border border-ink/10 text-ink/60 font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-ink/10 hover:text-ink transition-all"
            >
              <span>Access Source Code</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-50" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.92.43.372.814 1.102.814 2.222 0 1.606-.015 2.896-.015 3.293 0 .32.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}




export default function WorkPage() {
  const projects = useMemo(() => PROJECTS, []);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn variant="blur">
          <div className="max-w-2xl">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3 text-center sm:text-left">
              Work
            </p>
            <h1 className="display-font text-3xl sm:text-4xl lg:text-5xl text-ink text-center sm:text-left">
              Selected Projects
            </h1>
            <p className="mt-4 text-sm sm:text-base text-ink/80 max-w-xl text-center sm:text-left mx-auto sm:mx-0">
              High-performance builds with clean architecture and delightful UI/UX.
            </p>
          </div>
        </FadeIn>

        <FadeIn stagger={true} variant="fade-up" delay={200}>
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((p, i) => (
              <div key={p.title} className="min-w-0">
                <ProjectCard p={p} i={i} onOpen={setSelectedProject} />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <ProjectModal 
        p={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}



