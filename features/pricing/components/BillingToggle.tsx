"use client";

import React from "react";
import { usePricing } from "../PricingContext";
import { getSavingsPercentText } from "../pricing.utils";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export const BillingToggle: React.FC = () => {
  const { billingCycle, setBillingCycle } = usePricing();
  const savingsText = getSavingsPercentText();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-10">
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-text/80">
        Choose cycle:
      </span>
      <div 
        className="relative bg-card-bg/85 border border-card-border p-1.5 rounded-full flex items-center w-64 select-none"
        role="radiogroup"
        aria-label="Billing cycle selector"
      >
        {/* Sliding background capsule */}
        <div
          className={cn(
            "absolute top-1.5 bottom-1.5 rounded-full bg-primary-accent shadow-[0_0_12px_rgba(255,200,1,0.35)] transition-transform duration-300 ease-out",
            billingCycle === "monthly" ? "left-1.5 w-[116px] translate-x-0" : "left-1.5 w-[124px] translate-x-[120px]"
          )}
        />

        <button
          type="button"
          role="radio"
          aria-checked={billingCycle === "monthly"}
          onClick={() => setBillingCycle("monthly")}
          className={cn(
            "relative z-10 w-[116px] text-center py-1.5 font-mono text-xs font-bold uppercase tracking-wide rounded-full transition-colors duration-300 cursor-pointer focus:outline-none",
            billingCycle === "monthly" ? "text-oceanic-noir" : "text-muted-text hover:text-foreground"
          )}
        >
          Monthly
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={billingCycle === "annual"}
          onClick={() => setBillingCycle("annual")}
          className={cn(
            "relative z-10 w-[124px] text-center py-1.5 font-mono text-xs font-bold uppercase tracking-wide rounded-full transition-colors duration-300 cursor-pointer focus:outline-none",
            billingCycle === "annual" ? "text-oceanic-noir" : "text-muted-text hover:text-foreground"
          )}
        >
          Annually
        </button>
      </div>

      <Badge variant="secondary" className="animate-pulse">
        {savingsText}
      </Badge>
    </div>
  );
};
