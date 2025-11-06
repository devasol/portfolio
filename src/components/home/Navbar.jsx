import { useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Resume", href: "#resume" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
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
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

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

  // Function to handle navigation
  const handleNavigation = (href) => {
    if (currentPath !== "/") {
      // If not on the main page, go to the main page first
      window.location.href = "/";
    }
    
    // Then scroll to the section
    setTimeout(() => {
      const element = document.getElementById(href.substring(1)); // Remove the '#'
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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
  // Desktop chips: subtle glass; Mobile chips: strong contrast and interaction
  const desktopChipClasses = "bg-transparent text-ink/90 hover:text-ink";
  const mobileChipClasses = isDark
    ? "bg-white text-neutral-900 ring-1 ring-white/60 shadow-md hover:bg-white/95"
    : "bg-neutral-900 text-white ring-1 ring-black/40 shadow-md hover:bg-neutral-800";
  const mobileLinkClasses = `block w-full px-4 py-2 rounded-full font-medium transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${mobileChipClasses}`;

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={headerStyle}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered dynamic island */}
        <div className="h-16 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center">
          <div className="justify-self-start">
            <a
              href="/"
              className="display-font font-semibold text-2xl sm:text-3xl tracking-tight"
            >
              <span className="text-ink">Dawit</span>
              <span className="text-emerald-500">.</span>
            </a>
          </div>

          <div className="hidden lg:block justify-self-center mt-2">
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

              {/* Nav links centered inside island (lg+) */}
              <nav className="hidden lg:flex items-center gap-2 text-sm">
                {NAV_ITEMS.map((item) => {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.href);
                      }}
                      className={`px-3 py-1.5 rounded-full relative overflow-hidden transition-colors ${desktopChipClasses}`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              {/* Call to action */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("#contact");
                }}
                className="hidden xl:inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 text-sm font-medium text-base-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Hire me</span>
              </a>
            </div>
          </div>

          {/* Right: mobile actions (compact) */}
          <div className="justify-self-end lg:hidden flex items-center gap-2">
            {/* Theme toggle + Menu combined */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 hover:bg-white/5"
              title="Toggle theme"
            >
              <ThemeIcon />
            </button>
            <button
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:bg-white/5"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute left-0 top-1 block h-0.5 w-5 transition-transform ${
                    isDark ? "bg-white" : "bg-black"
                  } ${open ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-2.5 block h-0.5 w-5 transition-opacity ${
                    isDark ? "bg-white" : "bg-black"
                  } ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-4 block h-0.5 w-5 transition-transform ${
                    isDark ? "bg-white" : "bg-black"
                  } ${open ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>

          {/* end of top bar */}
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden grid transition-[grid-template-rows] duration-300 overflow-hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div
            className={`min-h-0 transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            }`}
          >
            <nav className="px-2 pb-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                    setOpen(false);
                  }}
                  className={`${mobileLinkClasses}`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("#contact");
                  setOpen(false);
                }}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-base-900 bg-emerald-400 hover:bg-emerald-300"
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
