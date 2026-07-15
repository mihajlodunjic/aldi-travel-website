import { destinationMap } from "@/data/destinations";
import type {
  Accommodation,
  Departure,
  Excursion,
  ISODate,
  ItineraryDay,
  TravelPackage,
  TransportType,
} from "@/types/travel";
import { validateTravelPackages } from "@/utils/validation";

function departure(
  packageId: string,
  startDate: ISODate,
  endDate: ISODate,
  pricePerPerson: number,
  currency: "EUR" | "RSD",
  status: Departure["status"],
  options: Partial<Departure> = {},
): Departure {
  return {
    id: `${packageId}-${startDate}`,
    startDate,
    endDate,
    pricePerPerson,
    currency,
    status,
    ...options,
  };
}

function itineraryFromTitles(
  titles: string[],
  summary: string,
  overnight: string,
  pace: string,
): ItineraryDay[] {
  return titles.map((title, index) => ({
    day: index + 1,
    title,
    description:
      index === 0
        ? `${summary} Polazak počinje pregledom praktičnih detalja i ritma programa kako bi korisnik odmah razumeo strukturu aranžmana.`
        : index === titles.length - 1
          ? `Završni deo programa zatvara ${pace} ritam putovanja i vraća fokus na povratak, transfer i završne napomene.`
          : `${title} je postavljen kao čitljiv dnevni blok sa dovoljno konteksta da korisnik proceni tempo obilazaka, slobodnog vremena i organizacije dana.`,
    overnight,
  }));
}

function summerBusItinerary(destination: string): ItineraryDay[] {
  return itineraryFromTitles(
    [
      "Polazak iz Srbije",
      "Dolazak i raspodela smeštaja",
      "Prvi dan uz obalu",
      "Slobodan dan za plažu",
      `Šetnja i ritam mesta ${destination}`,
      "Fakultativni izlet ili slobodan dan",
      "Boravak na moru",
      "Slobodno vreme za individualni plan",
      "Još jedan dan za kupanje i odmor",
      "Odjava i priprema povratka",
      "Povratak u Srbiju",
    ],
    `${destination} je autobuski letnji aranžman sa dužim boravkom.`,
    destination,
    "letnji"
  );
}

function summerPlaneItinerary(destination: string): ItineraryDay[] {
  return itineraryFromTitles(
    [
      "Let i dolazak",
      "Upoznavanje destinacije",
      "Dan za more i odmor",
      "Lokalna šetnja i samostalni plan",
      "Fakultativni program ili plaža",
      "Još jedan slobodan dan",
      "Završni dan na destinaciji",
      "Povratni let",
    ],
    `${destination} u ovoj verziji koristi kraći avionski boravak sa jasnim rasporedom.`,
    destination,
    "mediteranski"
  );
}

function selfDriveSummerItinerary(destination: string): ItineraryDay[] {
  return itineraryFromTitles(
    [
      "Dolazak sopstvenim prevozom",
      "Useljenje i prva šetnja",
      "Dan za plažu",
      "Slobodan ritam boravka",
      "Lokalni obilazak",
      "Još jedan dan uz more",
      "Samostalni program",
      "Odmor i večernja šetnja",
      "Priprema završetka boravka",
      "Odjava i povratak",
    ],
    `${destination} testira scenario sopstvenog dolaska bez gubitka booking jasnoće.`,
    destination,
    "oporavka"
  );
}

function cityBreakItinerary(destination: string, finalDayTitle = "Povratak"): ItineraryDay[] {
  return itineraryFromTitles(
    [
      "Polazak i dolazak",
      `Panoramski pregled grada ${destination}`,
      "Slobodno vreme u centru",
      "Dodatni obilazak ili kupovina",
      finalDayTitle,
    ],
    `${destination} je gradski aranžman fokusiran na kratak, ali jasan pregled programa.`,
    destination,
    "gradski"
  );
}

function europeTourItinerary(destination: string, days: string[]): ItineraryDay[] {
  return itineraryFromTitles(days, `${destination} kombinuje više tačaka u jednom putovanju.`, destination, "turski");
}

function longHaulItinerary(destination: string): ItineraryDay[] {
  return itineraryFromTitles(
    [
      "Let i transfer do smeštaja",
      "Upoznavanje obale",
      "Dan za more i odmor",
      "Slobodno vreme",
      "Fakultativni izlet",
      "Boravak uz plažu",
      "Završni dan na destinaciji",
      "Povratni let",
    ],
    `${destination} koristi duži avionski boravak sa resort ritmom.`,
    destination,
    "odmora"
  );
}

function excursionItinerary(destination: string): ItineraryDay[] {
  return itineraryFromTitles(
    ["Polazak i put", "Program na destinaciji", "Povratak"],
    `${destination} je kraći domaći izlet sa jasnim rasporedom i cenom u RSD.`,
    destination,
    "izletnički"
  );
}

function winterItinerary(destination: string): ItineraryDay[] {
  return itineraryFromTitles(
    [
      "Dolazak na planinu",
      "Prvi skijaški ili šetački dan",
      "Dan za planinske aktivnosti",
      "Slobodan ritam boravka",
      "Odjava i povratak",
    ],
    `${destination} potvrđuje da isti booking model radi i za zimsku ponudu.`,
    destination,
    "planinski"
  );
}

function accommodation(
  city: string,
  name: string,
  board: string,
  description: string,
  amenities: string[],
  imageSeed: string[],
): Accommodation {
  return {
    name,
    city,
    board,
    category: "3* / 4* mock izbor",
    description,
    amenities,
    images: imageSeed,
    sourceType: "mock",
  };
}

function excursions(items: Array<[string, string, number?, ("EUR" | "RSD")?]>): Excursion[] {
  return items.map(([name, description, price, currency], index) => ({
    id: `${name.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`,
    name,
    description,
    ...(typeof price === "number" ? { price } : {}),
    ...(currency ? { currency } : {}),
    note: "Fakultativni izlet je informativan; dostupnost i cenu potvrđuje agent.",
  }));
}

function transportIncluded(transportType: TransportType): string[] {
  if (transportType === "plane") {
    return ["Povratni prevoz prema programu", "Transfer aerodrom – smeštaj – aerodrom"];
  }

  if (transportType === "self") {
    return ["Boravak prema programu", "Podrška agencije oko pripreme upita i termina"];
  }

  return ["Povratni autobuski prevoz prema programu", "Organizacija polaska i rasporeda po terminima"];
}

function transportExcluded(transportType: TransportType): string[] {
  if (transportType === "plane") {
    return ["Individualni troškovi tokom boravka", "Dodatni programi i ulaznice gde nisu navedeni kao uključeni"];
  }

  if (transportType === "self") {
    return ["Trošak sopstvenog prevoza", "Putarine, gorivo i individualni troškovi"];
  }

  return ["Individualni troškovi i ulaznice", "Dodatni transferi i programi van osnovnog rasporeda"];
}

function packageRecord(input: Omit<TravelPackage, "images" | "sourceType"> & { imageFallbackSlug?: string }): TravelPackage {
  const destination = destinationMap.get(input.destinationSlug);
  const images = destination?.gallery ?? [];

  return {
    ...input,
    images,
    sourceType: "mock",
  };
}

