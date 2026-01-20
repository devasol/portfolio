import { useEffect, useMemo, useRef, useState } from "react";
import FadeIn from "../components/common/FadeIn";


const EXPERIENCE = [
  {
    role: "Frontend Engineer",
    company: "Acme Corp",
    period: "2023 — Present",
    summary:
      "Building interactive UIs and design systems. Led performance initiatives and accessibility improvements.",
    bullets: [
      "Shipped reusable component library and tokens",
      "Improved Lighthouse scores to 95+ across key pages",
      "Partnered with design to deliver polished micro-interactions",
    ],
  },
  {
    role: "Full‑stack Developer",
    company: "Studio Next",
    period: "2022 — 2023",
    summary:
      "Delivered end‑to‑end features, from API to UI. Built robust workflows and testing pipelines.",
    bullets: [
      "Designed scalable REST/GraphQL endpoints",
      "Introduced CI with linting and E2E tests",
      "Mentored juniors on modern React patterns",
    ],
  },
];

const SKILLS = [
  { name: "React", group: "Frontend" },
  { name: "TypeScript", group: "Frontend" },
  { name: "Tailwind", group: "Frontend" },
  { name: "Node.js", group: "Backend" },
  { name: "GraphQL", group: "Backend" },
  { name: "REST", group: "Backend" },
  { name: "Vite", group: "Tooling" },
  { name: "ESLint", group: "Tooling" },
  { name: "Playwright", group: "Testing" },
  { name: "Vitest", group: "Testing" },
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

function ExperienceItem({ item, i, expandedIndex, setExpandedIndex }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const expanded = expandedIndex === i;
  return (
    <li
      ref={ref}
      className={`relative pl-6 sm:pl-8 transition-all ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Timeline line */}
      <span className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
      {/* Dot */}
      <span className="absolute left-0 top-2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-emerald-400/70 ring-2 ring-emerald-400/30" />

      <button
        type="button"
        onClick={() => setExpandedIndex(expanded ? null : i)}
        className={`w-full text-left rounded-xl border px-4 py-3 sm:px-5 sm:py-4 transition-colors ${
          expanded
            ? "border-emerald-400/60"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="display-font text-lg sm:text-xl text-ink">
            {item.role}
          </h3>
          <span className="text-ink/70">@ {item.company}</span>
          <span className="ml-auto text-[11px] sm:text-xs text-ink/60">
            {item.period}
          </span>
        </div>
        <p className="mt-2 text-sm text-ink/80">{item.summary}</p>
        <div
          className="grid transition-[grid-template-rows] duration-400 ease-out mt-2"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="mt-2 list-disc pl-5 text-sm text-ink/80 space-y-1">
              {item.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </button>
    </li>
  );
}


export default function ResumePage() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const groups = useMemo(
    () => ["All", ...Array.from(new Set(SKILLS.map((s) => s.group)))],
    []
  );
  const [filter, setFilter] = useState("All");
  const visibleSkills = useMemo(
    () => SKILLS.filter((s) => (filter === "All" ? true : s.group === filter)),
    [filter]
  );

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn variant="blur">
          <div className="max-w-2xl">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Resume
            </p>
            <h1 className="display-font text-3xl sm:text-4xl lg:text-5xl text-ink">
              Experience & Skills
            </h1>
            <p className="mt-4 text-sm sm:text-base text-ink/80 max-w-xl">
              A quick overview of my background, the tools I'm best with, and
              what I'm focusing on.
            </p>
          </div>
        </FadeIn>

        {/* Experience timeline */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FadeIn className="lg:col-span-2" variant="fade-up" delay={200}>
            <div>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-ink/70 mb-3">
                Experience
              </h2>
              <ol className="space-y-4">
                {EXPERIENCE.map((item, i) => (
                  <ExperienceItem
                    key={item.role}
                    item={item}
                    i={i}
                    expandedIndex={expandedIndex}
                    setExpandedIndex={setExpandedIndex}
                  />
                ))}
              </ol>
            </div>
          </FadeIn>

          {/* Skills */}
          <FadeIn variant="fade-up" delay={400}>
            <div>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-ink/70 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {groups.map((g) => (
                  <button
                    key={g}
                    onClick={() => setFilter(g)}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      filter === g
                        ? "border-emerald-400/60 text-ink"
                        : "border-white/10 text-ink/80 hover:border-white/20"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {visibleSkills.map((s) => (
                  <div
                    key={s.name}
                    className="px-3 py-2 rounded-lg border border-white/10 text-sm text-ink/80 hover:border-white/20 transition-colors"
                  >
                    {s.name}
                    <div className="mt-1 h-1 rounded bg-white/5">
                      <div className="h-1 rounded bg-emerald-400/70 w-[70%]" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <h2 className="mt-8 text-sm font-semibold tracking-widest uppercase text-ink/70 mb-3">
                Education
              </h2>
              <div className="rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-ink font-medium">
                      B.Sc. in Computer Science
                    </div>
                    <div className="text-ink/70 text-sm">
                      University of Technology
                    </div>
                  </div>
                  <div className="text-ink/60 text-sm">2018 — 2022</div>
                </div>
              </div>

              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-gray-900 text-sm font-medium hover:bg-emerald-300"
              >
                Download CV
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}