import type { AgencyData } from "@/types/travel";

export const agency: AgencyData = {
  name: "Aldi Travel",
  fullName: "Turistička agencija Aldi Travel",
  slogan: "Zajedno kreiramo uspomene",
  city: "Leskovac",
  logoPath: "/logo.png",
  notice:
    "Koncept sajta — prikazani aranžmani, termini i cene služe za demonstraciju sistema.",
  phones: [
    {
      value: "016/260-947",
      verification: "provided-unverified",
      note: "Broj je iz briefa i javnih profila; produkciono potvrditi primarni kontakt.",
    },
    {
      value: "066-54-11777",
      verification: "provided-unverified",
      note: "Broj je iz briefa i javnih profila; produkciono potvrditi format i redosled.",
    },
  ],
  email: {
    value: "upit.alditravel@gmail.com",
    verification: "provided-unverified",
    note: "Email je iz briefa i traži finalnu produkcionu proveru.",
  },
  social: [
    {
      label: "Instagram",
      value: "@alditravel",
      href: "https://www.instagram.com/alditravel/",
      verification: "provided-unverified",
      note: "Canonical URL potvrđen u briefu.",
    },
    {
      label: "Facebook",
      value: "Turistička Agencija Aldi Travel",
      href: "https://www.facebook.com/alditravel/",
      verification: "provided-unverified",
      note: "Canonical URL potvrđen u briefu.",
    },
    {
      label: "TikTok",
      value: "aldi_travel",
      verification: "provided-unverified",
      note: "Naziv profila je poznat, ali klikabilni URL nije potvrđen.",
    },
  ],
};
