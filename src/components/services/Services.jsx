import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    title: "Web Applications",
    blurb:
      "High-performance React/Next.js apps with clean architecture and delightful UX.",
    details:
      "From idea to production: component systems, state management, routing, and CI-ready builds.",
    tags: ["React", "Next.js", "TypeScript", "Vite"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 5h18M3 9h18M7 9v10m10-10v10M3 19h18"
        />
      </svg>
    ),
  },
  {
    title: "UI/UX & Design Systems",
    blurb:
      "Polished interfaces with accessibility, micro‑interactions, and motion that feels alive.",
    details:
      "Design tokens, responsive grids, and interactive components that scale across your product.",
    tags: ["Tailwind", "A11y", "Motion", "Design Tokens"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 3l3.09 6.26L22 10.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 15.14l-5-4.87 6.91-1.01L12 3z"
        />
      </svg>
    ),
  },
  {
    title: "APIs & Integrations",
    blurb:
      "Robust REST/GraphQL services, 3rd‑party integrations, and automation that saves time.",
    details:
      "Well-documented endpoints, error handling, and monitoring to keep things reliable.",
    tags: ["Node", "GraphQL", "REST", "Automations"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4 7h16M4 12h10M4 17h7"
        />
      </svg>
    ),
  },
  {
    title: "Performance & SEO",
    blurb:
      "Lighthouse‑green performance with image, bundle, and runtime optimizations.",
    details:
      "Measure what matters, then tune: code‑splitting, caching, and Core Web Vitals.",
    tags: ["Lighthouse", "CWV", "Caching", "Images"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13 2L3 14h7v8l11-14h-8z"
        />
      </svg>
    ),
  },
  {
    title: "E2E Quality",
    blurb: "Tested flows with CI, linting, and visual regression safeguards.",
    details:
      "Ship with confidence using unit, integration, and E2E tests hooked into CI.",
    tags: ["CI", "Playwright", "Vitest", "ESLint"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Consulting",
    blurb:
      "Roadmaps, audits, and coaching to accelerate your engineering outcomes.",
    details:
      "From quick wins to long‑term strategy: I meet you where you are and level you up.",
    tags: ["Audits", "Roadmaps", "Coaching"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8 7V3m8 4V3M5 11h14M5 19h14M7 11v8m10-8v8"
        />
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

function TiltCard({ item, index, expandedIndex, setExpandedIndex }) {
  const cardRef = useRef(null);
  const detailRef = useRef(null);
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
                  href="/contact"
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

  // Static background to avoid scroll/hover jitter

  const [expandedIndex, setExpandedIndex] = useState(null);

  const cards = useMemo(() => SERVICES, []);

  return (
    <section
      id="services"
      className="relative isolate overflow-x-hidden pt-24 sm:pt-28"
      ref={containerRef}
    >
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute bottom-0 -right-16 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        {/* Services grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((item, i) => (
            <TiltCard
              key={item.title}
              item={item}
              index={i}
              expandedIndex={expandedIndex}
              setExpandedIndex={setExpandedIndex}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-3">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-900 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            Let's build something great
          </a>
          <Link
            to="/work"
            className="text-sm text-ink/80 hover:text-ink transition-colors"
          >
            See my work
          </Link>
        </div>
      </div>

      {/* Subtle moving grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px, 28px 28px",
          color: "var(--color-ink)",
          transform: "translate(var(--parx,0), var(--pary,0))",
          transition: "transform 120ms ease-out",
        }}
      />
    </section>
  );
}