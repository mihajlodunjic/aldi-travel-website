import type { Destination } from "@/types/travel";

const greekBeach =
  "https://images.unsplash.com/photo-1557353212-adb233ad2181?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=55&w=1600";
const greekHarbor =
  "https://images.goway.com/production/styles/hero_s1_3xl/s3/hero_image/Sunny_summer_landscape_with_rocky_island._iStock-865108736.jpg.webp?VersionId=lh7_axpzC5NpeislbLGhpuveP7rlt01U&h=43fc81ba&itok=EhdrktnG";
const athensAcropolis =
  "https://images.unsplash.com/photo-1656677476414-d6b18ba0ad73?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=55&w=1600";
const istanbulBosphorus =
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==&ixlib=rb-4.1.0&q=55&w=1600";
const istanbulHistoric =
  "https://images.unsplash.com/photo-1570852006699-e4f82b34d3f7?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=55&w=1600";
const budapestParliament =
  "https://images.unsplash.com/photo-1698657792682-48f73d9d0b8c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=55&w=1600";
const viennaStreet =
  "https://images.unsplash.com/photo-1573167443175-867d91708f97?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=55&w=1600";
const romeStreet =
  "https://images.unsplash.com/photo-1634633112235-2d46212c60f7?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=55&w=1600";
const parisStreet =
  "https://images.unsplash.com/photo-1752167079765-f805684f1a91?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=55&w=1600";

