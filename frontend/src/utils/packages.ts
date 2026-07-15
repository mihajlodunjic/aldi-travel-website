import { categories } from "@/data/categories";
import type {
  Departure,
  Destination,
  PackageCategory,
  TravelPackage,
  TransportType,
} from "@/types/travel";
import { formatTravelDate, getMonthKey, isFutureOrCurrentDate } from "@/utils/dates";
import { formatMoney, normalizePriceForComparison } from "@/utils/pricing";

export const transportLabels: Record<TransportType, string> = {
  bus: "Autobuski prevoz",
  plane: "Avion",
  self: "Sopstveni prevoz",
};

export const categoryLabelMap = new Map(categories.map((category) => [category.id, category.label]));

export function getAvailableDepartures(item: TravelPackage): Departure[] {
  return item.departures.filter(
    (departure) => departure.status !== "sold-out" && isFutureOrCurrentDate(departure.startDate),
  );
}

export function getNextAvailableDeparture(item: TravelPackage): Departure | undefined {
  return getAvailableDepartures(item).sort((left, right) =>
    left.startDate.localeCompare(right.startDate),
  )[0];
}

export function getPackageStartingPrice(item: TravelPackage): Departure | undefined {
  return getAvailableDepartures(item).sort((left, right) => {
    const leftValue = normalizePriceForComparison(left.pricePerPerson, left.currency);
    const rightValue = normalizePriceForComparison(right.pricePerPerson, right.currency);
    return leftValue - rightValue;
  })[0];
}

export function getLastMinuteDepartures(item: TravelPackage): Departure[] {
  return item.departures.filter(
    (departure) =>
      departure.isLastMinute &&
      Boolean(departure.previousPrice) &&
      departure.status !== "sold-out" &&
      isFutureOrCurrentDate(departure.startDate),
  );
}

export function getLastMinuteDiscount(departure: Departure): number | null {
  if (!departure.previousPrice || departure.previousPrice <= departure.pricePerPerson) {
    return null;
  }

  return Math.round(((departure.previousPrice - departure.pricePerPerson) / departure.previousPrice) * 100);
}

export function getDestinationPackageCount(destinationSlug: string, items: TravelPackage[]): number {
  return items.filter((item) => item.destinationSlug === destinationSlug).length;
}

export function getDestinationPriceRange(destinationSlug: string, items: TravelPackage[]): {
  min: Departure | undefined;
  max: Departure | undefined;
} {
  const prices = items
    .filter((item) => item.destinationSlug === destinationSlug)
    .flatMap((item) => getAvailableDepartures(item));

  const sorted = prices.sort((left, right) => {
    const leftValue = normalizePriceForComparison(left.pricePerPerson, left.currency);
    const rightValue = normalizePriceForComparison(right.pricePerPerson, right.currency);
    return leftValue - rightValue;
  });

  return { min: sorted[0], max: sorted.at(-1) };
}

export function getNextDepartureLabel(item: TravelPackage): string {
  const next = getNextAvailableDeparture(item);
  return next ? `Sledeći polazak ${formatTravelDate(next.startDate)}` : "Trenutno nema dostupnog termina";
}

export function getStatusBadge(item: TravelPackage): string | null {
  if (getLastMinuteDepartures(item).length > 0) return "Last minute";
  if (item.popular) return "Najtraženije";
  if (item.new) return "Novo";
  return null;
}

export function getCatalogLabel(catalogNumber: number): string {
  return `KATALOG ${String(catalogNumber).padStart(2, "0")}`;
}

export function getTransportLabel(transportType: TransportType): string {
  return transportLabels[transportType];
}

export function getCategoryLabel(category: PackageCategory): string {
  return categoryLabelMap.get(category) ?? category;
}

export function getPriceLabel(item: TravelPackage): string {
  const starting = getPackageStartingPrice(item);
  return starting ? `${formatMoney(starting.pricePerPerson, starting.currency)} po osobi` : "Cena na upit";
}

export function getDestinationMonthlyAvailability(destinationSlug: string, items: TravelPackage[]): string[] {
  return Array.from(
    new Set(
      items
        .filter((item) => item.destinationSlug === destinationSlug)
        .flatMap((item) => item.departures.map((departure) => getMonthKey(departure.startDate))),
    ),
  ).sort();
}

export function getRelatedPackages(item: TravelPackage, items: TravelPackage[]): TravelPackage[] {
  return items
    .filter((candidate) => candidate.id !== item.id && candidate.countrySlug === item.countrySlug)
    .sort((left, right) => left.catalogNumber - right.catalogNumber)
    .slice(0, 3);
}

export function getDestinationHero(items: TravelPackage[], destination: Destination): TravelPackage | undefined {
  return items.find((item) => item.destinationSlug === destination.slug && item.featured) ??
    items.find((item) => item.destinationSlug === destination.slug);
}
