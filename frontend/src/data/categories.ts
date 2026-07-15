import type { CategoryDefinition } from "@/types/travel";

export const categories: CategoryDefinition[] = [
  {
    id: "summer",
    index: "01",
    label: "Letovanje",
    href: "/aranzmani?category=summer",
    description: "Obala, ostrva i gradske baze za duži boravak na moru.",
  },
  {
    id: "city-break",
    index: "02",
    label: "City break",
    href: "/aranzmani?category=city-break",
    description: "Kraći gradski polasci sa jasnim programom i cenom po osobi.",
  },
  {
    id: "europe",
    index: "03",
    label: "Evropski gradovi",
    href: "/aranzmani?category=europe",
    description: "Kombinovani programi sa više gradova i preglednim terminima.",
  },
  {
    id: "long-haul",
    index: "04",
    label: "Daleke destinacije",
    href: "/aranzmani?category=long-haul",
    description: "Toplije destinacije sa avionskim polascima i dužim boravkom.",
  },
  {
    id: "new-year",
    index: "05",
    label: "Nova godina",
    href: "/aranzmani?category=new-year",
    description: "Praznični termini sa unapred definisanim datumima polaska.",
  },
  {
    id: "excursion",
    index: "06",
    label: "Izleti",
    href: "/aranzmani?category=excursion",
    description: "Kraći programi u regionu sa autobuskim prevozom.",
  },
  {
    id: "winter",
    index: "07",
    label: "Zimovanje",
    href: "/aranzmani?category=winter",
    description: "Zimski boravci sa fleksibilnijim individualnim dolaskom.",
  },
];
