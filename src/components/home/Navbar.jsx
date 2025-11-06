import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Resume", href: "/resume" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

function ThemeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-4 w-4 sm:h-5 sm:w-5"
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
  );
}

export default function Navbar() {
  const [elevated, setElevated] = useState(false);
  const location = useLocation();
  const activeHref = location.pathname || "/";

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
  // No intersection observer needed with routes; highlight via location

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

  const isDark = theme === "dark";
  // Desktop chips: subtle glass
  const desktopChipClasses = "bg-transparent text-ink/90 hover:text-ink";

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={headerStyle}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered dynamic island */}
        <div className="h-16 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center">
          <div className="justify-self-start">
            <Link
              to="/"
              className="display-font font-semibold text-2xl sm:text-3xl tracking-tight"
            >
              <span className="text-ink">Dawit</span>
              <span className="text-emerald-500">.</span>
            </Link>
          </div>

          <div className="justify-self-center mt-2">
            <div
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-[999px] flex items-center gap-2 sm:gap-3 max-w-full"
              style={islandStyle}
            >
              {/* Left: theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-white/10 hover:bg-white/5 shrink-0"
              >
                <ThemeIcon />
              </button>

              {/* Nav links always visible */}
              <nav className="flex items-center gap-2 text-sm">
                {NAV_ITEMS.map((item) => {
                  const active = activeHref === item.href;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`px-3 py-1.5 rounded-full relative overflow-hidden transition-colors ${desktopChipClasses} ${
                        active
                          ? "underline decoration-2 underline-offset-4"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Call to action */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 text-sm font-medium text-base-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Hire me</span>
              </Link>
            </div>
          </div>

          {/* Right: theme toggle */}
          <div className="justify-self-end flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 hover:bg-white/5"
              title="Toggle theme"
            >
              <ThemeIcon />
            </button>
          </div>

          {/* end of top bar */}
        </div>
      </div>
    </header>
  );
}
