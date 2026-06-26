"use client";

import React from "react";
import { PricingTier } from "../pricing.types";
import { PriceText } from "./PriceText";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface PricingCardProps {
  tier: PricingTier;
}

export const PricingCard: React.FC<PricingCardProps> = React.memo(({
  tier,
}) => {
  return (
    <div
      className={cn(
        "p-8 flex flex-col justify-between relative transition-all duration-300 glass-card rounded-2xl border hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] reveal-item",
        tier.isPopular
          ? "border-transparent bg-card-bg/85 pricing-card-recommended shadow-[0_20px_45px_rgba(255,200,1,0.08)]"
          : "border-card-border hover:border-primary-accent/30"
      )}
    >
      {tier.isPopular && (
        <Badge
          variant="primary"
          className="absolute -top-3 left-6 shadow-md z-10 pricing-card-badge"
        >
          Most Popular
        </Badge>
      )}

      <div>
        <h3 className="font-mono text-xl font-black uppercase tracking-wider text-foreground mb-2">
          {tier.name}
        </h3>
        <p className="text-sm text-muted-text/80 font-sans leading-relaxed mb-6">
          {tier.description}
        </p>

        {/* Pricing Area */}
        <PriceText tierId={tier.id} />

        <div className="h-px bg-nocturnal-expedition/20 mb-6"></div>

        {/* Features List */}
        <ul className="flex flex-col gap-3.5 mb-8" aria-label={`Features of the ${tier.name} plan`}>
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-muted-text font-sans">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-primary-accent shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={tier.isPopular ? "primary" : "outline"}
        className={cn(
          "w-full justify-center mt-auto active:scale-[0.98] transition-all duration-150",
          tier.isPopular 
            ? "bg-gradient-to-r from-primary-accent to-secondary-accent border-transparent hover:shadow-[0_0_20px_rgba(255,200,1,0.35)] text-oceanic-noir font-mono" 
            : "hover:bg-primary-accent/15 hover:shadow-[0_0_15px_rgba(255,200,1,0.1)] border-primary-accent/40"
        )}
      >
        Choose {tier.name}
      </Button>
    </div>
  );
});
export default PricingCard;
