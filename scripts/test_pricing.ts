// Simple unit test runner for the pricing engine calculations
import { getDisplayPrice } from "../features/pricing/pricing.utils";
import { PRICING_MATRIX, DISCOUNT_RATE } from "../features/pricing/pricing.constants";
import { CurrencyCode, BillingCycle, TierId } from "../features/pricing/pricing.types";

interface TestCase {
  tierId: TierId;
  currency: CurrencyCode;
  cycle: BillingCycle;
  expected: number;
}

const testCases: TestCase[] = [];
const tiers: TierId[] = ["starter", "pro", "enterprise"];
const currencies: CurrencyCode[] = ["USD", "EUR", "INR", "GBP"];
const cycles: BillingCycle[] = ["monthly", "annual"];

// Dynamically generate all 24 permutations to ensure 100% coverage
for (const tierId of tiers) {
  for (const currency of currencies) {
    for (const cycle of cycles) {
      const baseMonthly = PRICING_MATRIX[tierId][currency].monthlyBase;
      const expected = cycle === "monthly" 
        ? baseMonthly 
        : baseMonthly * 12 * DISCOUNT_RATE;
        
      testCases.push({
        tierId,
        currency,
        cycle,
        expected
      });
    }
  }
}

let passedCount = 0;
let failedCount = 0;

console.log("Running pricing engine tests...");
console.log("------------------------------");

for (const tc of testCases) {
  try {
    const actual = getDisplayPrice(tc.tierId, tc.currency, tc.cycle);
    if (Math.abs(actual - tc.expected) < 0.001) {
      passedCount++;
    } else {
      console.error(
        `FAIL: tier=${tc.tierId}, currency=${tc.currency}, cycle=${tc.cycle}. Expected ${tc.expected}, got ${actual}`
      );
      failedCount++;
    }
  } catch (error) {
    console.error(`ERROR running test for ${tc.tierId}/${tc.currency}/${tc.cycle}:`, error);
    failedCount++;
  }
}

console.log("------------------------------");
console.log(`Results: ${passedCount} passed, ${failedCount} failed.`);

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log("All pricing engine unit tests passed successfully!");
  process.exit(0);
}
