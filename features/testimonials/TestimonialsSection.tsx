"use client";

import React, { useState, useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useScrollReveal } from "@/lib/useScrollReveal";
import * as Icons from "@/components/Icons";
import { cn } from "@/lib/cn";

const testimonials = [
  {
    name: "Alex Cristache",
    role: "Staff Frontend Architect",
    avatar: "AC",
    quote: "Veylon solves layout complexities. The state synchronization between Bento Grid and Accordion variants works flawlessly, and the zero parent re-render isolation is a massive win for client performance.",
  },
  {
    name: "Sarah Jenkins",
    role: "Lead UI Developer, Orbit",
    avatar: "SJ",
    quote: "Standardized color tokens make themes simple to override. Keyboard accessibility is built directly into components, ensuring WCAG AA compliance out-of-the-box.",
  },
  {
    name: "Devon Patel",
    role: "VP Engineering, Acme Corp",
    avatar: "DP",
    quote: "Intl.NumberFormat renders perfect localizations, and the static base prices compute discount rates cleanly without jumping. Highly maintainable codebase.",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useScrollReveal(60); // 60ms stagger delay for entrances
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const observerOptions = {
      root: carouselRef.current,
      threshold: 0.6, // card is active when 60% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute("data-index") || "0", 10);
          setActiveCardIndex(index);
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, [carouselRef]);

  const scrollPrev = () => {
    if (carouselRef.current) {
      const cardWidth = cardRefs.current[0]?.offsetWidth || 300;
      carouselRef.current.scrollBy({
        left: -(cardWidth + 24), // cardWidth + 24px gap
        behavior: "smooth",
      });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      const cardWidth = cardRefs.current[0]?.offsetWidth || 300;
      carouselRef.current.scrollBy({
        left: cardWidth + 24, // cardWidth + 24px gap
        behavior: "smooth",
      });
    }
  };

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (card && carouselRef.current) {
      carouselRef.current.scrollTo({
        left: card.offsetLeft - carouselRef.current.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-card-border/30 overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeading
          badge="REVIEWS"
          title="What Engineers Are Saying"
          subtitle="Feedback from professional front-end developers using our premium designs and layout engines."
          id="testimonials-title"
          className="mb-0"
        />
        
        {/* Navigation Arrows */}
        <div className="flex gap-3">
          <button
            onClick={scrollPrev}
            className="p-2.5 rounded-lg border border-card-border bg-card-bg/60 text-muted-text hover:text-primary-accent hover:border-primary-accent/40 active:scale-95 transition-all cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent"
            aria-label="Previous testimonial"
          >
            <Icons.ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="p-2.5 rounded-lg border border-card-border bg-card-bg/60 text-muted-text hover:text-primary-accent hover:border-primary-accent/40 active:scale-95 transition-all cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent"
            aria-label="Next testimonial"
          >
            <Icons.ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Testimonials Carousel Snap Container */}
      <div className="relative w-full">
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth gap-6 snap-x snap-mandatory no-scrollbar select-none pb-4"
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              data-index={idx}
              ref={(el) => {
                if (el) cardRefs.current[idx] = el;
              }}
              tabIndex={0}
              className="snap-start shrink-0 w-[88%] sm:w-[46.5%] lg:w-[31.5%] glass-card-interactive rounded-xl p-8 md:p-10 flex flex-col justify-between reveal-item outline-none focus-visible:ring-2 focus-visible:ring-primary-accent"
            >
              <p className="text-sm md:text-base text-muted-text font-sans leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="relative p-[1.5px] rounded-full bg-gradient-to-tr from-forsythia via-deep-saffron to-nocturnal-expedition animate-[spin_6s_linear_infinite] overflow-hidden flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-nocturnal-expedition flex items-center justify-center font-mono font-bold text-sm text-primary-accent">
                    {t.avatar}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-sans">
                    {t.name}
                  </h3>
                  <p className="text-xs text-muted-text/80 font-mono">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2.5 mt-4" aria-label="Testimonial navigation dots">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToCard(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent",
              activeCardIndex === idx 
                ? "bg-primary-accent w-5 shadow-[0_0_8px_var(--primary-accent)]" 
                : "bg-muted-text/30 hover:bg-muted-text/60"
            )}
            aria-label={`Go to testimonial ${idx + 1}`}
            aria-current={activeCardIndex === idx ? "true" : "false"}
          />
        ))}
      </div>
    </section>
  );
};
export default TestimonialsSection;