export const travelPackages: TravelPackage[] = [
  packageRecord({
    id: "AT-DEMO-001",
    catalogNumber: 1,
    slug: "parga-jonska-obala",
    title: "Parga — Jonska obala",
    destinationSlug: "parga",
    destination: "Parga",
    country: "Grčka",
    countrySlug: "grcka",
    category: "summer",
    shortDescription: "Lučki grad, duži autobuski boravak i nekoliko termina za poređenje tokom leta.",
    description:
      "Parga je u ovom demou postavljena kao klasično Aldi Travel letovanje: dugačak boravak, autobuski polazak i dovoljno jasni termini da korisnik može odmah da poredi cenu i raspored.",
    durationDays: 11,
    nights: 9,
    transportType: "bus",
    departurePoint: "Mesto i vreme polaska potvrđuje agent.",
    baggageNote: "Raspored i prtljag zavise od prevoznika i potvrđuju se uz demo upit.",
    practicalNotes: [
      "Prikazani termini i cene služe za demonstraciju sistema.",
      "Mesto i vreme polaska potvrđuje agent nakon provere dostupnosti.",
      "Cena za decu nije uključena u informativni obračun.",
    ],
    departures: [
      departure("AT-DEMO-001", "2026-07-22", "2026-08-01", 199, "EUR", "limited", {
        previousPrice: 249,
        remainingSpots: 4,
        isLastMinute: true,
      }),
      departure("AT-DEMO-001", "2026-08-09", "2026-08-19", 229, "EUR", "available"),
      departure("AT-DEMO-001", "2026-09-01", "2026-09-11", 209, "EUR", "available"),
    ],
    itinerary: summerBusItinerary("Parga"),
    included: [...transportIncluded("bus"), "Boravak prema programu", "Demo podrška za slanje upita"],
    excluded: [...transportExcluded("bus"), "Boravišne takse i lokalne doplate kada nisu posebno navedene"],
    optionalExcursions: excursions([
      ["Paxos i Antipaxos", "Celodnevni brodski izlet sa više stajanja.", 35, "EUR"],
      ["Večernja šetnja do tvrđave", "Lagani lokalni obilazak uz vodiča.", 15, "EUR"],
    ]),
    accommodation: accommodation(
      "Parga",
      "Studiji uz gradsku obalu",
      "Najam / bez usluge",
      "Mock smeštaj je zamišljen kao uredna baza za duži boravak sa kratkom šetnjom do obale.",
      ["Klima uređaj", "Wi-Fi", "Blizina promenade", "Čajna kuhinja"],
      destinationMap.get("parga")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: true,
    popular: true,
  }),
  packageRecord({
    id: "AT-DEMO-002",
    catalogNumber: 2,
    slug: "evija-sever-ostrva",
    title: "Evija — sever ostrva",
    destinationSlug: "evija",
    destination: "Evija",
    country: "Grčka",
    countrySlug: "grcka",
    category: "summer",
    shortDescription: "Mirniji sever ostrva sa autobuskim terminima raspoređenim kroz avgust i septembar.",
    description:
      "Evija u ovom portfoliju predstavlja letnji aranžman sa čitljivim rasponom cena i nekoliko jasnih polazaka, bez potrebe da korisnik zove agenciju da bi video osnovne uslove.",
    durationDays: 10,
    nights: 7,
    transportType: "bus",
    departurePoint: "Mesto i vreme polaska potvrđuje agent.",
    baggageNote: "Organizacija prtljaga i sedišta potvrđuje se uz izbor termina.",
    practicalNotes: [
      "Termini su mock podaci za prikaz filtriranja i sortiranja.",
      "Agent potvrđuje finalne detalje polaska i rasporeda.",
      "Cena važi po odrasloj osobi.",
    ],
    departures: [
      departure("AT-DEMO-002", "2026-07-27", "2026-08-05", 239, "EUR", "limited", {
        previousPrice: 269,
        remainingSpots: 6,
        isLastMinute: true,
      }),
      departure("AT-DEMO-002", "2026-08-15", "2026-08-24", 259, "EUR", "available"),
      departure("AT-DEMO-002", "2026-09-05", "2026-09-14", 229, "EUR", "available"),
    ],
    itinerary: itineraryFromTitles(
      [
        "Polazak iz Srbije",
        "Dolazak i smeštaj",
        "Boravak uz obalu Edipsosa",
        "Slobodan dan za lokalni ritam",
        "Plaža ili samostalni program",
        "Moguć fakultativni izlet",
        "Još jedan dan za odmor",
        "Završni obalni dan",
        "Priprema za polazak",
        "Povratak",
      ],
      "Evija koristi desetodnevni raspored sa mirnijim ritmom ostrva.",
      "Evija",
      "ostrvski",
    ),
    included: [...transportIncluded("bus"), "Boravak prema programu", "Demo podrška za upit"],
    excluded: [...transportExcluded("bus"), "Fakultativni programi gde nisu posebno naznačeni"],
    optionalExcursions: excursions([
      ["Termalni dan u Edipsosu", "Kraći izlazak do termalnih tačaka i promenade.", 18, "EUR"],
    ]),
    accommodation: accommodation(
      "Evija",
      "Apartmani severne obale",
      "Najam / bez usluge",
      "Ilustrativna baza za letnji boravak, zamišljena za goste kojima je važna pregledna struktura termina.",
      ["Wi-Fi", "Balkon", "Kratka šetnja do obale", "Mini kuhinja"],
      destinationMap.get("evija")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-003",
    catalogNumber: 3,
    slug: "lefkada-nidri-i-jonske-plaze",
    title: "Lefkada — Nidri i jonske plaže",
    destinationSlug: "lefkada",
    destination: "Lefkada",
    country: "Grčka",
    countrySlug: "grcka",
    category: "summer",
    shortDescription: "Jasna kombinacija luka, plaža i dužeg boravka sa više avgustovskih termina.",
    description:
      "Lefkada je jedan od istaknutih aranžmana ovog demoa jer kombinuje snažnu destinacijsku fotografiju sa potpuno čitljivom tablom polazaka i cenama po odrasloj osobi.",
    durationDays: 11,
    nights: 9,
    transportType: "bus",
    departurePoint: "Mesto i vreme polaska potvrđuje agent.",
    baggageNote: "Raspored sedenja i prtljag potvrđuju se uz agencijski odgovor.",
    practicalNotes: [
      "Mock raspoloživost služi za demonstraciju selected stanja i statusa termina.",
      "Program nije zamena za produkcionu ponudu agencije.",
      "Informativna cena se računa samo za odrasle putnike.",
    ],
    departures: [
      departure("AT-DEMO-003", "2026-08-03", "2026-08-13", 279, "EUR", "available"),
      departure("AT-DEMO-003", "2026-08-16", "2026-08-26", 289, "EUR", "available"),
      departure("AT-DEMO-003", "2026-09-03", "2026-09-13", 249, "EUR", "limited", {
        remainingSpots: 5,
      }),
    ],
    itinerary: summerBusItinerary("Lefkada"),
    included: [...transportIncluded("bus"), "Boravak prema programu", "Osnovni demo support"],
    excluded: [...transportExcluded("bus"), "Brodski programi i lokalne ulaznice"],
    optionalExcursions: excursions([
      ["Porto Katsiki i Egremni", "Dnevni obilazak najpoznatijih plaža ostrva.", 32, "EUR"],
      ["Nidri by night", "Večernji izlazak i lagani lokalni obilazak.", 12, "EUR"],
    ]),
    accommodation: accommodation(
      "Nidri",
      "Studiji u zoni promenade",
      "Najam / bez usluge",
      "Mock smeštaj je definisan kao praktična baza za korisnike kojima je važan direktan pristup obali i večernjoj šetnji.",
      ["Klima", "Wi-Fi", "Promenada u blizini", "Frižider"],
      destinationMap.get("lefkada")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: true,
    popular: true,
  }),
  packageRecord({
    id: "AT-DEMO-004",
    catalogNumber: 4,
    slug: "krf-ostrvo-maslina-i-tvrdjava",
    title: "Krf — ostrvo maslina i tvrđava",
    destinationSlug: "krf",
    destination: "Krf",
    country: "Grčka",
    countrySlug: "grcka",
    category: "summer",
    shortDescription: "Kraći avionski letnji boravak sa fokusom na brz izbor termina i cenu od.",
    description:
      "Krf u ovom sistemu demonstrira kako ista booking logika radi i za avio letovanja: selected termin, cena po osobi i napomena o deci ostaju u prvom planu.",
    durationDays: 8,
    nights: 7,
    transportType: "plane",
    departurePoint: "Transfer i detalji leta potvrđuje agent.",
    baggageNote: "Ručni i čekirani prtljag zavise od avio-kompanije i tarife.",
    practicalNotes: [
      "Avionski detalji su deo demo scenarija i nisu produkciona potvrda.",
      "Cena se odnosi na odraslu osobu po izabranom terminu.",
      "Agent potvrđuje transfer i finalnu satnicu.",
    ],
    departures: [
      departure("AT-DEMO-004", "2026-08-22", "2026-08-29", 529, "EUR", "available"),
      departure("AT-DEMO-004", "2026-09-12", "2026-09-19", 499, "EUR", "available"),
      departure("AT-DEMO-004", "2026-09-26", "2026-10-03", 479, "EUR", "limited", {
        remainingSpots: 8,
      }),
    ],
    itinerary: summerPlaneItinerary("Krf"),
    included: [...transportIncluded("plane"), "Boravak prema programu", "Organizacija demo upita"],
    excluded: [...transportExcluded("plane"), "Dodatni prtljag i doplate koje nisu eksplicitno navedene"],
    optionalExcursions: excursions([
      ["Stari grad Krfa", "Poludnevni obilazak istorijskog jezgra.", 26, "EUR"],
      ["Paleokastrica", "Obalni izlet sa više foto stajanja.", 31, "EUR"],
    ]),
    accommodation: accommodation(
      "Krf",
      "Hotelski mix severnog dela ostrva",
      "Noćenje sa doručkom",
      "Ilustrativni hotelski izbor postavljen je da pokaže kako se avio program razlikuje po ritmu, ali ne i po jasnoći podataka.",
      ["Doručak", "Recepcija", "Wi-Fi", "Bazen ili blizina obale"],
      destinationMap.get("krf")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-005",
    catalogNumber: 5,
    slug: "hanioti-sopstveni-prevoz",
    title: "Hanioti — sopstveni prevoz",
    destinationSlug: "hanioti",
    destination: "Hanioti",
    country: "Grčka",
    countrySlug: "grcka",
    category: "summer",
    shortDescription: "Samostalni dolazak i desetodnevni boravak za korisnike koji planiraju sopstveni ritam.",
    description:
      "Hanioti pokazuje kako se isti dizajn i booking mehanika prilagođavaju aranžmanu sa sopstvenim prevozom, bez gubljenja čitljivosti oko termina i informativne cene.",
    durationDays: 10,
    nights: 9,
    transportType: "self",
    departurePoint: "Korisnik organizuje dolazak; agent potvrđuje prijem termina i smeštajni raspored.",
    baggageNote: "Putnik samostalno organizuje prevoz i raspored prtljaga.",
    practicalNotes: [
      "Sopstveni prevoz ne menja logiku izbora termina ni obračuna po odrasloj osobi.",
      "Mesto dolaska i check-in detalji potvrđuju se uz odgovor agenta.",
      "Upit nije potvrđena rezervacija.",
    ],
    departures: [
      departure("AT-DEMO-005", "2026-07-25", "2026-08-03", 319, "EUR", "available"),
      departure("AT-DEMO-005", "2026-08-04", "2026-08-13", 339, "EUR", "available"),
      departure("AT-DEMO-005", "2026-09-01", "2026-09-10", 269, "EUR", "available"),
    ],
    itinerary: selfDriveSummerItinerary("Hanioti"),
    included: [...transportIncluded("self"), "Boravak prema programu", "Osnovni demo pregled termina"],
    excluded: [...transportExcluded("self"), "Transferi i lokalne takse gde nisu navedeni kao uključeni"],
    optionalExcursions: excursions([
      ["Kassandra obilazak", "Lagani obilazak poluostrva i više obalnih tačaka.", 24, "EUR"],
    ]),
    accommodation: accommodation(
      "Hanioti",
      "Apartmanski boravak blizu centra",
      "Najam / bez usluge",
      "Mock smeštaj predstavlja tipičan letnji scenario za korisnike koji dolaze automobilom i žele jasne datume boravka.",
      ["Wi-Fi", "Kuhinja", "Balkon", "Plaža na kratkoj šetnji"],
      destinationMap.get("hanioti")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-006",
    catalogNumber: 6,
    slug: "tasos-limenas",
    title: "Tasos — Limenas",
    destinationSlug: "tasos",
    destination: "Tasos",
    country: "Grčka",
    countrySlug: "grcka",
    category: "summer",
    shortDescription: "Autobusko letovanje sa jednim popunjenim terminom i jasno vidljivim sold-out ponašanjem.",
    description:
      "Tasos je u setu namerno dobio popunjen termin kako bi kartica, katalog i detail stranica pokazali da sold-out ostaje vidljiv, ali nije selectable niti ulazi u početnu cenu.",
    durationDays: 11,
    nights: 9,
    transportType: "bus",
    departurePoint: "Mesto i vreme polaska potvrđuje agent.",
    baggageNote: "Autobuska organizacija i prtljag potvrđuju se po terminu.",
    practicalNotes: [
      "Jedan termin je popunjen radi demonstracije disabled stanja.",
      "Početna cena ignoriše popunjeni termin.",
      "Agent potvrđuje konačan raspored polaska.",
    ],
    departures: [
      departure("AT-DEMO-006", "2026-07-30", "2026-08-09", 249, "EUR", "available"),
      departure("AT-DEMO-006", "2026-08-12", "2026-08-22", 259, "EUR", "sold-out"),
      departure("AT-DEMO-006", "2026-09-06", "2026-09-16", 219, "EUR", "available"),
    ],
    itinerary: summerBusItinerary("Tasos"),
    included: [...transportIncluded("bus"), "Boravak prema programu", "Demo podrška za izbor termina"],
    excluded: [...transportExcluded("bus"), "Boravišne takse i individualni troškovi"],
    optionalExcursions: excursions([
      ["Mermerna obala", "Kraći izlet do popularnih vidikovaca i obale.", 22, "EUR"],
    ]),
    accommodation: accommodation(
      "Limenas",
      "Studiji u zoni luke",
      "Najam / bez usluge",
      "Ilustrativni smeštaj postavljen je da podrži autobuski ritam putovanja i preglednost termina u septembru.",
      ["Wi-Fi", "Mini kuhinja", "Luka u blizini", "Klima uređaj"],
      destinationMap.get("tasos")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-007",
    catalogNumber: 7,
    slug: "istanbul-grad-na-dva-kontinenta",
    title: "Istanbul — grad na dva kontinenta",
    destinationSlug: "istanbul",
    destination: "Istanbul",
    country: "Turska",
    countrySlug: "turska",
    category: "city-break",
    shortDescription: "Petodnevni gradski polasci sa nižom ulaznom cenom i jasnim jesenjim datumima.",
    description:
      "Istanbul je jedan od ključnih city break aranžmana u sistemu: korisnik odmah vidi da može da izabere termin, broj putnika i pošalje strukturiran demo upit sa svim potrebnim podacima.",
    durationDays: 5,
    nights: 3,
    transportType: "bus",
    departurePoint: "Mesto i vreme polaska potvrđuje agent.",
    baggageNote: "Autobuski raspored i veličina prtljaga potvrđuju se po terminu.",
    practicalNotes: [
      "Gradski aranžman koristi iste booking kontrole kao letovanja.",
      "Sve cene su informativne i važe po odrasloj osobi.",
      "Upit agentu nije automatska potvrda rezervacije.",
    ],
    departures: [
      departure("AT-DEMO-007", "2026-10-08", "2026-10-12", 189, "EUR", "available"),
      departure("AT-DEMO-007", "2026-11-05", "2026-11-09", 179, "EUR", "available"),
      departure("AT-DEMO-007", "2027-03-18", "2027-03-22", 189, "EUR", "available"),
    ],
    itinerary: cityBreakItinerary("Istanbul"),
    included: [...transportIncluded("bus"), "2 ili 3 organizovana sadržajna bloka prema programu", "Boravak prema programu"],
    excluded: [...transportExcluded("bus"), "Lične ulaznice i dodatni obroci"],
    optionalExcursions: excursions([
      ["Bosphorus cruise", "Kraći obilazak sa pogledom na gradsku siluetu.", 19, "EUR"],
      ["Večernji Taksim i Galata", "Lagani obilazak urbanih četvrti uz vodiča.", 17, "EUR"],
    ]),
    accommodation: accommodation(
      "Istanbul",
      "Gradski hotel u zoni prevoza",
      "Noćenje sa doručkom",
      "Mock hotel služi kao neutralna baza za city break ritam i lak pristup programu.",
      ["Doručak", "Wi-Fi", "Recepcija", "Metro ili tramvaj u blizini"],
      destinationMap.get("istanbul")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: true,
    popular: true,
  }),
  packageRecord({
    id: "AT-DEMO-008",
    catalogNumber: 8,
    slug: "nova-godina-u-istanbulu",
    title: "Nova godina u Istanbulu",
    destinationSlug: "istanbul",
    destination: "Istanbul",
    country: "Turska",
    countrySlug: "turska",
    category: "new-year",
    shortDescription: "Praznični termini sa unapred poznatim datumima i odvojenom sezonskom logikom.",
    description:
      "Nova godina u Istanbulu je zaseban praznični scenario u kojem se vidi kako isti interfejs radi i za sezonsku ponudu sa limitiranim brojem polazaka.",
    durationDays: 5,
    nights: 3,
    transportType: "bus",
    departurePoint: "Mesto i vreme polaska potvrđuje agent.",
    baggageNote: "Praznični raspored i prtljag potvrđuju se u odgovoru agenta.",
    practicalNotes: [
      "Praznični termini su mock i služe za demonstraciju sezonskog ritma.",
      "Broj mesta je informativan i ne predstavlja produkcionu raspoloživost.",
      "Izbor termina i dalje menja sažetak upita i obračun.",
    ],
    departures: [
      departure("AT-DEMO-008", "2026-12-29", "2027-01-02", 249, "EUR", "limited", {
        remainingSpots: 7,
      }),
      departure("AT-DEMO-008", "2026-12-30", "2027-01-03", 269, "EUR", "available"),
    ],
    itinerary: cityBreakItinerary("Istanbul", "Povratak nakon prazničnog programa"),
    included: [...transportIncluded("bus"), "Boravak prema programu", "Praznična struktura obilazaka"],
    excluded: [...transportExcluded("bus"), "Individualni novogodišnji sadržaji i doplate"],
    optionalExcursions: excursions([
      ["Novogodišnja panoramska vožnja", "Večernji gradski obilazak uz vodiča.", 21, "EUR"],
    ]),
    accommodation: accommodation(
      "Istanbul",
      "Gradski hotel za praznični boravak",
      "Noćenje sa doručkom",
      "Ilustrativna praznična baza sa fokusom na dobar pristup centru i večernjim šetnjama.",
      ["Doručak", "Wi-Fi", "Recepcija", "Blizina centra"],
      destinationMap.get("istanbul")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-009",
    catalogNumber: 9,
    slug: "kapadokija-i-istanbul",
    title: "Kapadokija i Istanbul",
    destinationSlug: "kapadokija",
    destination: "Kapadokija",
    country: "Turska",
    countrySlug: "turska",
    category: "europe",
    shortDescription: "Avionski višednevni program koji kombinuje grad i teritorijalno putovanje.",
    description:
      "Kapadokija i Istanbul donose duži aranžman u kom putnik mora da razume i raspored po danima i odnos između cene od, trajanja i sledećeg polaska.",
    durationDays: 8,
    nights: 6,
    transportType: "plane",
    departurePoint: "Detalji avio-prevoza i transfera potvrđuju se uz odgovor agenta.",
    baggageNote: "Paket prtljaga zavisi od konačne tarife i operatera.",
    practicalNotes: [
      "Aranžman je mock i služi za prikaz kombinovanog programa.",
      "Cena se vezuje za izabrani termin i odraslu osobu.",
      "Agent potvrđuje finalni red letenja i transfera.",
    ],
    departures: [
      departure("AT-DEMO-009", "2026-09-27", "2026-10-04", 799, "EUR", "available"),
      departure("AT-DEMO-009", "2026-10-18", "2026-10-25", 769, "EUR", "available"),
    ],
    itinerary: europeTourItinerary("Kapadokija i Istanbul", [
      "Let i dolazak u Istanbul",
      "Stari grad i panoramski pregled",
      "Transfer ka Kapadokiji",
      "Dolina i kameni gradovi",
      "Slobodan dan ili dodatni program",
      "Povratak u Istanbul",
      "Završni gradski dan",
      "Povratni let",
    ]),
    included: [...transportIncluded("plane"), "Transferi između ključnih tačaka programa", "Boravak prema programu"],
    excluded: [...transportExcluded("plane"), "Lokalni dodatni sadržaji i ulaznice gde nisu navedeni"],
    optionalExcursions: excursions([
      ["Jutarnji panorama program", "Rani odlazak na vidikovac i foto tačke.", 39, "EUR"],
      ["Večernji Bosfor", "Lagani završni gradski izlazak.", 24, "EUR"],
    ]),
    accommodation: accommodation(
      "Istanbul i Kapadokija",
      "Hotelski mix prema programu",
      "Noćenje sa doručkom",
      "Mock smeštaj je raspoređen između urbanog i teritorijalnog dela ture kako bi itinerary ostao razumljiv.",
      ["Doručak", "Wi-Fi", "Transfer prema programu", "Recepcija"],
      destinationMap.get("kapadokija")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
    new: true,
  }),
  packageRecord({
    id: "AT-DEMO-010",
    catalogNumber: 10,
    slug: "atina-grad-i-rt-sunion",
    title: "Atina — grad i rt Sunion",
    destinationSlug: "atina",
    destination: "Atina",
    country: "Grčka",
    countrySlug: "grcka",
    category: "city-break",
    shortDescription: "Petodnevni avionski program sa jasnim prolećnim i jesenjim terminima.",
    description:
      "Atina u ovom demou nije generički city break: aranžman se ponaša kao jasna putna tabla sa datumom, trajanjem i početnom cenom koji direktno vode u inquiry flow.",
    durationDays: 5,
    nights: 4,
    transportType: "plane",
    departurePoint: "Detalji leta i transfera potvrđuju se uz odgovor agenta.",
    baggageNote: "Tarifa i prtljag zavise od odabranog leta.",
    practicalNotes: [
      "Program i cene su mock i služe za demonstraciju proizvoda.",
      "Cena za decu nije uključena u zbir.",
      "Izabrani termin automatski ulazi u sažetak upita.",
    ],
    departures: [
      departure("AT-DEMO-010", "2026-10-15", "2026-10-19", 429, "EUR", "available"),
      departure("AT-DEMO-010", "2027-03-11", "2027-03-15", 399, "EUR", "available"),
      departure("AT-DEMO-010", "2027-04-22", "2027-04-26", 439, "EUR", "available"),
    ],
    itinerary: cityBreakItinerary("Atina"),
    included: [...transportIncluded("plane"), "Boravak prema programu", "Jedan organizovani gradski blok prema itineraru"],
    excluded: [...transportExcluded("plane"), "Dodatne ulaznice i privatni programi"],
    optionalExcursions: excursions([
      ["Rt Sunion", "Popodnevni izlazak do obale i hrama sa panoramskim pogledom.", 29, "EUR"],
    ]),
    accommodation: accommodation(
      "Atina",
      "Gradski hotel u zoni javnog prevoza",
      "Noćenje sa doručkom",
      "Ilustrativni gradski hotel omogućava da detail stranica ostane fokusirana na termin, cenu i program po danima.",
      ["Doručak", "Wi-Fi", "Recepcija", "Dobra gradska veza"],
      destinationMap.get("atina")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-011",
    catalogNumber: 11,
    slug: "budimpesta-vikend-na-dunavu",
    title: "Budimpešta — vikend na Dunavu",
    destinationSlug: "budimpesta",
    destination: "Budimpešta",
    country: "Mađarska",
    countrySlug: "madjarska",
    category: "city-break",
    shortDescription: "Kompaktan vikend aranžman sa nižim cenama i jasnim jesenjim ciklusom polazaka.",
    description:
      "Budimpešta u sistemu služi kao jasan, pristupačniji gradski aranžman koji pomaže testiranje sortiranja po najnižoj ceni i sledećem dostupnom polasku.",
    durationDays: 4,
    nights: 2,
    transportType: "bus",
    departurePoint: "Mesto i vreme polaska potvrđuje agent.",
    baggageNote: "Autobuska organizacija prtljaga potvrđuje se pred polazak.",
    practicalNotes: [
      "Price filter i sortiranje rade i na ovim nižim city break cenama.",
      "Prikazani termini nisu produkciona dostupnost.",
      "Status termina i selected stanje ostaju isti kao na letovanjima.",
    ],
    departures: [
      departure("AT-DEMO-011", "2026-09-25", "2026-09-28", 129, "EUR", "available"),
      departure("AT-DEMO-011", "2026-11-06", "2026-11-09", 139, "EUR", "available"),
      departure("AT-DEMO-011", "2026-12-11", "2026-12-14", 159, "EUR", "available"),
    ],
    itinerary: itineraryFromTitles(
      ["Polazak", "Grad uz Dunav", "Slobodan blok ili dodatni program", "Povratak"],
      "Budimpešta je brzi vikend program za lako poređenje cena.",
      "Budimpešta",
      "vikend"
    ),
    included: [...transportIncluded("bus"), "Boravak prema programu"],
    excluded: [...transportExcluded("bus"), "Ulaznice za dodatne sadržaje"],
    optionalExcursions: excursions([
      ["Večernji Dunav", "Kraći panoramski izlazak kroz centar grada.", 16, "EUR"],
    ]),
    accommodation: accommodation(
      "Budimpešta",
      "Centralni gradski hotel",
      "Noćenje sa doručkom",
      "Mock hotel je izabran da podrži vikend ritam i kratko zadržavanje u centru.",
      ["Doručak", "Wi-Fi", "Recepcija", "Centar grada"],
      destinationMap.get("budimpesta")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-012",
    catalogNumber: 12,
    slug: "bec-i-bratislava",
    title: "Beč i Bratislava",
    destinationSlug: "bec",
    destination: "Beč",
    country: "Austrija",
    countrySlug: "austrija",
    category: "europe",
    shortDescription: "Dvogradski vikend sa autobuskim prevozom i jasnim novembarskim i decembarskim terminima.",
    description:
      "Beč i Bratislava pokazuju kako jedan aranžman može objediniti više gradova, a da kartica i detail stranica ostanu pregledni i fokusirani na polazak, trajanje i cenu.",
    durationDays: 4,
    nights: 2,
    transportType: "bus",
    departurePoint: "Mesto i vreme polaska potvrđuje agent.",
    baggageNote: "Prtljag i satnica potvrđuju se u odgovoru agenta.",
    practicalNotes: [
      "Jedan aranžman može obuhvatiti više gradova bez gubitka preglednosti.",
      "Selected termin i obračun funkcionišu isto kao i kod ostalih aranžmana.",
      "Agent potvrđuje finalni raspored obilazaka.",
    ],
    departures: [
      departure("AT-DEMO-012", "2026-10-02", "2026-10-05", 149, "EUR", "available"),
      departure("AT-DEMO-012", "2026-11-20", "2026-11-23", 159, "EUR", "available"),
      departure("AT-DEMO-012", "2026-12-18", "2026-12-21", 179, "EUR", "limited", {
        remainingSpots: 8,
      }),
    ],
    itinerary: itineraryFromTitles(
      ["Polazak", "Beč", "Bratislava", "Povratak"],
      "Dvogradski program zadržava jasnu strukturu po danima.",
      "Centralna Evropa",
      "kombinovani"
    ),
    included: [...transportIncluded("bus"), "Boravak prema programu"],
    excluded: [...transportExcluded("bus"), "Dodatne ulaznice i privatni obilasci"],
    optionalExcursions: excursions([
      ["Noćna šetnja Bečom", "Kratki gradski izlazak uz vodiča.", 14, "EUR"],
    ]),
    accommodation: accommodation(
      "Beč",
      "Gradski hotel za dvogradski program",
      "Noćenje sa doručkom",
      "Ilustrativni hotelski smeštaj prati kompaktnu logiku vikend polaska.",
      ["Doručak", "Wi-Fi", "Recepcija", "Gradki prevoz u blizini"],
      destinationMap.get("bec")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-013",
    catalogNumber: 13,
    slug: "prag-stari-grad-i-vltava",
    title: "Prag — stari grad i Vltava",
    destinationSlug: "prag",
    destination: "Prag",
    country: "Češka",
    countrySlug: "ceska",
    category: "city-break",
    shortDescription: "Jesenji gradski polasci sa dinamičnim odnosom trajanja, cene i prevoza.",
    description:
      "Prag u sistem uvodi još jedan izrazito skenirljiv city break: pet dana, autobus, nekoliko termina i pregledan inquiry kontekst bez skrivanja bitnih podataka.",
    durationDays: 5,
    nights: 3,
    transportType: "bus",
    departurePoint: "Mesto i vreme polaska potvrđuje agent.",
    baggageNote: "Autobuski raspored i prtljag potvrđuju se po terminu.",
    practicalNotes: [
      "Prag demonstrira pregledan odnos između trajanja, noćenja i cene.",
      "Izbor termina menja summary i inquiry formu.",
      "Agent potvrđuje konačne detalje rute.",
    ],
    departures: [
      departure("AT-DEMO-013", "2026-10-14", "2026-10-18", 189, "EUR", "available"),
      departure("AT-DEMO-013", "2026-11-11", "2026-11-15", 179, "EUR", "available"),
      departure("AT-DEMO-013", "2026-12-09", "2026-12-13", 209, "EUR", "available"),
    ],
    itinerary: cityBreakItinerary("Prag"),
    included: [...transportIncluded("bus"), "Boravak prema programu"],
    excluded: [...transportExcluded("bus"), "Dodatni sadržaji i ulaznice"],
    optionalExcursions: excursions([
      ["Večernja Vltava", "Lagani večernji izlazak kroz centralnu zonu.", 15, "EUR"],
    ]),
    accommodation: accommodation(
      "Prag",
      "Hotel uz stari gradski pojas",
      "Noćenje sa doručkom",
      "Mock hotel je postavljen kao gradska baza sa jednostavnom logistikom polaska i povratka.",
      ["Doručak", "Wi-Fi", "Recepcija", "Javni prevoz u blizini"],
      destinationMap.get("prag")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-014",
    catalogNumber: 14,
    slug: "rim-cetiri-dana-grada",
    title: "Rim — četiri dana grada",
    destinationSlug: "rim",
    destination: "Rim",
    country: "Italija",
    countrySlug: "italija",
    category: "city-break",
    shortDescription: "Avionski city break sa većim budžetom i jasnom vezom između termina i cene od.",
    description:
      "Rim kao featured city break treba da deluje uređeno i prodajno: editorial fotografija, jasni datumi i booking panel u formi putnog lista daju korisniku brz osećaj odluke.",
    durationDays: 5,
    nights: 4,
    transportType: "plane",
    departurePoint: "Detalji leta potvrđuje agent.",
    baggageNote: "Tarifa i prtljag zavise od potvrđenog leta.",
    practicalNotes: [
      "Avionski termini služe demonstraciji kalendara i informativne cene.",
      "Prikaz nije produkciona ponuda niti potvrda raspoloživosti.",
      "Cena za decu se naknadno potvrđuje.",
    ],
    departures: [
      departure("AT-DEMO-014", "2026-10-21", "2026-10-25", 569, "EUR", "available"),
      departure("AT-DEMO-014", "2026-11-18", "2026-11-22", 529, "EUR", "available"),
      departure("AT-DEMO-014", "2027-03-24", "2027-03-28", 549, "EUR", "available"),
    ],
    itinerary: cityBreakItinerary("Rim"),
    included: [...transportIncluded("plane"), "Boravak prema programu", "Jedan organizovani gradski sadržaj"],
    excluded: [...transportExcluded("plane"), "Lične ulaznice, doplate i dodatni programi"],
    optionalExcursions: excursions([
      ["Večernji trgovi Rima", "Kratki obilazak centralnih trgova i ulica.", 23, "EUR"],
    ]),
    accommodation: accommodation(
      "Rim",
      "Gradski hotel u istorijskoj zoni",
      "Noćenje sa doručkom",
      "Ilustrativni hotel podržava city break ritam i fokus na dnevni itinerary.",
      ["Doručak", "Wi-Fi", "Recepcija", "Dobra veza sa centrom"],
      destinationMap.get("rim")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: true,
  }),
  packageRecord({
    id: "AT-DEMO-015",
    catalogNumber: 15,
    slug: "toskana-firenca-sijena-i-piza",
    title: "Toskana — Firenca, Sijena i Piza",
    destinationSlug: "toskana",
    destination: "Toskana",
    country: "Italija",
    countrySlug: "italija",
    category: "europe",
    shortDescription: "Šestodnevni autobuski program sa više gradova i preglednim oktobarskim terminima.",
    description:
      "Toskana u ovom sistemu služi kao duži evropski program u kojem itinerary i cene moraju da ostanu podjednako pregledni kao na kraćim city break polascima.",
    durationDays: 6,
    nights: 4,
    transportType: "bus",
    departurePoint: "Mesto i vreme polaska potvrđuje agent.",
    baggageNote: "Prtljag i satnica potvrđuju se po terminu.",
    practicalNotes: [
      "Više gradova ne menja logiku selected termina i upita.",
      "Program je mock i ne predstavlja potvrđenu rutu.",
      "Cena se odnosi na odraslu osobu po izabranom terminu.",
    ],
    departures: [
      departure("AT-DEMO-015", "2026-09-29", "2026-10-04", 329, "EUR", "available"),
      departure("AT-DEMO-015", "2026-10-20", "2026-10-25", 319, "EUR", "available"),
    ],
    itinerary: europeTourItinerary("Toskana", [
      "Polazak",
      "Dolazak i Firenca",
      "Sijena i lokalni ritam",
      "Piza i slobodno vreme",
      "Završni obilazak",
      "Povratak",
    ]),
    included: [...transportIncluded("bus"), "Boravak prema programu"],
    excluded: [...transportExcluded("bus"), "Dodatni ulazi i individualni sadržaji"],
    optionalExcursions: excursions([
      ["Toskanski vidikovci", "Kraći dodatni izlazak ka panoramskim tačkama.", 18, "EUR"],
    ]),
    accommodation: accommodation(
      "Toskana",
      "Hotelski mix prema turi",
      "Noćenje sa doručkom",
      "Mock smeštaj je raspoređen tako da podrži višegradsku strukturu programa.",
      ["Doručak", "Wi-Fi", "Recepcija", "Autobuski pristup programu"],
      destinationMap.get("toskana")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-016",
    catalogNumber: 16,
    slug: "pariz-gradski-program",
    title: "Pariz — gradski program",
    destinationSlug: "pariz",
    destination: "Pariz",
    country: "Francuska",
    countrySlug: "francuska",
    category: "city-break",
    shortDescription: "Šestodnevni avio program sa višim cenovnim razredom i prolećnim nastavkom termina.",
    description:
      "Pariz je postavljen kao skuplji, ali i dalje veoma čitljiv city break u kome price-ledger i inquiry flow moraju ostati jednako jasni kao i kod pristupačnijih aranžmana.",
    durationDays: 6,
    nights: 5,
    transportType: "plane",
    departurePoint: "Detalji leta i transfera potvrđuju se uz odgovor agenta.",
    baggageNote: "Pravila prtljaga zavise od finalne avio-komponente.",
    practicalNotes: [
      "Katalog koristi ove cene za demonstraciju raspona višeg budžeta.",
      "Prikazani termini nisu produkciona dostupnost.",
      "Konačne uslove i raspored potvrđuje agent.",
    ],
    departures: [
      departure("AT-DEMO-016", "2026-11-03", "2026-11-08", 699, "EUR", "available"),
      departure("AT-DEMO-016", "2026-12-01", "2026-12-06", 749, "EUR", "available"),
      departure("AT-DEMO-016", "2027-04-06", "2027-04-11", 719, "EUR", "available"),
    ],
    itinerary: itineraryFromTitles(
      ["Let i dolazak", "Centralni Pariz", "Muzeji ili slobodan dan", "Ritam grada", "Završni obilazak", "Povratni let"],
      "Pariz zadržava jasan šestodnevni raspored sa fokusom na preglednost.",
      "Pariz",
      "urbani"
    ),
    included: [...transportIncluded("plane"), "Boravak prema programu"],
    excluded: [...transportExcluded("plane"), "Ulaznice i dodatni gradski sadržaji"],
    optionalExcursions: excursions([
      ["Večernji Pariz", "Kratka šetnja i panoramski izlazak kroz centralne tačke.", 28, "EUR"],
    ]),
    accommodation: accommodation(
      "Pariz",
      "Gradski hotel sa metro vezom",
      "Noćenje sa doručkom",
      "Ilustrativni smeštaj podržava gradsku logistiku i uredan raspored po danima.",
      ["Doručak", "Wi-Fi", "Recepcija", "Metro u blizini"],
      destinationMap.get("pariz")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-017",
    catalogNumber: 17,
    slug: "barselona-arhitektura-i-mediteran",
    title: "Barselona — arhitektura i Mediteran",
    destinationSlug: "barselona",
    destination: "Barselona",
    country: "Španija",
    countrySlug: "spanija",
    category: "city-break",
    shortDescription: "Avionski gradski program sa toplijim mediteranskim tonom i označenim novim aranžmanom.",
    description:
      "Barselona u portfoliju nosi oznaku novog aranžmana i pomaže da kartica podrži i status i dugačak naslov bez gubitka jasne cene, prevoza i sledećeg polaska.",
    durationDays: 5,
    nights: 4,
    transportType: "plane",
    departurePoint: "Detalji leta potvrđuju se uz odgovor agenta.",
    baggageNote: "Tarifa i dozvoljeni prtljag zavise od konačne avio opcije.",
    practicalNotes: [
      "Oznaka Novo ne menja booking logiku ni cenu.",
      "Sve prikazane vrednosti su demo i informativne.",
      "Izbor termina puni inquiry summary bez ručnog unosa.",
    ],
    departures: [
      departure("AT-DEMO-017", "2026-10-10", "2026-10-14", 579, "EUR", "available"),
      departure("AT-DEMO-017", "2026-11-14", "2026-11-18", 549, "EUR", "available"),
      departure("AT-DEMO-017", "2027-03-06", "2027-03-10", 559, "EUR", "available"),
    ],
    itinerary: cityBreakItinerary("Barselona"),
    included: [...transportIncluded("plane"), "Boravak prema programu"],
    excluded: [...transportExcluded("plane"), "Ulaznice i dodatne gradske aktivnosti"],
    optionalExcursions: excursions([
      ["Večernji gotski kvart", "Lagani obilazak gradskih ulica i trgova.", 24, "EUR"],
    ]),
    accommodation: accommodation(
      "Barselona",
      "Gradski hotel blizu centralnih zona",
      "Noćenje sa doručkom",
      "Mock hotel podržava gradski ritam i preglednu logistiku kratkog boravka.",
      ["Doručak", "Wi-Fi", "Recepcija", "Centar ili metro zona"],
      destinationMap.get("barselona")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
    new: true,
  }),
  packageRecord({
    id: "AT-DEMO-018",
    catalogNumber: 18,
    slug: "hurghada-crveno-more",
    title: "Hurghada — Crveno more",
    destinationSlug: "hurghada",
    destination: "Hurghada",
    country: "Egipat",
    countrySlug: "egipat",
    category: "long-haul",
    shortDescription: "Avionski boravak sa izraženim last minute scenarijem i višim cenovnim rasponom.",
    description:
      "Hurghada je jedan od ključnih last minute aranžmana u demou. Korisnik može da vidi prethodnu cenu, novu cenu, procenat sniženja i realan izbor termina bez lažne hitnosti.",
    durationDays: 8,
    nights: 7,
    transportType: "plane",
    departurePoint: "Detalji leta i transfera potvrđuje agent.",
    baggageNote: "Tarifa i prtljag zavise od odabranog avio-paketa.",
    practicalNotes: [
      "Last minute procenat se računa iz previousPrice i nove cene.",
      "Status Još 9 mesta je mock i služi demonstraciji UI-ja.",
      "Cena za decu nije uključena u procenu.",
    ],
    departures: [
      departure("AT-DEMO-018", "2026-08-28", "2026-09-04", 629, "EUR", "limited", {
        previousPrice: 699,
        remainingSpots: 9,
        isLastMinute: true,
      }),
      departure("AT-DEMO-018", "2026-09-18", "2026-09-25", 649, "EUR", "available"),
      departure("AT-DEMO-018", "2026-10-09", "2026-10-16", 619, "EUR", "available"),
    ],
    itinerary: longHaulItinerary("Hurghada"),
    included: [...transportIncluded("plane"), "Boravak prema programu", "Resort-logika aranžmana"],
    excluded: [...transportExcluded("plane"), "Lični troškovi, napojnice i dodatni resort sadržaji"],
    optionalExcursions: excursions([
      ["Crveno more snorkel", "Informativni izlet brodom sa stajanjem za kupanje.", 42, "EUR"],
      ["Pustinjski izlazak", "Kraći terenski program van osnovne cene.", 38, "EUR"],
    ]),
    accommodation: accommodation(
      "Hurghada",
      "Resort boravak uz more",
      "All inclusive / mock",
      "Ilustrativni resort služi da booking panel i za duži avionski odmor ostane pregledan i nenametljiv.",
      ["All inclusive", "Bazen", "Wi-Fi", "Plaža"],
      destinationMap.get("hurghada")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: true,
    popular: true,
  }),
  packageRecord({
    id: "AT-DEMO-019",
    catalogNumber: 19,
    slug: "tunis-i-djerba",
    title: "Tunis i Đerba",
    destinationSlug: "djerba",
    destination: "Đerba",
    country: "Tunis",
    countrySlug: "tunis",
    category: "long-haul",
    shortDescription: "Severna Afrika sa izraženim last minute redom i jesenjim avion-scenarijem.",
    description:
      "Tunis i Đerba dopunjuju last minute stranicu još jednim avionskim programom sa vidljivom starom i novom cenom, bez countdown manipulacije i lažnog urgency-ja.",
    durationDays: 8,
    nights: 7,
    transportType: "plane",
    departurePoint: "Detalji leta potvrđuju se uz odgovor agenta.",
    baggageNote: "Paket prtljaga i satnica transfera potvrđuju se po terminu.",
    practicalNotes: [
      "Last minute cena je informativna i vezana za izabrani termin.",
      "Broj mesta je mock podatak za demonstraciju statusne logike.",
      "Upit agentu ne garantuje rezervaciju.",
    ],
    departures: [
      departure("AT-DEMO-019", "2026-08-31", "2026-09-07", 599, "EUR", "limited", {
        previousPrice: 679,
        remainingSpots: 5,
        isLastMinute: true,
      }),
      departure("AT-DEMO-019", "2026-09-14", "2026-09-21", 619, "EUR", "available"),
      departure("AT-DEMO-019", "2026-09-28", "2026-10-05", 579, "EUR", "available"),
    ],
    itinerary: longHaulItinerary("Đerba"),
    included: [...transportIncluded("plane"), "Boravak prema programu"],
    excluded: [...transportExcluded("plane"), "Lični troškovi i dodatni izleti"],
    optionalExcursions: excursions([
      ["Medina i sever ostrva", "Informativni program kroz lokalne četvrti i obalu.", 33, "EUR"],
    ]),
    accommodation: accommodation(
      "Đerba",
      "Resort boravak na ostrvu",
      "Polupansion / mock",
      "Mock smeštaj služi za demonstraciju dužeg avio boravka i povezane informativne cene.",
      ["Polupansion", "Wi-Fi", "Plaža", "Recepcija"],
      destinationMap.get("djerba")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-020",
    catalogNumber: 20,
    slug: "zlatibor-i-mokra-gora-vikend",
    title: "Zlatibor i Mokra Gora — vikend",
    destinationSlug: "zlatibor",
    destination: "Zlatibor",
    country: "Srbija",
    countrySlug: "srbija",
    category: "excursion",
    shortDescription: "Domaći vikend izlet u RSD koji testira viševalutni katalog i kraći itinerary.",
    description:
      "Zlatibor i Mokra Gora su važni za data model jer uvode RSD u katalog, ali i dalje koriste istu logiku polazaka, selected termina i informativnog obračuna.",
    durationDays: 3,
    nights: 2,
    transportType: "bus",
    departurePoint: "Mesto i vreme polaska potvrđuje agent.",
    baggageNote: "Autobuski raspored i prtljag potvrđuju se po terminu.",
    practicalNotes: [
      "RSD termin služi tehničkoj demonstraciji filtera i sortiranja.",
      "Konverzija u EUR koristi se samo interno za poređenje u katalogu.",
      "Korisniku se prikazuje originalna valuta bez skrivene konverzije.",
    ],
    departures: [
      departure("AT-DEMO-020", "2026-09-18", "2026-09-20", 15900, "RSD", "available"),
      departure("AT-DEMO-020", "2026-10-16", "2026-10-18", 16900, "RSD", "available"),
      departure("AT-DEMO-020", "2026-11-13", "2026-11-15", 15900, "RSD", "available"),
    ],
    itinerary: excursionItinerary("Zlatibor i Mokra Gora"),
    included: [...transportIncluded("bus"), "Boravak prema programu"],
    excluded: [...transportExcluded("bus"), "Individualni troškovi tokom kraćih stajanja"],
    optionalExcursions: excursions([
      ["Vožnja Šarganskom osmicom", "Informativni železnički program prema raspoloživosti.", 1200, "RSD"],
    ]),
    accommodation: accommodation(
      "Zlatibor",
      "Hotelski vikend boravak",
      "Noćenje sa doručkom",
      "Ilustrativni vikend smeštaj korišćen je da pokaže kako sistem radi sa RSD cenama i kraćim programom.",
      ["Doručak", "Wi-Fi", "Recepcija", "Centralna lokacija"],
      destinationMap.get("zlatibor")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
  }),
  packageRecord({
    id: "AT-DEMO-021",
    catalogNumber: 21,
    slug: "kopaonik-zimski-odmor",
    title: "Kopaonik — zimski odmor",
    destinationSlug: "kopaonik",
    destination: "Kopaonik",
    country: "Srbija",
    countrySlug: "srbija",
    category: "winter",
    shortDescription: "Zimski aranžman sa sopstvenim dolaskom i proverenim selected/summary ponašanjem.",
    description:
      "Kopaonik je zimski edge case za ceo sajt: nema autobuskog ili avionskog transfera, ali korisnik i dalje bira termin, broj putnika i priprema demo upit sa istim signalima.",
    durationDays: 5,
    nights: 4,
    transportType: "self",
    departurePoint: "Dolazak sopstvenim prevozom; agent potvrđuje check-in detalje.",
    baggageNote: "Putnik organizuje sopstveni prevoz i opremu.",
    practicalNotes: [
      "Sopstveni dolazak ne menja obračun ni selected termin.",
      "Prikazani termini su demo podaci.",
      "Konačne zimske uslove i raspored potvrđuje agent.",
    ],
    departures: [
      departure("AT-DEMO-021", "2027-01-10", "2027-01-14", 289, "EUR", "available"),
      departure("AT-DEMO-021", "2027-02-07", "2027-02-11", 309, "EUR", "available"),
      departure("AT-DEMO-021", "2027-03-07", "2027-03-11", 279, "EUR", "available"),
    ],
    itinerary: winterItinerary("Kopaonik"),
    included: [...transportIncluded("self"), "Boravak prema programu"],
    excluded: [...transportExcluded("self"), "Ski-pass, oprema i dodatne planinske aktivnosti"],
    optionalExcursions: excursions([
      ["Panoramski izlazak do vidikovca", "Lagani planinski obilazak prema uslovima na terenu.", 18, "EUR"],
    ]),
    accommodation: accommodation(
      "Kopaonik",
      "Planinski apart-hotel",
      "Noćenje sa doručkom",
      "Mock planinski smeštaj koristi se za demonstraciju zimskog booking toka i jasnih pravila za putnike.",
      ["Doručak", "Wi-Fi", "Skijašnica / mock", "Parking"],
      destinationMap.get("kopaonik")?.gallery ?? [],
    ),
    childPricing: "agent-confirmation",
    featured: false,
    new: true,
  }),
];

validateTravelPackages(travelPackages);
