import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let requestDisplay = null;

    const handleScroll = () => {
      if (requestDisplay) cancelAnimationFrame(requestDisplay);
      
      requestDisplay = requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const windowHeight = scrollHeight - clientHeight;
        
        const progress = windowHeight > 0 ? scrollTop / windowHeight : 0;
        setWidth(progress * 100);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestDisplay) cancelAnimationFrame(requestDisplay);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[1001] pointer-events-none bg-transparent">
      <div
        className="h-full bg-emerald-400 shadow-[0_2px_10px_rgba(52,211,153,0.5)] transition-all duration-300 ease-out"
        style={{ width: `${width}%` }}
      >
        {/* Glow head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-20 bg-emerald-400 blur-md opacity-50" />
      </div>
    </div>
  );
}
