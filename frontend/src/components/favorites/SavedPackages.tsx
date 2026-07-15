import { useEffect, useMemo, useState } from "react";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import type { TravelPackage } from "@/types/travel";
import { sanitizeSavedPackageIds } from "@/utils/favorites";
import {
  getCatalogLabel,
  getNextAvailableDeparture,
  getPackageStartingPrice,
  getStatusBadge,
  getTransportLabel,
} from "@/utils/packages";
import { formatTravelDateCompact } from "@/utils/dates";
import { formatMoney } from "@/utils/pricing";

type SavedPackagesProps = {
  packages: TravelPackage[];
};

export default function SavedPackages({ packages }: SavedPackagesProps) {
  const validIds = useMemo(() => packages.map((item) => item.id), [packages]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const update = () => setSavedIds(sanitizeSavedPackageIds(validIds));

    update();
    window.addEventListener("storage", update);
    window.addEventListener("favorites:change", update as EventListener);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("favorites:change", update as EventListener);
    };
  }, [validIds]);

  const savedPackages = packages.filter((item) => savedIds.includes(item.id));

  if (savedPackages.length === 0) {
    return (
      <div className="empty-state">
        <h2>Još niste sačuvali nijedan aranžman.</h2>
        <p>Pogledajte katalog i sačuvajte aranžmane koje želite da uporedite kasnije.</p>
        <a className="button button--primary" href="/aranzmani">
          Pogledaj aranžmane
        </a>
      </div>
    );
  }

  return (
    <div className="package-grid">
      {savedPackages.map((item) => {
        const nextDeparture = getNextAvailableDeparture(item);
        const starting = getPackageStartingPrice(item);
        const status = getStatusBadge(item);

        return (
          <article className="package-card" key={item.id}>
            <div className="package-card__media">
              <img
                src={item.images[0]}
                alt={item.destination}
                width="960"
                height="720"
                loading="lazy"
              />
              <div className="package-card__topline">
                <span className="catalog-chip">{getCatalogLabel(item.catalogNumber)}</span>
                {status ? <span className="status-chip">{status}</span> : null}
              </div>
              <FavoriteButton packageId={item.id} packageTitle={item.title} />
            </div>
            <a className="package-card__body" href={`/aranzmani/${item.slug}`}>
              <p className="package-card__place">
                {item.destination} / {item.country}
              </p>
              <h3>{item.title}</h3>
              <div className="package-card__meta">
                <span>{item.durationDays} dana / {item.nights} noćenja</span>
                <span>{getTransportLabel(item.transportType)}</span>
              </div>
              <div className="package-card__departure-line">
                <span>Sledeći polazak</span>
                <strong>{nextDeparture ? formatTravelDateCompact(nextDeparture.startDate) : "Nema termina"}</strong>
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
      })}
    </div>
  );
}