export const destinations: Destination[] = [
  {
    slug: "parga",
    name: "Parga",
    country: "Grčka",
    countrySlug: "grcka",
    label: "Parga / Grčka",
    intro: "Jonska luka sa gradskim ritmom, plažama i preglednim autobuskim polascima.",
    editorial:
      "Parga u ovom demou služi kao tipična Aldi Travel letnja baza: luka, gradska šetnja, šarene fasade i termini koji se lako porede po datumu, prevozu i ceni.",
    heroImage: greekHarbor,
    gallery: [greekHarbor, greekBeach, athensAcropolis],
    alt: [
      "Pogled na grčku obalu sa belim kućama i stenovitim ostrvom.",
      "Tirkizna uvala i svetla peščana obala.",
      "Gradski kadar sa toplim mediteranskim svetlom.",
    ],
    sourceType: "mock",
  },
  {
    slug: "evija",
    name: "Evija",
    country: "Grčka",
    countrySlug: "grcka",
    label: "Evija / Grčka",
    intro: "Sever ostrva sa mirnijim ritmom i preglednim kasnoletnjim terminima.",
    editorial:
      "Evija je predstavljena kroz obalni pejzaž i klasičnu strukturu letovanja gde korisnik najpre poredi datume, pa tek onda prati smeštaj i program.",
    heroImage: greekBeach,
    gallery: [greekBeach, greekHarbor, athensAcropolis],
    alt: [
      "Plaža i tirkizna obala u Jonskom moru.",
      "Sunčana mediteranska luka sa belim kućama.",
      "Širi kadar grčke urbane obale.",
    ],
    sourceType: "mock",
  },
  {
    slug: "lefkada",
    name: "Lefkada",
    country: "Grčka",
    countrySlug: "grcka",
    label: "Lefkada / Grčka",
    intro: "Lefkada donosi veliki kontrast između plaža, luka i kasnoletnjih polazaka.",
    editorial:
      "U katalogu se Lefkada koristi da pokaže kako fotografija privlači pažnju, ali odluka nastaje tek kada se uz nju pojave termin, prevoz i cena po osobi.",
    heroImage: greekBeach,
    gallery: [greekBeach, greekHarbor, athensAcropolis],
    alt: [
      "Dramatična uvala Lefkade sa svetlim stenama.",
      "Obalni kadar grčke luke u podnevnom svetlu.",
      "Širi grčki pejzaž kao dopunski kadar galerije.",
    ],
    sourceType: "mock",
  },
  {
    slug: "krf",
    name: "Krf",
    country: "Grčka",
    countrySlug: "grcka",
    label: "Krf / Grčka",
    intro: "Ostrvo sa gradskim tvrđavama i kraćim avionskim letnjim boravkom.",
    editorial:
      "Krf je zamišljen kao avionska grčka destinacija u kojoj su i cena i sledeći polazak vidljivi visoko u kompoziciji, a ne skriveni u opisu.",
    heroImage: greekHarbor,
    gallery: [greekHarbor, greekBeach, athensAcropolis],
    alt: [
      "Jonska obala sa kućama i stenovitim horizontom.",
      "Mirna plaža i tirkizno more.",
      "Grad i mediteranski reljef u toplom svetlu.",
    ],
    sourceType: "mock",
  },
  {
    slug: "hanioti",
    name: "Hanioti",
    country: "Grčka",
    countrySlug: "grcka",
    label: "Hanioti / Grčka",
    intro: "Samostalni dolazak i duži boravak fokusiran na ritam dana, a ne na transfer.",
    editorial:
      "Hanioti je koristan edge case u portfoliju jer isti vizuelni sistem mora da radi i za sopstveni prevoz, bez gubitka jasnoće oko termina i informativne cene.",
    heroImage: greekHarbor,
    gallery: [greekHarbor, greekBeach, athensAcropolis],
    alt: [
      "Luka sa mirnim morem i belim fasadama.",
      "Peščana obala i jonske nijanse mora.",
      "Grčki gradski kadar kao ilustrativna dopuna.",
    ],
    sourceType: "mock",
  },
  {
    slug: "tasos",
    name: "Tasos",
    country: "Grčka",
    countrySlug: "grcka",
    label: "Tasos / Grčka",
    intro: "Ostrvska luka i borovi kao vizuelni kontekst za autobusko letovanje.",
    editorial:
      "Tasos u ovom demou nosi ritam kataloškog prikaza: sledeći polazak, status termina i početna cena ostaju glavni elementi skeniranja.",
    heroImage: greekHarbor,
    gallery: [greekHarbor, greekBeach, athensAcropolis],
    alt: [
      "Primorski gradić sa terakota krovovima i morem.",
      "Mediteranska plaža pod stenama.",
      "Širi kontekst grčkog obalnog grada.",
    ],
    sourceType: "mock",
  },
  {
    slug: "istanbul",
    name: "Istanbul",
    country: "Turska",
    countrySlug: "turska",
    label: "Istanbul / Turska",
    intro: "Grad za kraće autobuske i praznične polaske, sa jakim fokusom na datum i cenu.",
    editorial:
      "Istanbul je jedna od ključnih destinacija za city break ritam sajta: korisnik odmah vidi trajanje, sledeći polazak i informativni obračun bez oslanjanja na dugačak tekst.",
    heroImage: istanbulBosphorus,
    gallery: [istanbulBosphorus, istanbulHistoric, athensAcropolis],
    alt: [
      "Ortakoj džamija i Bosfor pri sutonu.",
      "Pogled na istorijsko jezgro Istanbula u večernjem svetlu.",
      "Širi gradski kadar sa dominantnim istorijskim slojem.",
    ],
    sourceType: "mock",
  },
  {
    slug: "kapadokija",
    name: "Kapadokija",
    country: "Turska",
    countrySlug: "turska",
    label: "Kapadokija / Turska",
    intro: "Višednevni program sa kombinacijom leta, grada i terenskog obilaska.",
    editorial:
      "Kapadokija u portfoliju uvodi duži aranžman gde fotografija i itinerary rade zajedno: destinacija mora da deluje posebna, ali termini i pregled cene ostaju jasni.",
    heroImage: istanbulHistoric,
    gallery: [istanbulHistoric, istanbulBosphorus, athensAcropolis],
    alt: [
      "Večernji pogled na gradsku siluetu i obalu.",
      "Refleksija Bosfora u sumrak.",
      "Dopunski panoramski kadar za višednevni program.",
    ],
    sourceType: "mock",
  },
  {
    slug: "atina",
    name: "Atina",
    country: "Grčka",
    countrySlug: "grcka",
    label: "Atina / Grčka",
    intro: "Gradski polasci sa kratkim boravkom i naglaskom na dostupne datume.",
    editorial:
      "Atina pokazuje kako detail stranica radi i kada destinacija nije morska baza: vizuelni identitet i dalje koristi cenu, datum i program kao glavne alate odluke.",
    heroImage: athensAcropolis,
    gallery: [athensAcropolis, greekHarbor, istanbulHistoric],
    alt: [
      "Akropolj iz vazduha pri zalasku sunca.",
      "Obalni kadar kao dopunski grčki kontekst.",
      "Večernji panoramski kadar grada.",
    ],
    sourceType: "mock",
  },
  {
    slug: "budimpesta",
    name: "Budimpešta",
    country: "Mađarska",
    countrySlug: "madjarska",
    label: "Budimpešta / Mađarska",
    intro: "Vikend na Dunavu sa kompaktnim autobuskim terminima i nižim ulaznim cenama.",
    editorial:
      "Budimpešta daje centralnoevropski ton katalogu: mono datum, kratko trajanje i niža cena po osobi odmah se porede sa drugim gradskim polascima.",
    heroImage: budapestParliament,
    gallery: [budapestParliament, viennaStreet, romeStreet],
    alt: [
      "Osvetljeni parlament uz Dunav noću.",
      "Pešačka ulica u Beču kao regionalni kontekst.",
      "Topla ulična scena kao dopunski kadar.",
    ],
    sourceType: "mock",
  },
  {
    slug: "bec",
    name: "Beč",
    country: "Austrija",
    countrySlug: "austrija",
    label: "Beč / Austrija",
    intro: "Kombinovani program sa jasnim rasporedom dana i stabilnim jesenjim polascima.",
    editorial:
      "Beč i Bratislava rade kao urednički indeks evropskih gradova: putnik upoređuje kratko trajanje, autobuski prevoz i početnu cenu bez vizuelnog šuma.",
    heroImage: viennaStreet,
    gallery: [viennaStreet, budapestParliament, romeStreet],
    alt: [
      "Topla večernja ulica u centru Beča.",
      "Reka i osvetljena gradska arhitektura u regionu.",
      "Stari evropski kvart kao dopunski kadar.",
    ],
    sourceType: "mock",
  },
  {
    slug: "prag",
    name: "Prag",
    country: "Češka",
    countrySlug: "ceska",
    label: "Prag / Češka",
    intro: "Stari grad i Vltava u kompaktnom gradskom programu za jesenje polaske.",
    editorial:
      "Prag zadržava isti sistem odlučivanja kao i ostali city break aranžmani: korisnik najpre vidi sledeći termin, onda pregled programa po danima.",
    heroImage: budapestParliament,
    gallery: [budapestParliament, viennaStreet, romeStreet],
    alt: [
      "Noćni kadar istorijske arhitekture uz reku.",
      "Centralnoevropska ulična scena sa pešacima.",
      "Kameni pločnik i uske fasade starog grada.",
    ],
    sourceType: "mock",
  },
  {
    slug: "rim",
    name: "Rim",
    country: "Italija",
    countrySlug: "italija",
    label: "Rim / Italija",
    intro: "Kraći avionski polazak gde arhitektura i tempo grada nose veći deo iskustva.",
    editorial:
      "Rim je zamišljen kao detaljna city break stranica sa snažnim programom po danima, dok booking panel ostaje numerički i pregledan.",
    heroImage: romeStreet,
    gallery: [romeStreet, parisStreet, viennaStreet],
    alt: [
      "Rimska ulica sa visokim fasadama i kamenim pločnikom.",
      "Pariski kadar kao ilustracija evropskog urbanog ritma.",
      "Pešačka ulica i izlozi u večernjem svetlu.",
    ],
    sourceType: "mock",
  },
  {
    slug: "toskana",
    name: "Toskana",
    country: "Italija",
    countrySlug: "italija",
    label: "Toskana / Italija",
    intro: "Više gradova i pejzaža u jednom programu, sa jasnom razlikom između dužine i noćenja.",
    editorial:
      "Toskana je korisna za duže autobuske ture: itinerary mora da ostane čitljiv i miran, bez gubljenja osnovnih prodajnih podataka.",
    heroImage: romeStreet,
    gallery: [romeStreet, parisStreet, greekHarbor],
    alt: [
      "Stari italijanski kvart kao uvodni kadar programa.",
      "Urbani evropski kadar u zlatnom svetlu.",
      "Pejzažni mediteranski kadar za smenu ritma galerije.",
    ],
    sourceType: "mock",
  },
  {
    slug: "pariz",
    name: "Pariz",
    country: "Francuska",
    countrySlug: "francuska",
    label: "Pariz / Francuska",
    intro: "Avionski gradski program sa većim budžetom i visokim značajem tačnih termina.",
    editorial:
      "Pariz uvodi skuplji city break u katalog, pa je važno da cena od, trajanje i prvi polazak ostanu čitljivi i uporedivi sa ostalim aranžmanima.",
    heroImage: parisStreet,
    gallery: [parisStreet, viennaStreet, romeStreet],
    alt: [
      "Ajfelov toranj između klasičnih pariskih fasada.",
      "Široka pešačka zona sa osvetljenim izlozima.",
      "Uska ulica sa toplim tonovima i starim zgradama.",
    ],
    sourceType: "mock",
  },
  {
    slug: "barselona",
    name: "Barselona",
    country: "Španija",
    countrySlug: "spanija",
    label: "Barselona / Španija",
    intro: "Mediteranski grad sa avionskim terminima i naglašenim arhitektonskim identitetom.",
    editorial:
      "Barselona se u demou oslanja na isti katalog ritam kao Pariz i Rim, ali sa toplijim bojama i većim fokusom na gradski puls uz obalu.",
    heroImage: parisStreet,
    gallery: [parisStreet, romeStreet, viennaStreet],
    alt: [
      "Evropski gradski kadar sa istorijskim fasadama.",
      "Uska ulica sa kamenim pločnikom i toplim zidovima.",
      "Pešačka zona pod večernjim svetlom.",
    ],
    sourceType: "mock",
  },
  {
    slug: "hurghada",
    name: "Hurghada",
    country: "Egipat",
    countrySlug: "egipat",
    label: "Hurghada / Egipat",
    intro: "Toplija destinacija sa avionom, dužim boravkom i last minute potencijalom.",
    editorial:
      "Hurghada je u portfoliju zadužena da pokaže kako long-haul aranžman zadržava isti booking sistem: termin, cena po odrasloj osobi i napomena za decu ostaju centralni.",
    heroImage: greekBeach,
    gallery: [greekBeach, greekHarbor, parisStreet],
    alt: [
      "Tirkizna obala i svetla plaža.",
      "Sunčani kadar luke i hotela uz more.",
      "Širi gradski kadar kao dopunska ilustracija.",
    ],
    sourceType: "mock",
  },
  {
    slug: "djerba",
    name: "Đerba",
    country: "Tunis",
    countrySlug: "tunis",
    label: "Đerba / Tunis",
    intro: "Severna Afrika u mirnijem ritmu, sa nekoliko jesenjih aviopolazaka.",
    editorial:
      "Đerba je postavljena kao alternativni mediteranski scenario u kojem katalog i dalje najpre rešava pitanje datuma i početne cene, pa tek onda inspiracije destinacijom.",
    heroImage: greekHarbor,
    gallery: [greekHarbor, greekBeach, parisStreet],
    alt: [
      "Mirna obala i mediteranske kuće.",
      "Plaža i jasno more pod stenama.",
      "Urbani kadar kao kontrast detaljima programa.",
    ],
    sourceType: "mock",
  },
  {
    slug: "zlatibor",
    name: "Zlatibor",
    country: "Srbija",
    countrySlug: "srbija",
    label: "Zlatibor / Srbija",
    intro: "Kraći domaći izlet sa cenom u RSD i kompaktnim autobuskim polascima.",
    editorial:
      "Zlatibor uvodi drugu valutu u sistem i zbog toga je važan za filtere, sortiranje i informativni obračun koji mora ostati tehnički konzistentan.",
    heroImage: athensAcropolis,
    gallery: [athensAcropolis, greekHarbor, romeStreet],
    alt: [
      "Panoramski kadar pejzaža sa toplim svetlom.",
      "Dopunski kadar prirodnog okruženja i naselja.",
      "Stari urbanistički detalj kao ritmička smena galerije.",
    ],
    sourceType: "mock",
  },
  {
    slug: "kopaonik",
    name: "Kopaonik",
    country: "Srbija",
    countrySlug: "srbija",
    label: "Kopaonik / Srbija",
    intro: "Zimski aranžman koji testira kako sistem radi i za sopstveni dolazak i za hladniji sezonjski kontekst.",
    editorial:
      "Kopaonik je u ovom demou tu da potvrdi da booking experience nije vezan samo za more i leto: selected termin, broj putnika i informativna cena ostaju isti proizvodni jezik.",
    heroImage: budapestParliament,
    gallery: [budapestParliament, athensAcropolis, viennaStreet],
    alt: [
      "Planinski panoramski kadar sa hladnijim tonovima.",
      "Širi pejzažni kadar kao ilustrativna dopuna.",
      "Gradski kontrast za urednički ritam galerije.",
    ],
    sourceType: "mock",
  },
];

export const destinationMap = new Map(destinations.map((destination) => [destination.slug, destination]));
