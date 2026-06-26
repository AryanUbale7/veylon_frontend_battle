import { PRICING_MATRIX, DISCOUNT_RATE } from "./pricing.constants";
import { CurrencyCode, BillingCycle, TierId } from "./pricing.types";

/**
 * Calculates the annual price with a flat 20% discount.
 * getAnnualPrice(monthlyBase) = monthlyBase * 12 * 0.8
 */
export function getAnnualPrice(monthlyBase: number): number {
  return monthlyBase * 12 * DISCOUNT_RATE;
}

/**
 * Derives pricing based on tier, currency, and billing cycle.
 * Monthly base prices are converted to annual with a 20% discount via getAnnualPrice.
 * Formula: monthly * 12 * 0.8
 */
export function getDisplayPrice(tierId: TierId, currency: CurrencyCode, cycle: BillingCycle): number {
  const tierPrice = PRICING_MATRIX[tierId];
  if (!tierPrice) {
    throw new Error(`Pricing tier "${tierId}" not found in pricing matrix.`);
  }

  const currencyPrice = tierPrice[currency];
  if (!currencyPrice) {
    throw new Error(`Currency code "${currency}" not supported for tier "${tierId}".`);
  }

  const baseMonthly = currencyPrice.monthlyBase;

  if (cycle === "monthly") {
    return baseMonthly;
  } else {
    // Derived annual price using pure function
    return getAnnualPrice(baseMonthly);
  }
}

/**
 * Localizes number formatting based on the selected currency's locale setting.
 * Uses Intl.NumberFormat to avoid symbol concatenation.
 */
export function formatCurrency(value: number, currency: CurrencyCode, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Calculates and returns the annual savings percentage text.
 * Ensures the value is computed dynamically rather than hardcoded.
 */
export function getSavingsPercentText(): string {
  const discountPercent = Math.round((1 - DISCOUNT_RATE) * 100);
  return `Save ${discountPercent}%`;
}
