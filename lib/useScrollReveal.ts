import { useEffect, useRef } from "react";

export function useScrollReveal(staggerMs = 60, threshold = 0.15) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".reveal-item");
        items.forEach((item) => {
          const el = item as HTMLElement;
          el.classList.add("reveal-visible");
          el.dataset.revealed = "true";
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
          const delay = `${index * staggerMs}ms`;
          el.dataset.delay = delay;
          el.dataset.revealed = "true";
          el.style.setProperty("--reveal-delay", delay);
          el.classList.add("reveal-visible");
          observer.unobserve(el); // Reveal once and unobserve
          index++;
        }
      });
    }, observerOptions);

    const container = containerRef.current;
    if (container) {
      const items = container.querySelectorAll(".reveal-item");
      items.forEach((item) => {
        const el = item as HTMLElement;
        if (el.dataset.revealed === "true") {
          el.classList.add("reveal-visible");
          if (el.dataset.delay) {
            el.style.setProperty("--reveal-delay", el.dataset.delay);
          }
        } else {
          observer.observe(el);
        }
      });
    }

    return () => {
      if (container) {
        const items = container.querySelectorAll(".reveal-item");
        items.forEach((item) => observer.unobserve(item));
      }
    };
  }, [staggerMs, threshold]);

  // Declarative restoration on every commit/re-render to prevent React class name reconciliation from wiping out classes.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".reveal-item");
    items.forEach((item) => {
      const el = item as HTMLElement;
      if (el.dataset.revealed === "true") {
        el.classList.add("reveal-visible");
        if (el.dataset.delay) {
          el.style.setProperty("--reveal-delay", el.dataset.delay);
        }
      }
    });
  });

  return containerRef;
}
