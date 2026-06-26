"use client";

import React from "react";
import { usePricing } from "../PricingContext";
import { CurrencyCode } from "../pricing.types";
import { CURRENCY_META } from "../pricing.constants";
import { cn } from "@/lib/cn";

export const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency } = usePricing();

  const currencies = Object.keys(CURRENCY_META) as CurrencyCode[];

  return (
    <div className="flex items-center gap-3 justify-center mb-12 flex-wrap">
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-text/80">
        Currency:
      </span>
      <div 
        className="flex items-center bg-card-bg/60 border border-card-border p-1 rounded-md"
        role="group"
        aria-label="Currency switcher"
      >
        {currencies.map((curr) => {
          const isActive = currency === curr;
          return (
            <button
              key={curr}
              type="button"
              onClick={() => setCurrency(curr)}
              className={cn(
                "px-3.5 py-1.5 font-mono text-xs font-bold rounded cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-accent",
                isActive
                  ? "bg-primary-accent text-oceanic-noir shadow-sm"
                  : "text-muted-text hover:text-foreground"
              )}
            >
              {curr} ({CURRENCY_META[curr].symbol})
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default CurrencySwitcher;
