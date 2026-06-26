/**
 * PROVING SCALABILITY:
 * To add a 4th currency (e.g. "GBP"):
 * 1. Add "GBP" to the CurrencyCode union type below.
 * 2. Add the corresponding key and details to CURRENCY_META in pricing.constants.ts
 * 3. Add the GBP monthly base pricing to the tiers in PRICING_MATRIX in pricing.constants.ts
 * 
 * No component files or rendering engines (PricingCard, CurrencySwitcher, etc.) 
 * need to be altered. Everything resolves dynamically at compile-time.
 */

export type BillingCycle = "monthly" | "annual";
export type CurrencyCode = "USD" | "EUR" | "INR" | "GBP";

export interface CurrencyMeta {
  symbol: string;
  locale: string;
  rate: number; // Static conversion factor relative to USD base
}

export type TierId = "starter" | "pro" | "enterprise";

export interface PricingTier {
  id: TierId;
  name: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export type PricingMatrix = Record<TierId, Record<CurrencyCode, { monthlyBase: number }>>;

