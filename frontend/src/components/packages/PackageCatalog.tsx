import { useEffect, useMemo, useRef, useState } from "react";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import type { PackageFilters, TravelPackage } from "@/types/travel";
import { formatTravelMonth } from "@/utils/dates";
import {
  buildSearchParams,
  defaultFilters,
  filterPackages,
  getFilterOptions,
  getPriceBounds,
  parseFilters,
  sortPackages,
} from "@/utils/filters";
import {
  getCatalogLabel,
  getCategoryLabel,
  getNextAvailableDeparture,
  getPackageStartingPrice,
  getStatusBadge,
  getTransportLabel,
} from "@/utils/packages";
import { formatMoney } from "@/utils/pricing";
import { formatTravelDateCompact } from "@/utils/dates";

type PackageCatalogProps = {
  packages: TravelPackage[];
};

function CatalogCard({ item }: { item: TravelPackage }) {
  const status = getStatusBadge(item);
  const nextDeparture = getNextAvailableDeparture(item);
  const starting = getPackageStartingPrice(item);

  return (
    <article className="package-card">
      <div className="package-card__media">
        <img src={item.images[0]} alt={item.destination} width="960" height="720" loading="lazy" />
        <div className="package-card__topline">
          <span className="catalog-chip">{getCatalogLabel(item.catalogNumber)}</span>
          {status ? <span className="status-chip">{status}</span> : null}
        </div>
        <FavoriteButton packageId={item.id} packageTitle={item.title} />
      </div>
      <a className="package-card__body" href={`/aranzmani/${item.slug}`}>
        <p className="package-card__place">{item.destination} / {item.country}</p>
        <h3>{item.title}</h3>
        <div className="package-card__meta">
          <span>{item.durationDays} dana / {item.nights} noćenja</span>
          <span>{getTransportLabel(item.transportType)}</span>
        </div>
        <div className="package-card__departure-line">
          <span>Sledeći polazak</span>
          <strong>{nextDeparture ? formatTravelDateCompact(nextDeparture.startDate) : "Nema dostupnog termina"}</strong>
        </div>
        <div className="package-card__price">
          {starting ? (
            <>
              <span className="package-card__price-label">od</span>
              <strong>{formatMoney(starting.pricePerPerson, starting.currency)}</strong>
              <span>po osobi</span>
            </>
          ) : (
            <strong>Cena na upit</strong>
          )}
        </div>
      </a>
    </article>
  );
}

