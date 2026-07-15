export type ISODate = `${number}-${number}-${number}`;
export type Currency = "EUR" | "RSD";
export type TransportType = "plane" | "bus" | "self";
export type PackageCategory =
  | "summer"
  | "winter"
  | "city-break"
  | "europe"
  | "long-haul"
  | "new-year"
  | "excursion";
export type DepartureStatus = "available" | "limited" | "sold-out";
export type SourceType = "confirmed" | "provided-unverified" | "mock";

export interface Departure {
  id: string;
  startDate: ISODate;
  endDate: ISODate;
  pricePerPerson: number;
  previousPrice?: number;
  currency: Currency;
  status: DepartureStatus;
  remainingSpots?: number;
  isLastMinute?: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  location?: string;
  meal?: string;
  overnight?: string;
}

export interface Excursion {
  id: string;
  name: string;
  description: string;
  price?: number;
  currency?: Currency;
  note?: string;
}

export interface Accommodation {
  name: string;
  category?: string;
  city: string;
  board?: string;
  description: string;
  amenities: string[];
  images?: string[];
  mapUrl?: string;
  sourceType: SourceType;
}

export interface TravelPackage {
  id: string;
  catalogNumber: number;
  slug: string;
  title: string;
  destinationSlug: string;
  destination: string;
  country: string;
  countrySlug: string;
  category: PackageCategory;
  shortDescription: string;
  description: string;
  durationDays: number;
  nights: number;
  transportType: TransportType;
  departurePoint?: string;
  baggageNote?: string;
  practicalNotes: string[];
  images: string[];
  departures: Departure[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  optionalExcursions: Excursion[];
  accommodation?: Accommodation;
  childPricing: "agent-confirmation";
  featured: boolean;
  popular?: boolean;
  new?: boolean;
  sourceType: "mock";
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  label: string;
  intro: string;
  editorial: string;
  heroImage: string;
  gallery: string[];
  alt: string[];
  sourceType: "mock";
}

export interface CategoryDefinition {
  id: PackageCategory;
  index: string;
  label: string;
  href: string;
  description: string;
}

export interface AgencyContactValue {
  value: string;
  verification: SourceType;
  note: string;
}

export interface AgencyData {
  name: string;
  fullName: string;
  slogan: string;
  city: string;
  logoPath: string;
  notice: string;
  phones: AgencyContactValue[];
  email: AgencyContactValue;
  social: Array<{
    label: string;
    value: string;
    href?: string;
    verification: SourceType;
    note: string;
  }>;
}

export interface ImageSource {
  id: string;
  destinationSlug: string;
  originalUrl: string;
  sourceUrl: string;
  author: string;
  platform: string;
  altText: string;
  capturedAt: string;
  licenseNote: string;
}

export interface PackageFilters {
  destination: string;
  country: string;
  month: string;
  adults: number;
  children: number;
  category: string;
  transport: string;
  minPrice: number | null;
  maxPrice: number | null;
  sort: PackageSortKey;
}

export type PackageSortKey =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "departure-asc";

export interface InquiryPayload {
  packageId: string;
  packageTitle: string;
  packageSlug: string;
  departureId: string;
  departureStartDate: ISODate;
  departureEndDate: ISODate;
  adultCount: number;
  childCount: number;
  pricePerAdult: number;
  estimatedAdultTotal: number;
  currency: Currency;
}

export interface InquiryFormValues {
  fullName: string;
  email: string;
  phone: string;
  note: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryFormValues | "form", string>>;
