"use client";

import React, { useRef, useState, useEffect } from "react";
import { FEATURE_ITEMS } from "./content";
import { useFeatureShowcase } from "./FeatureShowcaseContext";
import * as Icons from "@/components/Icons";
import { cn } from "@/lib/cn";
import { useScrollReveal } from "@/lib/useScrollReveal";

export const Accordion: React.FC = () => {
  const { activeId, setActiveId } = useFeatureShowcase();
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [mounted, setMounted] = useState(false);
  const containerRef = useScrollReveal(60); // 60ms stagger

  useEffect(() => {
    setMounted(true);
  }, []);

  const IconMap = {
    ChartPie: Icons.ChartPie,
    ArrowPath: Icons.ArrowPath,
    Cube16Solid: Icons.Cube16Solid,
    LinkSolid: Icons.LinkSolid,
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
      {FEATURE_ITEMS.map((item) => {
        const IconComponent = IconMap[item.iconName];
        const isActive = activeId === item.id;
        const panelHeight = (mounted && isActive)
          ? `${panelRefs.current[item.id]?.scrollHeight || 0}px` 
          : "0px";

        return (
          <div
            key={item.id}
            className={cn(
              "reveal-item overflow-hidden transition-all duration-300 rounded-2xl glass-card",
              isActive 
                ? "border-primary-accent/60 bg-card-bg shadow-[0_15px_30px_rgba(0,0,0,0.3)]" 
                : "border-card-border hover:border-primary-accent/40"
            )}
          >
            {/* Header Accordion Button Trigger */}
            <h3>
              <button
                type="button"
                id={`showcase-trigger-${item.id}`}
                aria-expanded={isActive}
                aria-controls={`showcase-panel-${item.id}`}
                onClick={() => setActiveId(isActive ? null : item.id)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-mono font-bold tracking-wide uppercase text-sm text-foreground cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:outline-none focus-visible:bg-white/5"
              >
                <div className="flex items-center gap-3.5">
                  <div className={cn(
                    "p-2 rounded-lg border border-card-border bg-background text-muted-text transition-colors",
                    isActive ? "text-primary-accent border-primary-accent/40 bg-card-bg" : ""
                  )}>
                    <IconComponent size={18} />
                  </div>
                  <span>{item.title}</span>
                </div>
                <span className="font-mono text-[10px] text-primary-accent bg-primary-accent/10 border border-primary-accent/20 px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              </button>
            </h3>

            {/* Accordion Panel Content */}
            <div
              id={`showcase-panel-${item.id}`}
              role="region"
              aria-labelledby={`showcase-trigger-${item.id}`}
              ref={(el) => {
                panelRefs.current[item.id] = el;
              }}
              style={{
                maxHeight: panelHeight,
                opacity: isActive ? 1 : 0,
                transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                visibility: isActive ? "visible" : "hidden"
              }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 border-t border-card-border/40 flex flex-col gap-3">
                <p className="text-sm text-muted-text font-sans leading-relaxed">
                  {item.description}
                </p>
                <p className="text-xs md:text-sm text-foreground/80 font-sans leading-relaxed bg-card-bg/50 p-4 rounded-md border border-card-border/40">
                  {item.detailText}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Accordion;
