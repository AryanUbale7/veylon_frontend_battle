"use client";

import React, { useRef, useEffect } from "react";
import { FEATURE_ITEMS, FeatureItem } from "./content";
import { useFeatureShowcase } from "./FeatureShowcaseContext";
import * as Icons from "@/components/Icons";
import { cn } from "@/lib/cn";
import { useScrollReveal } from "@/lib/useScrollReveal";

// Child Bento Card component that encapsulates border glow logic
const BentoCard: React.FC<{
  item: FeatureItem;
  isActive: boolean;
  onClick: () => void;
  IconComponent: React.ComponentType<{ size?: number; className?: string }>;
}> = ({ item, isActive, onClick, IconComponent }) => {
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Disable pointer operations on touch devices
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    let rafId: number = 0;
    let rect = card.getBoundingClientRect();

    const handleResize = () => {
      rect = card.getBoundingClientRect();
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;

      // Throttle pointer operations via requestAnimationFrame to prevent layout thrashing
      rafId = requestAnimationFrame(() => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update border glow tracking variables
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        
        rafId = 0;
      });
    };

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      
      // Reset layout values smoothly
      card.style.removeProperty("--mouse-x");
      card.style.removeProperty("--mouse-y");
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={cn("reveal-item", item.gridClass || "")}>
      <button
        ref={cardRef}
        type="button"
        onClick={onClick}
        className={cn(
          "text-left p-8 rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent select-none glass-card-interactive bento-glowing-card transition-all duration-200 ease-out w-full h-full",
          isActive
            ? "border-primary-accent/50 bg-card-bg shadow-[0_15px_40px_rgba(255,200,1,0.08)] before:opacity-100 -translate-y-1"
            : "hover:-translate-y-1"
        )}
        aria-expanded={isActive}
        aria-label={`Showcase feature: ${item.title}`}
      >
        {/* Content wrapper */}
        <div className="flex flex-col h-full justify-between gap-4">
          <div>
            {/* Header Badge & Icon */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary-accent bg-primary-accent/10 border border-primary-accent/20 px-2.5 py-0.5 rounded-full">
                {item.badge}
              </span>
              <div className={cn(
                "p-2.5 rounded-lg border border-card-border bg-background text-muted-text transition-all duration-200 hover:scale-110 hover:text-primary-accent",
                isActive ? "text-primary-accent border-primary-accent/40 bg-card-bg" : ""
              )}>
                <IconComponent size={20} />
              </div>
            </div>

            {/* Title & Short Description */}
            <h3 className="font-mono text-lg md:text-xl font-black uppercase tracking-wide text-foreground mb-3">
              {item.title}
            </h3>
            <p className="text-sm md:text-base text-muted-text font-sans leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Dynamic Detail Overlay (Native CSS transition) */}
          <div
            className={cn(
              "overflow-hidden border-t border-card-border/30 pt-4 mt-4",
              isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0 pointer-events-none border-transparent pt-0 mt-0"
            )}
            style={{
              transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            <p className="text-xs md:text-sm text-foreground/80 font-sans leading-relaxed">
              {item.detailText}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export const BentoGrid: React.FC = () => {
  const { activeId, setActiveId } = useFeatureShowcase();
  const containerRef = useScrollReveal(70); // 70ms stagger

  const IconMap = {
    ChartPie: Icons.ChartPie,
    ArrowPath: Icons.ArrowPath,
    Cube16Solid: Icons.Cube16Solid,
    LinkSolid: Icons.LinkSolid,
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {FEATURE_ITEMS.map((item) => {
        const IconComponent = IconMap[item.iconName];
        const isActive = activeId === item.id;

        return (
          <BentoCard
            key={item.id}
            item={item}
            isActive={isActive}
            onClick={() => setActiveId(isActive ? null : item.id)}
            IconComponent={IconComponent}
          />
        );
      })}
    </div>
  );
};
export default BentoGrid;
