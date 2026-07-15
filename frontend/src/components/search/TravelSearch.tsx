import { useMemo, useState, type ComponentProps } from "react";
import type { TravelPackage } from "@/types/travel";
import { getTravelerSummary } from "@/utils/filters";
import { formatTravelMonth } from "@/utils/dates";

type TravelSearchProps = {
  packages: TravelPackage[];
};

type FormSubmitEvent = Parameters<NonNullable<ComponentProps<"form">["onSubmit"]>>[0];

export default function TravelSearch({ packages }: TravelSearchProps) {
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [travelerOpen, setTravelerOpen] = useState(false);

  const options = useMemo(() => {
    const destinations = Array.from(new Set(packages.map((item) => item.destination))).sort();
    const countries = Array.from(new Set(packages.map((item) => item.country))).sort();
    const months = Array.from(
      new Set(packages.flatMap((item) => item.departures.map((departure) => departure.startDate.slice(0, 7)))),
    ).sort();

    return { destinations, countries, months };
  }, [packages]);

  function updateCount(field: "adults" | "children", delta: number) {
    if (field === "adults") {
      setAdults((value) => Math.min(9, Math.max(1, value + delta)));
      return;
    }

    setChildren((value) => Math.min(6, Math.max(0, value + delta)));
  }

  function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    const params = new URLSearchParams();

    const trimmed = destination.trim();
    if (trimmed) {
      const matchedCountry = options.countries.find(
        (item) => item.toLocaleLowerCase("sr-Latn-RS") === trimmed.toLocaleLowerCase("sr-Latn-RS"),
      );

      if (matchedCountry) {
        params.set("country", matchedCountry);
      } else {
        params.set("destination", trimmed);
      }
    }

    if (month) params.set("month", month);
    if (adults !== 2) params.set("adults", String(adults));
    if (children !== 0) params.set("children", String(children));

    window.location.assign(`/aranzmani${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form className="travel-search" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="hero-destination">Destinacija ili država</label>
        <input
          id="hero-destination"
          name="destination"
          list="travel-search-options"
          placeholder="Gde želite da putujete?"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
        <datalist id="travel-search-options">
          {options.destinations.map((item) => (
            <option key={item} value={item} />
          ))}
          {options.countries.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </div>

      <div className="field">
        <label htmlFor="hero-month">Mesec putovanja</label>
        <select id="hero-month" name="month" value={month} onChange={(event) => setMonth(event.target.value)}>
          <option value="">Svi meseci</option>
          {options.months.map((item) => (
            <option key={item} value={item}>
              {formatTravelMonth(item)}
            </option>
          ))}
        </select>
      </div>

      <div className="field traveler-popover">
        <label htmlFor="hero-travelers">Odrasli i deca</label>
        <button
          id="hero-travelers"
          type="button"
          className="traveler-trigger"
          aria-expanded={travelerOpen}
          onClick={() => setTravelerOpen((value) => !value)}
        >
          <span>{getTravelerSummary(adults, children)}</span>
          <span aria-hidden="true">+</span>
        </button>
        {travelerOpen ? (
          <div className="traveler-popover__panel" role="dialog" aria-label="Izbor putnika">
            <div className="traveler-stepper">
              <div>
                <strong>Odrasli</strong>
                <p>Minimum 1, maksimum 9</p>
              </div>
              <div className="traveler-stepper__controls">
                <button type="button" aria-label="Smanji broj odraslih" onClick={() => updateCount("adults", -1)}>
                  −
                </button>
                <strong>{adults}</strong>
                <button type="button" aria-label="Povećaj broj odraslih" onClick={() => updateCount("adults", 1)}>
                  +
                </button>
              </div>
            </div>
            <div className="traveler-stepper">
              <div>
                <strong>Deca</strong>
                <p>Minimum 0, maksimum 6</p>
              </div>
              <div className="traveler-stepper__controls">
                <button type="button" aria-label="Smanji broj dece" onClick={() => updateCount("children", -1)}>
                  −
                </button>
                <strong>{children}</strong>
                <button type="button" aria-label="Povećaj broj dece" onClick={() => updateCount("children", 1)}>
                  +
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <button className="button button--primary" type="submit">
        Pronađi aranžmane
      </button>
    </form>
  );
}
