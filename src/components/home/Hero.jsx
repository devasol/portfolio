import { useEffect, useMemo, useRef } from "react";
import FadeIn from "../common/FadeIn";
import profileImage from "../../assets/profile-image/profile-image.png";

const socials = [
  { href: "#", label: "Download CV" },
  { href: "https://github.com/devasol", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/dawit-solomon-0450602a0/",
    label: "LinkedIn",
  },
  // { href: "#", label: "Twitter/X" },
  { href: "mailto:dawit8908@gmail.com", label: "Email" },
];

export default function Hero() {
  // Sparkling ring positions for the photo decoration
  const dashes = useMemo(() => Array.from({ length: 16 }, (_, i) => i), []);
  const containerRef = useRef(null);

  // Smooth scroll behavior for hash links (progressive enhance)
  // Smooth scroll behavior for hash links (progressive enhance)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative isolate overflow-hidden pt-28 sm:pt-32 pb-16"
    >
      {/* Soft gradient blobs (static for stability) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-40 -right-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-center">
          {/* Left - text */}
          <div className="min-w-0">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Web Developer
            </p>
            <h1 className="display-font text-4xl sm:text-5xl lg:text-6xl leading-tight">
              <span className="text-ink">Hello I’m</span>
              <br />
              <span className="text-emerald-400">Dawit Solomon</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm sm:text-base text-ink/80">
              I excel at crafting elegant digital experiences and I am
              proficient in various programming languages and technologies.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                  href="#contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-gray-900 font-medium hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 transition transform duration-150 hover:-translate-y-1"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 transition-transform group-hover:-translate-y-0.5"
                >
                  <path d="M12 16l4-5h-3V4h-2v7H8l4 5z" />
                </svg>
                Download CV
              </a>

                {socials.slice(1).map((s) => (
                <a
                  key={s.label}
                  aria-label={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] text-ink/80 hover:text-ink hover:border-[color-mix(in_oklab,var(--color-ink),transparent_70%)] hover:bg-[color-mix(in_oklab,var(--color-surface),transparent_80%)] transition transform duration-150 hover:-translate-y-1 hover:shadow-sm"
                >
                  {s.label === "GitHub" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M12 .5a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.57 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.98 0-1.32.47-2.4 1.24-3.25-.12-.31-.54-1.57.12-3.27 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 016 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.7.24 2.96.12 3.27.77.85 1.24 1.93 1.24 3.25 0 4.65-2.81 5.66-5.49 5.97.43.37.81 1.1.81 2.22 0 1.61-.02 2.9-.02 3.3 0 .31.21.68.83.57A12 12 0 0012 .5z" />
                    </svg>
                  )}
                  {s.label === "LinkedIn" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 8.98h3.96V21H3V8.98zM9.5 8.98H13v1.64h.05c.48-.91 1.66-1.86 3.42-1.86 3.66 0 4.34 2.41 4.34 5.54V21h-3.96v-4.9c0-1.17-.02-2.67-1.63-2.67-1.64 0-1.89 1.28-1.89 2.6V21H9.5V8.98z" />
                    </svg>
                  )}
                  {s.label === "Twitter/X" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M17.53 3H20l-7.09 8.11L21.5 21h-5.9l-4.61-5.55L5.7 21H3l7.67-8.78L2.5 3h6.02l4.17 5 4.84-5z" />
                    </svg>
                  )}

                  {s.label === "Email" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right - photo */}
          <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 lg:w-[26rem] lg:h-[26rem] hero-float">
            {/* outer dashed ring */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40" />
            {/* animated dash segments */}
            {dashes.map((i) => (
              <span
                key={i}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400/70 rotate-[var(--r)]"
                style={{
                  clipPath: "polygon(50% 0, 100% 0, 100% 20%, 50% 20%)",
                  transform: `rotate(${(360 / dashes.length) * i}deg)`,
                }}
              />
            ))}

            {/* profile image */}
            <div className="absolute inset-6 sm:inset-8 rounded-full overflow-hidden ring-1 ring-white/10">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover hero-photo"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 hero-ring" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[
            { value: "1+", label1: "Years of", label2: "experience" },
            { value: "5+", label1: "Projects", label2: "completed" },
            { value: "15+", label1: "Technologies", label2: "mastered" },
            { value: "100+", label1: "Code", label2: "commits" },
          ].map((s) => (
            <div
              key={s.label1}
              className="rounded-2xl p-5 card flex items-center gap-3 sm:gap-4"
            >
              <div className="display-font text-3xl sm:text-4xl text-ink whitespace-nowrap">
                {s.value}
              </div>
              <div className="text-[11px] sm:text-xs tracking-wide text-ink/80">
                <span className="inline-block mr-1">{s.label1}</span>
                <span className="inline-block">{s.label2}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
