"use client";

import React from "react";
import { PricingProvider } from "./PricingContext";
import { BillingToggle } from "./components/BillingToggle";
import { CurrencySwitcher } from "./components/CurrencySwitcher";
import { PricingCard } from "./components/PricingCard";
import { TIERS } from "./pricing.constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { useScrollReveal } from "@/lib/useScrollReveal";

// Inner component to access the context variables
const PricingContent: React.FC = () => {
  const containerRef = useScrollReveal(80); // 80ms stagger

  return (
    <div className="w-full">
      <BillingToggle />
      <CurrencySwitcher />
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TIERS.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
          />
        ))}
      </div>
    </div>
  );
};

export const PricingSection: React.FC = () => {
  return (
    <PricingProvider>
      <section 
        id="pricing" 
        className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-card-border/30"
        aria-labelledby="pricing-title"
      >
        <SectionHeading
          badge="PRICING ENGINE"
          title="Intelligent Pricing Models"
          subtitle="Choose the ideal plan for your projects. Switch billing cycles and currencies dynamically with instant price calculations."
          id="pricing-title"
        />
        <PricingContent />
      </section>
    </PricingProvider>
  );
};
export default PricingSection;
