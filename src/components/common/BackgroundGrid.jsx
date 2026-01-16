import { useEffect, useRef } from "react";

/**
 * Interactive BackgroundGrid component
 * High-performance "Anti-Gravity" dot field with "Bold Full Green" hover effect.
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

    const spacing = 28; 
    const mouseRadius = 200; 
    const mouseStrength = 0.8; 
    const damping = 0.08; 
    const friction = 0.72;

    const getColors = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      return {
        dot: isDark ? "rgba(255, 255, 255, 0.18)" : "rgba(15, 23, 42, 0.15)",
        fullGreen: "rgb(52, 211, 153)", 
      };
    };

    const initPoints = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      points = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * spacing;
          const py = y * spacing;
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

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        ctx.globalAlpha = 1.0;

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

    const handleResize = () => {
      initPoints();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    initPoints();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ zIndex: -5 }}
      className="pointer-events-none fixed inset-0 h-full w-full" 
    />
  );
}
