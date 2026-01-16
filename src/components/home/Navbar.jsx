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

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={headerStyle}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered dynamic island */}
        <div className="h-16 grid grid-cols-[1fr_auto_1fr] items-center">
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
              className="px-4 py-2.5 rounded-[999px] flex items-center gap-3 max-w-full overflow-x-auto hide-scrollbar"
              style={islandStyle}
            >
              {/* Navigation with animated active indicator */}
              <div className="relative">
                <nav className="relative flex items-center justify-center gap-1 xs:gap-2">
                  {NAV_ITEMS.map((item) => {
                    const active = activeHref === item.href;
                    return (
                      <div key={item.label} className="relative group">
                        <Link
                          to={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`px-4 py-2 text-sm font-medium relative z-10 transition-colors duration-300 ${
                            active ? "text-emerald-400" : "text-ink/60 hover:text-ink"
                          }`}
                        >
                          {item.label}
                          
                          {active ? (
                            <div className="absolute -bottom-1 left-0 right-0 flex justify-center pointer-events-none">
                              <div className="relative">
                                {/* Simple, modern dash */}
                                <div className="h-[2px] w-6 bg-emerald-400 rounded-full animate-nav-underline" />
                                {/* Subtle soft glow */}
                                <div className="absolute inset-0 h-[2px] w-6 bg-emerald-400 blur-[4px] opacity-30 animate-nav-underline -z-10" />
                              </div>
                            </div>
                          ) : (
                            /* Minimal hover dot */
                            <div className="absolute -bottom-1 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                              <div className="h-1 w-1 bg-ink/30 rounded-full" />
                            </div>
                          )}
                        </Link>
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Vertical divider with gradient */}
              <div className="hidden xs:block h-7 w-px bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--color-ink),transparent_50%)] to-transparent"></div>

              {/* Enhanced call to action */}
              <Link
                to="/contact"
                className="hidden xs:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-base-900 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 whitespace-nowrap group relative overflow-hidden"
              >
                <span className="relative z-10 font-medium">Hire me</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10"></div>
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
