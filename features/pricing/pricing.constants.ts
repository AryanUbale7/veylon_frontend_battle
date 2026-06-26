import { CurrencyCode, CurrencyMeta, PricingMatrix, PricingTier } from "./pricing.types";

// ASSUMPTION: Static exchange rates relative to USD base
export const CURRENCY_META: Record<CurrencyCode, CurrencyMeta> = {
  USD: { symbol: "$", locale: "en-US", rate: 1.0 },
  EUR: { symbol: "€", locale: "de-DE", rate: 0.92 },
  INR: { symbol: "₹", locale: "en-IN", rate: 83.5 },
  GBP: { symbol: "£", locale: "en-GB", rate: 0.78 }, // 4th currency added to prove scalability
};

export const TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Ideal for individual developers building initial prototypes.",
    features: [
      "Up to 5 active repositories",
      "Standard responsive Bento layout grid",
      "CSS variable theme customizer",
      "Community support access",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    description: "Perfect for scaling teams needing fast animations and clean code.",
    features: [
      "Unlimited active repositories",
      "Full bento grid ↔ accordion sync",
      "Custom localized formatting models",
      "Priority email support",
      "Advanced motion design presets",
    ],
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Built for massive teams requiring high compliance and security.",
    features: [
      "Dedicated server isolated environments",
      "Strict WCAG AA accessibility audit logs",
      "Custom animation timing profiles",
      "24/7 dedicated support phone line",
      "SLA guarantee logs",
    ],
  },
];

export const PRICING_MATRIX: PricingMatrix = {
  starter: {
    USD: { monthlyBase: 19 },
    EUR: { monthlyBase: 17 },
    INR: { monthlyBase: 1500 },
    GBP: { monthlyBase: 15 },
  },
  pro: {
    USD: { monthlyBase: 49 },
    EUR: { monthlyBase: 45 },
    INR: { monthlyBase: 4000 },
    GBP: { monthlyBase: 40 },
  },
  enterprise: {
    USD: { monthlyBase: 99 },
    EUR: { monthlyBase: 90 },
    INR: { monthlyBase: 8000 },
    GBP: { monthlyBase: 80 },
  },
};

export const DISCOUNT_RATE = 0.8; // Save 20%
