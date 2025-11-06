import { useMemo, useRef, useState, useEffect } from "react";

const PROJECTS = [
  {
    title: "E‑commerce Dashboard",
    blurb: "Analytics, orders, and inventory with complex charts and filters.",
    tags: ["React", "Tailwind", "Chart.js"],
  },
  {
    title: "Portfolio Engine",
    blurb: "CMS‑driven portfolio with dynamic routes and image optimization.",
    tags: ["Next.js", "Images", "SEO"],
  },
  {
    title: "Realtime Chat",
    blurb: "WebSocket‑powered chat with presence and typing indicators.",
    tags: ["Node", "WS", "Redis"],
  },
  {
    title: "Design System",
    blurb: "Tokenized components with themes and motion primitives.",
    tags: ["Design Tokens", "A11y", "Motion"],
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

function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [hovered, setHovered] = useState(false);
  return (
    <article
      ref={ref}
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer select-none ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${
        hovered
          ? "border-emerald-400/60 shadow-[0_12px_40px_-12px_rgba(16,185,129,0.35)]"
          : "border-white/10 hover:border-white/20"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center bg-emerald-500/15 text-emerald-400 border border-emerald-400/30">
            <span className="display-font">{i + 1}</span>
          </div>
          <h3 className="display-font text-lg sm:text-xl text-ink">
            {p.title}
          </h3>
        </div>
        <p className="mt-3 text-sm text-ink/80 leading-relaxed">{p.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-ink border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          {/* <a
            href="#"
            className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium text-gray-900 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            View case study
          </a> */}
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs text-ink/80 hover:text-emerald-400 hover:bg-white/5 rounded-full px-2 py-1 transition-colors duration-150 transform hover:-translate-y-1"
          >
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
            Live demo
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs text-ink/80 hover:text-emerald-400 hover:bg-white/5 rounded-full px-2 py-1 transition-colors duration-150 transform hover:-translate-y-1"
            aria-label="GitHub repository"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.92.43.372.814 1.102.814 2.222 0 1.606-.015 2.896-.015 3.293 0 .32.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* Sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: hovered ? "shine 1.2s ease-out" : "none",
        }}
      />
    </article>
  );
}

export default function WorkPage() {
  const projects = useMemo(() => PROJECTS, []);
  return (
    <main className="pb-24">
      <section className="relative isolate pt-28 sm:pt-32" id="work">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Work
            </p>
            <h1 className="display-font text-3xl sm:text-4xl lg:text-5xl text-ink">
              Selected Projects
            </h1>
            <p className="mt-4 text-sm sm:text-base text-ink/80 max-w-xl">
              Interactive and performance‑minded builds that ship.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {projects.map((p, i) => (
              <div key={p.title} className="min-w-0">
                <ProjectCard p={p} i={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
