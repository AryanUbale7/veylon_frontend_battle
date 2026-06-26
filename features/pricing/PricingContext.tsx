"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { BillingCycle, CurrencyCode } from "./pricing.types";

interface PricingContextProps {
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
}

const PricingContext = createContext<PricingContextProps | undefined>(undefined);

export const PricingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  return (
    <PricingContext.Provider value={{ billingCycle, setBillingCycle, currency, setCurrency }}>
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error("usePricing must be used within a PricingProvider");
  }
  return context;
};
