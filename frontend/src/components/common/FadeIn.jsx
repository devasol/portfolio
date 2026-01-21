import { useEffect, useRef, useState } from "react";

export default function FadeIn({ 
  children, 
  delay = 0, 
  className = "", 
  variant = "fade-up",
  stagger = false
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can stop observing if we don't want to re-animate
          io.unobserve(node);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const variantClass = stagger ? "reveal-stagger" : `reveal-${variant}`;

  return (
    <div
      ref={ref}
      className={`reveal-base ${variantClass} ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}


