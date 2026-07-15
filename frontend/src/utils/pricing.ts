import type { Currency } from "@/types/travel";

export const DEMO_RSD_PER_EUR = 117.2;

export function normalizePriceForComparison(amount: number, currency: Currency): number {
  return currency === "EUR" ? amount : amount / DEMO_RSD_PER_EUR;
}

export function formatMoney(amount: number, currency: Currency): string {
  const formatted = new Intl.NumberFormat("sr-Latn-RS", {
    maximumFractionDigits: currency === "EUR" ? 0 : 0,
  }).format(amount);

  return `${formatted} ${currency === "EUR" ? "€" : "RSD"}`;
}