export default function PackageCatalog({ packages }: PackageCatalogProps) {
  const options = useMemo(() => getFilterOptions(packages), [packages]);
  const priceBounds = useMemo(() => getPriceBounds(packages), [packages]);
  const [filters, setFilters] = useState<PackageFilters>(defaultFilters);
  const [draftFilters, setDraftFilters] = useState<PackageFilters>(defaultFilters);
  const [mobileOpen, setMobileOpen] = useState(false);
  const initialLoadRef = useRef(true);
  const skipHistoryRef = useRef(false);

  useEffect(() => {
    const next = parseFilters(new URLSearchParams(window.location.search));
    setFilters(next);
    setDraftFilters(next);
    initialLoadRef.current = false;

    const handlePopState = () => {
      skipHistoryRef.current = true;
      const state = parseFilters(new URLSearchParams(window.location.search));
      setFilters(state);
      setDraftFilters(state);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (initialLoadRef.current) return;
    if (skipHistoryRef.current) {
      skipHistoryRef.current = false;
      return;
    }

    const query = buildSearchParams(filters);
    const nextUrl = `/aranzmani${query ? `?${query}` : ""}`;
    window.history.pushState({}, "", nextUrl);
  }, [filters]);

  const filtered = useMemo(() => sortPackages(filterPackages(packages, filters), filters.sort), [filters, packages]);

  function updateFilters(nextPartial: Partial<PackageFilters>) {
    setFilters((current) => ({ ...current, ...nextPartial }));
  }

  function updateDraft(nextPartial: Partial<PackageFilters>) {
    setDraftFilters((current) => ({ ...current, ...nextPartial }));
  }

  function resetAll() {
    setFilters(defaultFilters);
    setDraftFilters(defaultFilters);
  }

  const chips = [
    filters.destination && { key: "destination", label: filters.destination },
    filters.country && { key: "country", label: filters.country },
    filters.month && { key: "month", label: formatTravelMonth(filters.month) },
    filters.category && { key: "category", label: getCategoryLabel(filters.category as TravelPackage["category"]) },
    filters.transport && { key: "transport", label: getTransportLabel(filters.transport as TravelPackage["transportType"]) },
    typeof filters.minPrice === "number" && { key: "minPrice", label: `od ${filters.minPrice}` },
    typeof filters.maxPrice === "number" && { key: "maxPrice", label: `do ${filters.maxPrice}` },
  ].filter(Boolean) as Array<{ key: keyof PackageFilters; label: string }>;

  function removeChip(key: keyof PackageFilters) {
    updateFilters({
      [key]:
        key === "adults"
          ? defaultFilters.adults
          : key === "children"
            ? defaultFilters.children
            : key === "sort"
              ? defaultFilters.sort
              : key === "minPrice" || key === "maxPrice"
                ? null
                : "",
    } as Partial<PackageFilters>);
  }

  const FilterFields = ({
    state,
    onChange,
  }: {
    state: PackageFilters;
    onChange: (next: Partial<PackageFilters>) => void;
  }) => (
    <>
      <div className="field">
        <label htmlFor="catalog-destination">Destinacija</label>
        <input
          id="catalog-destination"
          value={state.destination}
          onChange={(event) => onChange({ destination: event.target.value })}
          list="catalog-destinations"
          placeholder="Parga, Istanbul, Grčka..."
        />
        <datalist id="catalog-destinations">
          {options.destinations.map((item) => <option key={item} value={item} />)}
          {options.countries.map((item) => <option key={item} value={item} />)}
        </datalist>
      </div>
      {options.countries.length > 1 ? (
        <div className="field">
          <label htmlFor="catalog-country">Država</label>
          <select id="catalog-country" value={state.country} onChange={(event) => onChange({ country: event.target.value })}>
            <option value="">Sve države</option>
            {options.countries.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      ) : null}
      <div className="field">
        <label htmlFor="catalog-month">Mesec</label>
        <select id="catalog-month" value={state.month} onChange={(event) => onChange({ month: event.target.value })}>
          <option value="">Svi meseci</option>
          {options.months.map((item) => <option key={item} value={item}>{formatTravelMonth(item)}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="catalog-category">Vrsta putovanja</label>
        <select id="catalog-category" value={state.category} onChange={(event) => onChange({ category: event.target.value })}>
          <option value="">Sve kategorije</option>
          {options.categories.map((item) => <option key={item} value={item}>{getCategoryLabel(item)}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="catalog-transport">Prevoz</label>
        <select id="catalog-transport" value={state.transport} onChange={(event) => onChange({ transport: event.target.value })}>
          <option value="">Sve opcije</option>
          {options.transports.map((item) => <option key={item} value={item}>{getTransportLabel(item)}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="catalog-min-price">Uporedna cena od</label>
        <input
          id="catalog-min-price"
          type="number"
          min={priceBounds.min}
          max={priceBounds.max}
          value={state.minPrice ?? ""}
          onChange={(event) => onChange({ minPrice: event.target.value ? Number(event.target.value) : null })}
        />
      </div>
      <div className="field">
        <label htmlFor="catalog-max-price">Uporedna cena do</label>
        <input
          id="catalog-max-price"
          type="number"
          min={priceBounds.min}
          max={priceBounds.max}
          value={state.maxPrice ?? ""}
          onChange={(event) => onChange({ maxPrice: event.target.value ? Number(event.target.value) : null })}
        />
      </div>
    </>
  );

  return (
    <div className="catalog-shell">
      <aside className="catalog-sidebar">
        <FilterFields state={filters} onChange={updateFilters} />
        <button className="button button--secondary" type="button" onClick={resetAll}>
          Resetuj filtere
        </button>
      </aside>

      <div className="catalog-main">
        <div className="catalog-toolbar">
          <div>
            <strong>{filtered.length} aranžmana</strong>
            <p>Skenirajte ponudu po terminu, ceni, vrsti i načinu prevoza.</p>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button className="button button--secondary mobile-filter-button" type="button" onClick={() => setMobileOpen(true)}>
              Filteri
            </button>
            <div className="field" style={{ minWidth: "220px" }}>
              <label htmlFor="catalog-sort">Sortiranje</label>
              <select id="catalog-sort" value={filters.sort} onChange={(event) => updateFilters({ sort: event.target.value as PackageFilters["sort"] })}>
                <option value="recommended">Preporučeno</option>
                <option value="price-asc">Najniža cena</option>
                <option value="price-desc">Najviša cena</option>
                <option value="departure-asc">Najskoriji polazak</option>
              </select>
            </div>
          </div>
        </div>

        {chips.length > 0 ? (
          <div className="filter-chip-row">
            {chips.map((chip) => (
              <button key={chip.key} className="filter-chip" type="button" onClick={() => removeChip(chip.key)}>
                <span>{chip.label}</span>
                <strong>×</strong>
              </button>
            ))}
            <button className="button button--secondary" type="button" onClick={resetAll}>
              Resetuj sve
            </button>
          </div>
        ) : null}

        {filtered.length > 0 ? (
          <div className="package-grid">
            {filtered.map((item) => <CatalogCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="empty-state">
            <h2>Nema aranžmana koji odgovaraju izabranim filterima.</h2>
            <p>Uklonite neki filter ili pogledajte sve dostupne polaske.</p>
            <button className="button button--primary" type="button" onClick={resetAll}>
              Resetuj filtere
            </button>
          </div>
        )}
      </div>

      {mobileOpen ? (
        <div className="filter-backdrop" role="presentation" onClick={() => setMobileOpen(false)}>
          <div className="filter-drawer" role="dialog" aria-modal="true" aria-label="Filteri" onClick={(event) => event.stopPropagation()}>
            <div className="filter-drawer__header">
              <div>
                <h2>Filteri</h2>
                <p>{sortPackages(filterPackages(packages, draftFilters), draftFilters.sort).length} rezultata</p>
              </div>
              <button className="button button--secondary" type="button" onClick={() => setMobileOpen(false)}>
                Zatvori
              </button>
            </div>
            <div className="filter-drawer__body">
              <FilterFields state={draftFilters} onChange={updateDraft} />
            </div>
            <div className="filter-drawer__actions">
              <button className="button button--secondary" type="button" onClick={() => setDraftFilters(defaultFilters)}>
                Resetuj
              </button>
              <button
                className="button button--primary"
                type="button"
                onClick={() => {
                  setFilters(draftFilters);
                  setMobileOpen(false);
                }}
              >
                Prikaži {sortPackages(filterPackages(packages, draftFilters), draftFilters.sort).length} aranžmana
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
