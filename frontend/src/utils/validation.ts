import type {
  Departure,
  InquiryErrors,
  InquiryFormValues,
  TravelPackage,
} from "@/types/travel";
import { differenceInDays } from "@/utils/dates";

export function validateTravelPackages(packages: TravelPackage[]): void {
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const item of packages) {
    if (seenIds.has(item.id)) {
      throw new Error(`Dupli package ID: ${item.id}`);
    }

    if (seenSlugs.has(item.slug)) {
      throw new Error(`Dupli package slug: ${item.slug}`);
    }

    seenIds.add(item.id);
    seenSlugs.add(item.slug);

    if (item.images.length < 2) {
      throw new Error(`${item.slug} mora imati najmanje dve slike.`);
    }

    if (item.itinerary.length < 1) {
      throw new Error(`${item.slug} mora imati najmanje jedan itinerary red.`);
    }

    for (const departure of item.departures) {
      validateDeparture(item.slug, item.durationDays, departure);
    }
  }
}

function validateDeparture(slug: string, durationDays: number, departure: Departure): void {
  if (departure.pricePerPerson <= 0) {
    throw new Error(`${slug}:${departure.id} ima nevalidnu cenu.`);
  }

  if (departure.previousPrice && departure.previousPrice <= departure.pricePerPerson) {
    throw new Error(`${slug}:${departure.id} previousPrice mora biti veći od pricePerPerson.`);
  }

  if (departure.status !== "limited" && departure.remainingSpots) {
    throw new Error(`${slug}:${departure.id} remainingSpots je dozvoljen samo za limited.`);
  }

  if (departure.remainingSpots && departure.remainingSpots < 1) {
    throw new Error(`${slug}:${departure.id} remainingSpots mora biti pozitivan.`);
  }

  if (differenceInDays(departure.startDate, departure.endDate) !== durationDays) {
    throw new Error(`${slug}:${departure.id} nema konzistentan broj dana.`);
  }
}

export function validateInquiryForm(values: InquiryFormValues): InquiryErrors {
  const errors: InquiryErrors = {};
  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const note = values.note.trim();

  if (fullName.length < 3) {
    errors.fullName = "Unesite ime i prezime od najmanje 3 karaktera.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Unesite ispravnu email adresu.";
  }

  if (phone.replace(/[^\d+]/g, "").length < 7) {
    errors.phone = "Unesite telefon u razumnom formatu.";
  }

  if (note.length > 500) {
    errors.note = "Napomena može imati najviše 500 karaktera.";
  }

  return errors;
}
