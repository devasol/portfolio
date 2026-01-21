import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import FadeIn from "../common/FadeIn";


const SERVICES = [
  {
    title: "Full-Stack Web Development",
    blurb: "Building complete, scalable web applications from front to back.",
    details: "I deliver end-to-end solutions, seamlessly integrating robust backends with dynamic frontends using modern frameworks like React, Next.js, and Node.js.",
    tags: ["React", "Node.js", "Next.js", "Full-Stack"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Frontend Development",
    blurb: "Crafting beautiful, responsive, and interactive user interfaces.",
    details: "I specialize in creating pixel-perfect, accessible, and high-performance UIs that provide delightful user experiences across all devices.",
    tags: ["React", "Tailwind CSS", "JavaScript", "UI/UX"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Backend Development & APIs",
    blurb: "Architecting secure and efficient server-side logic and APIs.",
    details: "I design and build scalable RESTful and GraphQL APIs, ensuring meaningful data exchange, security, and high availability for your applications.",
    tags: ["Node.js", "Express", "GraphQL", "REST"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
  },
  {
    title: "Database Design & Management",
    blurb: "Organizing your data for speed, reliability, and scalability.",
    details: "I implement efficient database schemas and management strategies using SQL and NoSQL technologies like PostgreSQL, MySQL, and MongoDB.",
    tags: ["SQL", "NoSQL", "MongoDB", "PostgreSQL"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: "Authentication & Authorization",
    blurb: "Securing your applications with robust user management systems.",
    details: "I implement secure login flows, role-based access control, and protect sensitive data using industry standards like OAuth, JWT, and Auth0.",
    tags: ["OAuth", "JWT", "Security", "Auth0"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "Performance Optimization",
    blurb: "Speeding up your web apps for better engagement and SEO.",
    details: "I analyze and optimize code, assets, and delivery pipelines to achieve lightning-fast load times and smooth interactions.",
    tags: ["Web Vitals", "Optimization", "Speed", "SEO"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Maintenance & Feature Enhancements",
    blurb: "Keeping your digital products up-to-date and evolving.",
    details: "I provide ongoing support, bug fixes, and feature additions to ensure your application remains modern, secure, and competitive.",
    tags: ["Support", "Refactoring", "Updates", "CI/CD"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Responsive & Cross-Browser Design",
    blurb: "Ensuring your site looks perfect on every screen and browser.",
    details: "I utilize responsive design principles and testing strategies to guarantee a consistent and high-quality experience for all users, regardless of their device.",
    tags: ["Responsive", "Mobile-First", "CSS", "Testing"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

function useInView(ref, options = { threshold: 0.2 }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setInView(true);
      });
    }, options);
    io.observe(node);
    return () => io.disconnect();
  }, [ref, options]);
  return inView;
}

function TiltCard({ item, index, expandedIndex, setExpandedIndex, onScrollTo }) {
  const cardRef = useRef(null);
  const detailRef = useRef(null);
  const inView = useInView(cardRef);
  const [transform, setTransform] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)"
  );
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    let raf = null;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = (-py * 10).toFixed(2);
      const ry = (px * 12).toFixed(2);
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setTransform(
          `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${
            hovered ? 1.02 : 1
          })`
        );
      });
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hovered]);

  const expanded = expandedIndex === index;

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => setExpandedIndex(expanded ? null : index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          setExpandedIndex(expanded ? null : index);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer select-none
        ${
          expanded
            ? "border-emerald-400/60 shadow-[0_12px_40px_-12px_rgba(16,185,129,0.35)]"
            : "border-white/10 hover:border-white/20"
        }
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{
        transform,
        transition:
          "transform 180ms ease, box-shadow 300ms ease, border-color 300ms ease, opacity 600ms ease, translate 600ms ease",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--color-surface), transparent 10%), color-mix(in oklab, var(--color-surface), transparent 0%))",
      }}
    >
      {/* Shimmer overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: hovered ? "shine 1.2s ease-out" : "none",
        }}
      />

      {/* Card content */}
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center bg-emerald-500/15 text-emerald-400 border border-emerald-400/30">
            {item.icon}
          </div>
          <h3 className="display-font text-lg sm:text-xl text-ink">
            {item.title}
          </h3>
          <span className="ml-auto text-[10px] px-2 py-1 rounded-full border border-white/10 text-ink/80">
            {expanded ? "Open" : "Tap"}
          </span>
        </div>
        <p className="mt-3 text-sm text-ink/80 leading-relaxed">{item.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-ink border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Expandable details */}
        <div
          ref={detailRef}
          className="grid transition-[grid-template-rows] duration-500 ease-out mt-3"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
          aria-hidden={!expanded}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="pt-2 text-sm text-ink/80">
              {item.details}
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="#contact"
                  onClick={(e) => onScrollTo(e, 'contact')}
                  className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium text-gray-900 bg-emerald-400 hover:bg-emerald-300 transition-colors"
                >
                  Start a project
                </a>
                <button className="inline-flex items-center gap-1 text-xs text-ink/80 hover:text-ink transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow ring */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 ${
          hovered || expanded ? "opacity-100" : ""
        }`}
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(16,185,129,0.15), transparent 40%)",
          transition: "opacity 300ms ease",
        }}
      />
    </div>
  );
}

export default function Services() {
  const containerRef = useRef(null);
  const location = useLocation(); // Keep for safety if used elsewhere or remove if unused. It was used in tiltcard but we removed it. 
  // actually TiltCard no longer needs location. Services passes it? 
  // let's just keep containerRef as it is used in ref={containerRef}

  const [expandedIndex, setExpandedIndex] = useState(null);

  const cards = useMemo(() => SERVICES, []);

  // Helper for smooth scroll
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="w-full"
      ref={containerRef}
    >

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        <FadeIn variant="blur">
          <div className="max-w-2xl">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Services
            </p>
            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl text-ink">
              What I can do for you
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink/80 max-w-xl">
              Highly interactive, performance‑minded experiences with tasteful
              motion and a focus on outcomes.
            </p>
          </div>
        </FadeIn>

        {/* Services grid */}
        <FadeIn stagger={true} variant="fade-up" delay={200}>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {cards.map((item, i) => (
              <TiltCard
                key={item.title}
                item={item}
                index={i}
                expandedIndex={expandedIndex}
                setExpandedIndex={setExpandedIndex}
                isMobile={false} // No longer needed
                location={location}
                onScrollTo={handleScrollTo}
              />
            ))}
          </div>
        </FadeIn>


        <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-900 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            Let's build something great
          </a>

          <a
            href="#work"
            onClick={(e) => handleScrollTo(e, 'work')}
            className="text-sm text-ink/80 hover:text-ink transition-colors"
          >
            See my work
          </a>
        </div>
      </div>

    </div>
  );
}