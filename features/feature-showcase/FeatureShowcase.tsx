"use client";

import React from "react";
import { FeatureShowcaseProvider } from "./FeatureShowcaseContext";
import { BentoGrid } from "./BentoGrid";
import { Accordion } from "./Accordion";
import { useMediaQuery } from "./useBreakpointSync";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Inner component to handle media query switching and preserve state
const FeatureShowcaseContent: React.FC = () => {
  const isDesktop = useMediaQuery(1024);

  return (
    <div className="w-full">
      {isDesktop ? <BentoGrid /> : <Accordion />}
    </div>
  );
};

export const FeatureShowcase: React.FC = () => {
  return (
    <FeatureShowcaseProvider>
      <section 
        id="features" 
        className="py-20 md:py-28 max-w-7xl mx-auto px-6"
        aria-labelledby="features-title"
      >
        <SectionHeading
          badge="FEATURE SHOWCASE"
          title="Engineered Layout Systems"
          subtitle="Interact with our responsive feature cards. Toggle cards to inspect hidden technical specifications. Resizing viewport maintains state."
          id="features-title"
        />
        <FeatureShowcaseContent />
      </section>
    </FeatureShowcaseProvider>
  );
};
export default FeatureShowcase;
