import { useEffect, useMemo } from "react";
import AnimatedCoderAvatar from "./AnimatedCoderAvatar";

const socials = [
  { href: "#", label: "Download CV", icon: "⬇" },
  { href: "#", label: "GitHub", icon: "GH" },
  { href: "#", label: "LinkedIn", icon: "in" },
  { href: "#", label: "Twitter/X", icon: "X" },
  { href: "#", label: "Email", icon: "@" },
];

export default function Hero() {
  // Sparkling ring positions for the photo decoration
  const dashes = useMemo(() => Array.from({ length: 16 }, (_, i) => i), []);

  // Smooth scroll behavior for hash links (progressive enhance)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <section id="home" className="relative isolate pt-28 sm:pt-32">
      {/* Gradient background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-40 -right-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - text */}
          <div>
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Software Developer
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-gray-200">Hello I’m</span>
              <br />
              <span className="text-emerald-400">Dawit Solomon</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm sm:text-base text-gray-300/90">
              I excel at crafting elegant digital experiences and I am
              proficient in various programming languages and technologies.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-gray-900 font-medium hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
              >
                <span className="transition-transform group-hover:-translate-y-0.5">
                  ⬇
                </span>
                Download CV
              </a>

              {socials.slice(1).map((s) => (
                <a
                  key={s.label}
                  aria-label={s.label}
                  href={s.href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/5 transition"
                >
                  {s.icon}
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

            {/* animated avatar replaces image */}
            <div className="absolute inset-6 sm:inset-8 rounded-full overflow-hidden ring-1 ring-white/10">
              <AnimatedCoderAvatar />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: "1+", label1: "Years of", label2: "experience" },
            { value: "5+", label1: "Projects", label2: "completed" },
            { value: "15+", label1: "Technologies", label2: "mastered" },
            { value: "100+", label1: "Code", label2: "commits" },
          ].map((s) => (
            <div
              key={s.label1}
              className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] sm:text-xs tracking-wide text-gray-300">
                <span className="block">{s.label1}</span>
                <span className="block">{s.label2}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
