import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const firstLoad = useRef(true);

  // Handle initial page load only
  useEffect(() => {
    const handleLoad = () => setLoading(false);
    
    if (document.readyState === "complete") {
      // If document is already loaded, hide the loader immediately
      setLoading(false);
    } else {
      // Wait for the initial page load to complete
      window.addEventListener("load", handleLoad);
    }
    
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Don't show loader on route changes - only handle initial load
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    }
    // Removed the route change loader to prevent unnecessary loading effects
  }, [location]);

  if (!loading) return null;

  return (
    <div className="global-loader fixed inset-0 z-50 flex items-center justify-center">
      <div className="loader-backdrop absolute inset-0 bg-[rgba(3,7,10,0.8)] backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="loader-ring w-28 h-28 rounded-full flex items-center justify-center">
          <svg
            className="w-20 h-20 animate-loader-spin"
            viewBox="0 0 50 50"
            aria-hidden="true"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="rgba(16,185,129,0.12)"
              strokeWidth="6"
            />
            <path
              d="M25 5 a20 20 0 0 1 0 40"
              stroke="rgba(16,185,129,0.95)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        <div className="text-ink/80 text-sm tracking-wider">Loading…</div>
      </div>
    </div>
  );
}
