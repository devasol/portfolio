import { useEffect, useRef } from "react";

/**
 * Interactive BackgroundGrid component
 * High-performance "Anti-Gravity" dot field with "Bold Full Green" hover effect.
 * Adapted for Admin Dashboard
 */
export default function BackgroundGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -2000, y: -2000 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let animationFrameId;
    let points = [];
    let width = 0;
    let height = 0;

    // Use consistent constants for all screen sizes as requested
    const spacing = 28; 
    const damping = 0.08; 
    const friction = 0.72;

    const getColors = () => {
      // Check for both class-based (Tailwind default) and data-attribute based (DaisyUI/custom) dark mode
      const isDark = document.documentElement.classList.contains("dark") || 
                     document.documentElement.getAttribute("data-theme") === "dark";
      return {
        dot: isDark ? "rgba(255, 255, 255, 0.18)" : "rgba(15, 23, 42, 0.15)",
        fullGreen: "rgb(52, 211, 153)", 
      };
    };

    const initPoints = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // Reset transform before scaling to prevent accumulation on resize
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      
      points = [];
      
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = offsetX + x * spacing;
          const py = offsetY + y * spacing;
          points.push({
            x: px,
            y: py,
            baseX: px,
            baseY: py,
            vx: 0,
            vy: 0,
            currentSize: 1.2,
            targetSize: 1.2,
          });
        }
      }
    };

    const animate = () => {
      timeRef.current += 0.005;
      ctx.clearRect(0, 0, width, height);
      const colors = getColors();
      
      // Constants consistent for all screens
      const mouseRadius = 200;
      const mouseStrength = 0.8;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          
          const tx = p.x - Math.cos(angle) * force * mouseRadius * mouseStrength;
          const ty = p.y - Math.sin(angle) * force * mouseRadius * mouseStrength;
          
          p.vx += (tx - p.x) * 0.22;
          p.vy += (ty - p.y) * 0.22;
          
          p.targetSize = 1.2 + force * 4.8; 
          
          ctx.fillStyle = colors.fullGreen;
          ctx.globalAlpha = Math.min(1.0, 0.4 + force * 0.8);
        } else {
          p.targetSize = 1.2;
          ctx.fillStyle = colors.dot;
          ctx.globalAlpha = 1.0;
        }

        const ambientX = Math.sin(timeRef.current + p.baseX * 0.02) * 1.5;
        const ambientY = Math.cos(timeRef.current + p.baseY * 0.02) * 1.5;

        p.vx += (p.baseX + ambientX - p.x) * damping;
        p.vy += (p.baseY + ambientY - p.y) * damping;
        
        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        p.currentSize += (p.targetSize - p.currentSize) * 0.15;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.currentSize, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouch = (e) => {
      if (e.touches && e.touches[0]) {
        // Stop default browser behavior to prevent scroll jumping while interacting
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleResize = () => {
      initPoints();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("resize", handleResize);
    initPoints();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ 
        zIndex: 1, // Behind content but visible
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        pointerEvents: "none"
      }}
    />
  );
}
