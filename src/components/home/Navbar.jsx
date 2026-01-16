import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", href: "/", id: "home" },
  { label: "Services", href: "/services", id: "services" },
  { label: "Work", href: "/work", id: "work" },
  { label: "Resume", href: "/resume", id: "resume" },
  { label: "Contact", href: "/contact", id: "contact" },
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
  const [isMobileDisplay, setIsMobileDisplay] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && window.localStorage.getItem("theme")
      ? window.localStorage.getItem("theme")
      : "dark"
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDisplay(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleNavClick = (e, item) => {
    // If we are on mobile display and on the home page, scroll instead of navigate
    if (isMobileDisplay && location.pathname === "/") {
      const element = document.getElementById(item.id);
      if (element) {
        e.preventDefault();
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        setMobileMenuOpen(false);
        return;
      }
    }
    
    // Default behavior: navigate to the page and close mobile menu
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 pointer-events-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-auto">
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="display-font font-semibold text-2xl tracking-tight cursor-pointer"
            >
              <span className="text-ink">Dawit</span>
              <span className="text-emerald-500">.</span>
            </Link>
          </div>

          {/* Desktop Navigation (Island Style) */}
          <div className={`hidden lg:flex items-center px-4 py-2.5 rounded-full backdrop-blur-xl border border-white/10 shadow-lg ring-1 ring-white/5 transition-all duration-300 ${
            elevated ? "bg-surface/80 shadow-black/20" : "bg-surface/40 shadow-black/5"
          }`}>
            <nav className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`nav-link-premium px-4 py-2 text-sm font-medium relative z-10 transition-colors ${
                      active ? "text-emerald-400" : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <div className="absolute -bottom-1 left-0 right-0 flex justify-center pointer-events-none">
                        <div className="relative">
                          <div className="h-[2px] w-6 bg-emerald-400 rounded-full animate-nav-underline" />
                          <div className="absolute inset-0 h-[2px] w-6 bg-emerald-400 blur-[4px] opacity-30 animate-nav-underline -z-10" />
                        </div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="mx-3 h-6 w-px bg-white/10" />
            <Link
              to="/contact"
              className="btn-premium-interactive inline-flex items-center rounded-full bg-emerald-400 px-5 py-2 text-xs font-bold text-gray-900 overflow-hidden"
            >
              <span className="relative z-10">HIRE ME</span>
            </Link>
          </div>

          {/* Right: Theme & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="theme-btn-premium cursor-pointer flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors"
              aria-label="Toggle theme"
            >
              <ThemeIcon />
            </button>

            {/* Mobile Menu Button - Shown only on small screens */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 backdrop-blur-xl border border-white/15 text-ink cursor-pointer shadow-lg ring-1 ring-white/10"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`h-5 w-5 transition-all duration-300 ${mobileMenuOpen ? "rotate-90 text-emerald-400" : ""}`}
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
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          style={{ maxHeight: mobileMenuOpen ? "500px" : "0" }}
        >
          <div className="mb-6 p-4 rounded-3xl bg-surface/90 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-2">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`flex items-center px-5 py-3.5 rounded-2xl text-base font-semibold transition-all duration-300 ${
                      active 
                        ? "bg-emerald-400/15 text-emerald-400 ring-1 ring-emerald-400/20" 
                        : "text-ink/60 hover:text-ink hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52,211,153)]" />}
                  </Link>
                );
              })}
              <div className="h-px bg-white/5 my-2" />
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-premium-interactive flex items-center justify-center py-4 rounded-2xl bg-emerald-400 text-gray-900 font-bold text-sm tracking-[0.1em] shadow-lg shadow-emerald-500/20"
              >
                HIRE ME NOW
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
