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
  
  let formattedPrice = "Contact Us";
  let periodText = "";
  let equivalentText = "";
  let isError = false;

  try {
    const meta = CURRENCY_META[currency];
    if (!meta) {
      throw new Error(`Currency metadata not found for "${currency}"`);
    }
    const derivedPrice = getDisplayPrice(tierId, currency, billingCycle);
    formattedPrice = formatCurrency(derivedPrice, currency, meta.locale);
    periodText = billingCycle === "monthly" ? "/mo" : "/yr";
    if (billingCycle === "annual") {
      equivalentText = `(${formatCurrency(derivedPrice / 12, currency, meta.locale)}/mo equivalent)`;
    }
  } catch {
    isError = true;
    formattedPrice = "Contact Us";
    periodText = "";
  }

  return (
    <div className="mb-6 flex flex-col items-start gap-1">
      <div className="flex items-baseline">
        <span className="text-4xl md:text-5xl font-mono font-black text-foreground tracking-tight">
          {formattedPrice}
        </span>
        {periodText && (
          <span className="text-sm font-mono font-bold text-muted-text/60 ml-1.5 uppercase">
            {periodText}
          </span>
        )}
      </div>
      {billingCycle === "annual" && !isError ? (
        <span className="text-xs font-mono font-bold text-secondary-accent uppercase">
          {equivalentText}
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
