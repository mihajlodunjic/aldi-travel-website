import type { ISODate } from "@/types/travel";

export const DEMO_REFERENCE_DATE = new Date("2026-07-15T00:00:00+02:00");

const fullDateFormatter = new Intl.DateTimeFormat("sr-Latn-RS", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("sr-Latn-RS", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("sr-Latn-RS", {
  month: "long",
  year: "numeric",
});

export function parseIsoDate(value: ISODate | string): Date {
  return new Date(`${value}T00:00:00+02:00`);
}

export function formatTravelDate(value: ISODate | string): string {
  return fullDateFormatter.format(parseIsoDate(value));
}

export function formatTravelDateCompact(value: ISODate | string): string {
  return shortDateFormatter.format(parseIsoDate(value));
}

export function formatTravelMonth(value: string): string {
  if (!value) return "";

  const [year, month] = value.split("-");
  return monthFormatter.format(new Date(`${year}-${month}-01T00:00:00+02:00`));
}

export function isFutureOrCurrentDate(value: ISODate | string): boolean {
  return parseIsoDate(value) >= DEMO_REFERENCE_DATE;
}

export function getMonthKey(value: ISODate | string): string {
  return value.slice(0, 7);
}

export function differenceInDays(startDate: ISODate | string, endDate: ISODate | string): number {
  const start = parseIsoDate(startDate).getTime();
  const end = parseIsoDate(endDate).getTime();
  return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

export function stripDiacritics(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}
