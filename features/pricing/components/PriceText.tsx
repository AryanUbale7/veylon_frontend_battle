"use client";

import React from "react";
import { usePricing } from "../PricingContext";
import { getDisplayPrice, formatCurrency } from "../pricing.utils";
import { CURRENCY_META } from "../pricing.constants";
import { TierId } from "../pricing.types";

interface PriceTextProps {
  tierId: TierId;
}

export const PriceText: React.FC<PriceTextProps> = ({ tierId }) => {
  const { currency, billingCycle } = usePricing();
  const meta = CURRENCY_META[currency];
  const derivedPrice = getDisplayPrice(tierId, currency, billingCycle);
  const formattedPrice = formatCurrency(derivedPrice, currency, meta.locale);
  const periodText = billingCycle === "monthly" ? "/mo" : "/yr";

  return (
    <div className="mb-6 flex flex-col items-start gap-1">
      <div className="flex items-baseline">
        <span className="text-4xl md:text-5xl font-mono font-black text-foreground tracking-tight">
          {formattedPrice}
        </span>
        <span className="text-sm font-mono font-bold text-muted-text/60 ml-1.5 uppercase">
          {periodText}
        </span>
      </div>
      {billingCycle === "annual" ? (
        <span className="text-xs font-mono font-bold text-secondary-accent uppercase">
          ({formatCurrency(derivedPrice / 12, currency, meta.locale)}/mo equivalent)
        </span>
      ) : (
        <span className="text-xs font-mono font-bold text-transparent select-none uppercase">
          &nbsp;
        </span>
      )}
    </div>
  );
};
export default PriceText;
