import React from "react";
import dynamic from "next/dynamic";
import { StickyNav } from "@/components/StickyNav";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { FeatureShowcase } from "@/features/feature-showcase/FeatureShowcase";
import { PricingSection } from "@/features/pricing/PricingSection";
import { Footer } from "@/components/Footer";

// Dynamically import below-the-fold sections to optimize initial bundle size.
// Static-height placeholders match the hydrated layouts to prevent Cumulative Layout Shift (CLS).
const WorkflowSection = dynamic(
  () => import("@/features/workflow-visualization/WorkflowSection"),
  {
    loading: () => (
      <div 
        className="h-[450px] max-w-7xl mx-auto px-6 py-20 border-t border-nocturnal-expedition/10 bg-transparent" 
        aria-hidden="true" 
      />
    ),
  }
);

const TestimonialsSection = dynamic(
  () => import("@/features/testimonials/TestimonialsSection"),
  {
    loading: () => (
      <div 
        className="h-[400px] max-w-7xl mx-auto px-6 py-20 border-t border-nocturnal-expedition/10 bg-transparent" 
        aria-hidden="true" 
      />
    ),
  }
);

const FaqSection = dynamic(
  () => import("@/features/faq/FaqSection"),
  {
    loading: () => (
      <div 
        className="h-[500px] max-w-7xl mx-auto px-6 py-20 border-t border-nocturnal-expedition/10 bg-transparent" 
        aria-hidden="true" 
      />
    ),
  }
);

export default function Home() {
  return (
    <>
      {/* Interactive Sticky Header Navigation */}
      <StickyNav />

      {/* Above-the-fold Critical Landing Content (Renders Server-side instantly) */}
      <Hero />
      <TrustedBy />

      {/* Primary Feature Layout Grid & Accordion (Renders above the fold, client-hydrated) */}
      <FeatureShowcase />

      {/* Dynamic pricing engine */}
      <PricingSection />

      {/* Below-the-fold Deferred Components (Lazy-loaded, Code-split) */}
      <WorkflowSection />
      <TestimonialsSection />
      <FaqSection />

      {/* Static Site Footer */}
      <Footer />
    </>
  );
}
export const dynamicParams = false;
