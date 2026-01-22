import { useEffect, useMemo, useRef, useState } from "react";
import FadeIn from "../components/common/FadeIn";
import { api } from "../api";
import { useSettings } from "../context/SettingsContext";

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
      <span className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
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
              {item.bullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </button>
    </li>
  );
}

export default function ResumePage() {
  const { settings } = useSettings();
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const groups = useMemo(
    () => ["All", ...Array.from(new Set(skills.map((s) => s.group)))],
    [skills]
  );
  const [filter, setFilter] = useState("All");
  const visibleSkills = useMemo(
    () => skills.filter((s) => (filter === "All" ? true : s.group === filter)),
    [skills, filter]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [experiencesData, skillsData] = await Promise.all([
          api.getExperience(),
          api.getSkills()
        ]);

        const formattedExperiences = experiencesData.map(exp => {
          const startDate = new Date(exp.startDate);
          const endDate = exp.endDate ? new Date(exp.endDate) : null;
          const formatDate = (date) => date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
          const period = exp.current
            ? `${formatDate(startDate)} — Present`
            : `${formatDate(startDate)} — ${endDate ? formatDate(endDate) : 'Present'}`;

          return {
            role: exp.position,
            company: exp.company,
            period,
            summary: exp.description,
            bullets: exp.responsibilities || []
          };
        });

        const formattedSkills = skillsData.map(skill => ({
          name: skill.name,
          group: skill.category,
          proficiency: skill.proficiency
        }));

        setExperiences(formattedExperiences);
        setSkills(formattedSkills);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !settings) return null;

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

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FadeIn className="lg:col-span-2" variant="fade-up" delay={200}>
            <div>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-ink/70 mb-3">
                Experience
              </h2>
              <ol className="space-y-4">
                {experiences.map((item, i) => (
                  <ExperienceItem
                    key={i}
                    item={item}
                    i={i}
                    expandedIndex={expandedIndex}
                    setExpandedIndex={setExpandedIndex}
                  />
                ))}
              </ol>
            </div>
          </FadeIn>

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
                      <div
                        className="h-1 rounded bg-emerald-400/70"
                        style={{ width: `${s.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="mt-8 text-sm font-semibold tracking-widest uppercase text-ink/70 mb-3">
                Education
              </h2>
              <div className="space-y-3">
                {(settings.education || []).map((edu, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-ink font-medium">{edu.degree}</div>
                        <div className="text-ink/70 text-sm">{edu.school}</div>
                      </div>
                      <div className="text-ink/60 text-sm whitespace-nowrap">{edu.period}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={settings.site.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-ink/5 px-5 py-2.5 text-sm font-bold text-ink backdrop-blur-md hover:bg-ink/10 transition-all shadow-sm"
                title="Download Resume"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 001.06-1.06l-1.047-1.048A3.375 3.375 0 1011.625 18z" clipRule="evenodd" />
                  <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                </svg>
                Download Resume
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}