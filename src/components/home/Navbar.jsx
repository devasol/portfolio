import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Resume", href: "#resume", id: "resume" },
  { label: "Contact", href: "#contact", id: "contact" },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && window.localStorage.getItem("theme")
      ? window.localStorage.getItem("theme")
      : "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle Elevation on Scroll
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for Active Section Tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -70% 0px", // Trigger when section is near the top
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const element = document.getElementById(item.id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
      window.history.pushState(null, "", item.href);
    }
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
      elevated ? "py-4 elevated-header" : "py-6"
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              className="display-font font-bold text-2xl tracking-tight cursor-pointer"
            >
              <span className="text-ink">Dawit</span>
              <span className="text-emerald-500">.</span>
            </Link>
          </div>

          {/* Desktop Navigation (Floating Island) */}
          <div 
            className={`hidden xl:flex items-center px-2 py-1.5 rounded-full backdrop-blur-2xl border shadow-2xl transition-all duration-500 ${
              elevated ? "scale-95 amazing-island-light" : "scale-100"
            }`}
            style={{
              backgroundColor: "var(--nav-island-bg)",
              borderColor: "var(--nav-island-border)",
              boxShadow: elevated ? "0 20px 40px var(--nav-island-shadow)" : "0 10px 20px rgba(0,0,0,0.1)"
            }}
          >
            <nav className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 relative group ${
                      active ? "text-emerald-400" : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <div className="absolute inset-0 bg-emerald-400/10 rounded-full -z-10 animate-pulse-subtle" />
                    )}
                  </a>
                );
              })}
            </nav>
            <div className="mx-3 h-6 w-px" style={{ backgroundColor: "var(--nav-island-border)" }} />
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, { id: "contact", href: "#contact" })}
              className="btn-premium-interactive inline-flex items-center rounded-full bg-emerald-400 px-6 py-2.5 text-xs font-black text-gray-900 shadow-lg shadow-emerald-400/20"
            >
              <span className="relative z-10">HIRE ME</span>
            </a>
          </div>

          {/* Right: Theme & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-ink/5 backdrop-blur-md text-ink hover:bg-ink/10 transition-colors shadow-lg"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/10 border border-emerald-400/30 text-ink shadow-lg backdrop-blur-lg"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className={`h-5 w-5 transition-all duration-500 ${mobileMenuOpen ? "rotate-180 text-emerald-400" : ""}`}
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        <div 
          className={`xl:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            mobileMenuOpen ? "mt-6 opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none mt-0"
          }`}
          style={{ maxHeight: mobileMenuOpen ? "1000px" : "0" }}
        >
          <div className="p-4 rounded-[32px] bg-black/80 backdrop-blur-3xl border border-white/10 shadow-2xl space-y-2 ring-1 ring-white/5 max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`flex items-center px-6 py-4 rounded-2xl text-lg font-bold transition-all duration-300 ${
                      active 
                        ? "bg-emerald-400 text-gray-900 shadow-xl shadow-emerald-400/20" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                    {active && <div className="ml-auto w-2 h-2 rounded-full bg-gray-900" />}
                  </a>
                );
              })}
              <div className="h-px bg-white/10 my-3" />
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, { id: "contact", href: "#contact" })}
                className="btn-premium-interactive flex items-center justify-center py-5 rounded-2xl bg-white text-gray-900 font-black text-sm tracking-[0.2em] shadow-xl"
              >
                HIRE ME NOW
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}


