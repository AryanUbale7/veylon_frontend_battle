"use client";

import React, { useState, useRef } from "react";
import { ChevronDown } from "@/components/Icons";
import { cn } from "@/lib/cn";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useScrollReveal(50); // 50ms stagger

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelHeight = isOpen 
          ? `${panelRefs.current[item.id]?.scrollHeight}px` 
          : "0px";

        return (
          <div key={item.id} className="reveal-item">
            <div
              className={cn(
                "glass-card rounded-xl overflow-hidden transition-all duration-300",
                isOpen 
                  ? "border-primary-accent/70 shadow-[0_0_15px_rgba(255,200,1,0.15)] bg-card-bg/85" 
                  : "hover:border-primary-accent/40 hover:bg-card-bg/55"
              )}
            >
              {/* Accordion Trigger */}
              <h3>
                <button
                  type="button"
                  id={`faq-trigger-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-mono font-bold tracking-wide uppercase text-sm md:text-base text-foreground cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:outline-none focus-visible:bg-white/5"
                >
                  <span className={cn("transition-colors duration-300", isOpen ? "text-primary-accent" : "text-foreground")}>
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "text-primary-accent transition-transform duration-300 shrink-0",
                      isOpen ? "rotate-180" : ""
                    )}
                    size={18}
                  />
                </button>
              </h3>

              {/* Accordion Content Panel */}
              <div
                id={`faq-panel-${item.id}`}
                role="region"
                aria-labelledby={`faq-trigger-${item.id}`}
                ref={(el) => {
                  panelRefs.current[item.id] = el;
                }}
                className="overflow-hidden"
                style={{ 
                  maxHeight: panelHeight,
                  visibility: isOpen ? "visible" : "hidden",
                  opacity: isOpen ? 1 : 0,
                  transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                <div className="px-6 pb-6 text-sm md:text-base text-muted-text font-sans leading-relaxed border-t border-card-border/40 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
