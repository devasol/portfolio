import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Resume", href: "#resume" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && window.localStorage.getItem("theme")
      ? window.localStorage.getItem("theme")
      : "dark"
  );

  // Sync theme to html attribute
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // Add a subtle elevation on scroll
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const headerStyle = {
    background: "transparent",
  };
  const islandStyle = {
    background: "color-mix(in oklab, var(--color-surface), transparent 20%)",
    backdropFilter: "blur(10px)",
    border: "1px solid color-mix(in oklab, var(--color-ink), transparent 85%)",
    boxShadow: elevated ? "0 8px 24px rgba(0,0,0,0.08)" : "none",
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={headerStyle}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered dynamic island */}
        <div className="h-16 grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="justify-self-start">
            <a
              href="#home"
              className="display-font font-semibold text-2xl sm:text-3xl tracking-tight"
            >
              <span className="text-ink">Dawit</span>
              <span className="text-emerald-500">.</span>
            </a>
          </div>

          <div className="justify-self-center mt-3 sm:mt-4">
            <div
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-[999px] flex items-center gap-2 sm:gap-3"
              style={islandStyle}
            >
              {/* Left: theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/10 hover:bg-white/5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    className="theme-moon"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  />
                  <g className="theme-sun">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5L19 19M19 5l1.5-1.5M4.5 20.5L6 19" />
                  </g>
                </svg>
              </button>

              {/* Nav links centered inside island (md+) */}
              <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm text-ink/80">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="hover:text-ink transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Call to action */}
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 text-sm font-medium text-base-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 transition-colors whitespace-nowrap shrink-0"
              >
                Hire me
              </a>
            </div>
          </div>

          {/* Right: mobile toggles */}
          {/* Right: mobile toggles */}
          <div className="justify-self-end md:hidden flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-ink transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 hover:bg-white/5"
              title="Toggle theme"
            >
              {/* sun/moon icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  className="theme-moon"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
                <g className="theme-sun">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5L19 19M19 5l1.5-1.5M4.5 20.5L6 19" />
                </g>
              </svg>
            </button>

            <a
              href="#contact"
              className="ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-base-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 transition-colors"
            >
              Hire me
            </a>
          </div>

          {/* Mobile menu + theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:bg-white/5"
              title="Toggle theme"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  className="theme-moon"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
                <g className="theme-sun">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5L19 19M19 5l1.5-1.5M4.5 20.5L6 19" />
                </g>
              </svg>
            </button>

            <button
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:bg-white/5"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute left-0 top-1 block h-0.5 w-5 bg-white transition-transform ${
                    open ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-2.5 block h-0.5 w-5 bg-white transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-4 block h-0.5 w-5 bg-white transition-transform ${
                    open ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* end of top bar */}
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden grid transition-[grid-template-rows] duration-300 overflow-hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <nav className="px-2 pb-4 text-gray-300">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-900 bg-emerald-400 hover:bg-emerald-300"
              >
                Hire me
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
