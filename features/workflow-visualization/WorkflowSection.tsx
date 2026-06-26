"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useScrollReveal } from "@/lib/useScrollReveal";

const steps = [
  {
    num: "01",
    title: "Define tokens",
    desc: "Specify exact organizer colors as CSS variables. Map theme classes to control backgrounds and accents seamlessly.",
  },
  {
    num: "02",
    title: "Isolate Interactive States",
    desc: "Confine billing, currency, and bento-accordion active-panel states to local subtrees. Keep standard text and layouts fully static.",
  },
  {
    num: "03",
    title: "Harden performance",
    desc: "Verify bundle sizes, utilize Next.js dynamic code-splitting for below-the-fold elements, and eliminate layout shifts.",
  },
];

export const WorkflowSection: React.FC = () => {
  const containerRef = useScrollReveal(75); // 75ms stagger

  return (
    <section 
      id="workflow" 
      className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-card-border/30"
      aria-labelledby="workflow-title"
    >
      <SectionHeading
        badge="WORKFLOW"
        title="Development Process Pipeline"
        subtitle="Our standard steps to build high-performance, competition-ready user interfaces."
        id="workflow-title"
      />
      
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {/* Connector Line for Desktop with active flow animation */}
        <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-[2px] bg-card-border/35 -z-10 -translate-y-6 overflow-hidden">
          <div className="absolute inset-0 animate-flow-line opacity-80"></div>
        </div>
        
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-8 flex flex-col items-start gap-4 glass-card-interactive rounded-2xl reveal-item"
          >
            <span className="font-mono text-3xl font-black text-primary-accent">
              {step.num}
            </span>
            <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-foreground">
              {step.title}
            </h3>
            <p className="text-sm md:text-base text-muted-text font-sans leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default WorkflowSection;
