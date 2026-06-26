import { useEffect, useRef } from "react";

export function useScrollReveal(staggerMs = 60, threshold = 0.15) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".reveal-item");
        items.forEach((item) => {
          (item as HTMLElement).classList.add("reveal-visible");
        });
      }
      return;
    }

    const observerOptions = {
      root: null,
      threshold,
    };

    let index = 0;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          // Set delay property for stagger
          el.style.setProperty("--reveal-delay", `${index * staggerMs}ms`);
          el.classList.add("reveal-visible");
          observer.unobserve(el); // Reveal once and unobserve
          index++;
        }
      });
    }, observerOptions);

    const container = containerRef.current;
    if (container) {
      const items = container.querySelectorAll(".reveal-item");
      items.forEach((item) => observer.observe(item));
    }

    return () => {
      if (container) {
        const items = container.querySelectorAll(".reveal-item");
        items.forEach((item) => observer.unobserve(item));
      }
    };
  }, [staggerMs, threshold]);

  return containerRef;
}
