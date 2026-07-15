import type { PackageFilters, PackageSortKey, TravelPackage } from "@/types/travel";
import { getMonthKey, stripDiacritics } from "@/utils/dates";
import {
  getNextAvailableDeparture,
  getPackageStartingPrice,
} from "@/utils/packages";
import { normalizePriceForComparison } from "@/utils/pricing";

export const defaultFilters: PackageFilters = {
  destination: "",
  country: "",
  month: "",
  adults: 2,
  children: 0,
  category: "",
  transport: "",
  minPrice: null,
  maxPrice: null,
  sort: "recommended",
};

export function parseFilters(search: URLSearchParams): PackageFilters {
  const adults = Number(search.get("adults") ?? defaultFilters.adults);
  const children = Number(search.get("children") ?? defaultFilters.children);
  const sort = (search.get("sort") as PackageSortKey | null) ?? defaultFilters.sort;

  return {
    destination: search.get("destination") ?? "",
    country: search.get("country") ?? "",
    month: search.get("month") ?? "",
    adults: Number.isFinite(adults) && adults > 0 ? adults : defaultFilters.adults,
    children: Number.isFinite(children) && children >= 0 ? children : defaultFilters.children,
    category: search.get("category") ?? "",
    transport: search.get("transport") ?? "",
    minPrice: search.get("minPrice") ? Number(search.get("minPrice")) : null,
    maxPrice: search.get("maxPrice") ? Number(search.get("maxPrice")) : null,
    sort,
  };
}

export function buildSearchParams(filters: PackageFilters): string {
  const params = new URLSearchParams();

  if (filters.destination) params.set("destination", filters.destination);
  if (filters.country) params.set("country", filters.country);
  if (filters.month) params.set("month", filters.month);
  if (filters.adults !== defaultFilters.adults) params.set("adults", String(filters.adults));
  if (filters.children !== defaultFilters.children) params.set("children", String(filters.children));
  if (filters.category) params.set("category", filters.category);
  if (filters.transport) params.set("transport", filters.transport);
  if (typeof filters.minPrice === "number") params.set("minPrice", String(filters.minPrice));
  if (typeof filters.maxPrice === "number") params.set("maxPrice", String(filters.maxPrice));
  if (filters.sort !== defaultFilters.sort) params.set("sort", filters.sort);

  return params.toString();
}

export function getTravelerSummary(adults: number, children: number): string {
  if (children > 0) {
    return `${adults} odrasla, ${children} ${children === 1 ? "dete" : "dece"}`;
  }

  const total = adults + children;
  return `${total} ${total === 1 ? "putnik" : "putnika"}`;
}

export function filterPackages(items: TravelPackage[], filters: PackageFilters): TravelPackage[] {
  const destinationNeedle = stripDiacritics(filters.destination);
  const countryNeedle = stripDiacritics(filters.country);

  return items.filter((item) => {
    if (destinationNeedle) {
      const matchesDestination =
        stripDiacritics(item.destination).includes(destinationNeedle) ||
        stripDiacritics(item.country).includes(destinationNeedle) ||
        stripDiacritics(item.title).includes(destinationNeedle);

      if (!matchesDestination) return false;
    }

    if (countryNeedle && stripDiacritics(item.country) !== countryNeedle) {
      return false;
    }

    if (filters.category && item.category !== filters.category) {
      return false;
    }

    if (filters.transport && item.transportType !== filters.transport) {
      return false;
    }

    if (filters.month) {
      const hasMonth = item.departures.some((departure) => getMonthKey(departure.startDate) === filters.month);
      if (!hasMonth) return false;
    }

    const startingPrice = getPackageStartingPrice(item);
    if (startingPrice) {
      const comparable = normalizePriceForComparison(startingPrice.pricePerPerson, startingPrice.currency);

      if (typeof filters.minPrice === "number" && comparable < filters.minPrice) {
        return false;
      }

      if (typeof filters.maxPrice === "number" && comparable > filters.maxPrice) {
        return false;
      }
    } else if (typeof filters.minPrice === "number" || typeof filters.maxPrice === "number") {
      return false;
    }

    return true;
  });
}

export function sortPackages(items: TravelPackage[], sort: PackageSortKey): TravelPackage[] {
  const clone = [...items];

  clone.sort((left, right) => {
    if (sort === "price-asc" || sort === "price-desc") {
      const leftDeparture = getPackageStartingPrice(left);
      const rightDeparture = getPackageStartingPrice(right);
      const leftValue = leftDeparture
        ? normalizePriceForComparison(leftDeparture.pricePerPerson, leftDeparture.currency)
        : Number.POSITIVE_INFINITY;
      const rightValue = rightDeparture
        ? normalizePriceForComparison(rightDeparture.pricePerPerson, rightDeparture.currency)
        : Number.POSITIVE_INFINITY;

      return sort === "price-asc" ? leftValue - rightValue : rightValue - leftValue;
    }

    if (sort === "departure-asc") {
      const leftDeparture = getNextAvailableDeparture(left);
      const rightDeparture = getNextAvailableDeparture(right);
      const leftValue = leftDeparture?.startDate ?? "9999-99-99";
      const rightValue = rightDeparture?.startDate ?? "9999-99-99";
      return leftValue.localeCompare(rightValue);
    }

    const featuredGap = Number(right.featured) - Number(left.featured);
    if (featuredGap !== 0) return featuredGap;

    const popularGap = Number(Boolean(right.popular)) - Number(Boolean(left.popular));
    if (popularGap !== 0) return popularGap;

    const leftNext = getNextAvailableDeparture(left)?.startDate ?? "9999-99-99";
    const rightNext = getNextAvailableDeparture(right)?.startDate ?? "9999-99-99";
    const nextGap = leftNext.localeCompare(rightNext);
    if (nextGap !== 0) return nextGap;

    return left.title.localeCompare(right.title, "sr-Latn-RS");
  });

  return clone;
}

export function getFilterOptions(items: TravelPackage[]) {
  const destinations = Array.from(new Set(items.map((item) => item.destination))).sort();
  const countries = Array.from(new Set(items.map((item) => item.country))).sort();
  const months = Array.from(new Set(items.flatMap((item) => item.departures.map((departure) => getMonthKey(departure.startDate))))).sort();
  const transports = Array.from(new Set(items.map((item) => item.transportType)));
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return { destinations, countries, months, transports, categories };
}

export function getPriceBounds(items: TravelPackage[]): { min: number; max: number } {
  const values = items
    .map((item) => getPackageStartingPrice(item))
    .filter(Boolean)
    .map((departure) => normalizePriceForComparison(departure!.pricePerPerson, departure!.currency));

  return {
    min: Math.floor(Math.min(...values)),
    max: Math.ceil(Math.max(...values)),
  };
}

export function getSelectedDepartureId(search: URLSearchParams): string | null {
  return search.get("departure");
}
