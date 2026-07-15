import { useEffect, useMemo, useRef, useState, type ComponentProps } from "react";
import type { Departure, InquiryFormValues, TravelPackage } from "@/types/travel";
import { formatTravelDate, formatTravelDateCompact } from "@/utils/dates";
import { formatMoney } from "@/utils/pricing";
import { getAvailableDepartures } from "@/utils/packages";
import { validateInquiryForm } from "@/utils/validation";

type BookingExperienceProps = {
  item: TravelPackage;
};

type FormSubmitEvent = Parameters<NonNullable<ComponentProps<"form">["onSubmit"]>>[0];

function getInitialDeparture(item: TravelPackage): Departure | undefined {
  const available = getAvailableDepartures(item);
  if (available.length === 0) return undefined;

  if (typeof window !== "undefined") {
    const requested = new URLSearchParams(window.location.search).get("departure");
    const match = available.find((departure) => departure.id === requested);
    if (match) return match;
  }

  return available[0];
}

export default function BookingExperience({ item }: BookingExperienceProps) {
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const availableDepartures = useMemo(() => getAvailableDepartures(item), [item]);
  const [selectedDeparture, setSelectedDeparture] = useState<Departure | undefined>(getInitialDeparture(item));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<InquiryFormValues>({
    fullName: "",
    email: "",
    phone: "",
    note: "",
  });

  useEffect(() => {
    setSelectedDeparture(getInitialDeparture(item));
  }, [item]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errors]);

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  const estimatedAdultTotal = selectedDeparture ? selectedDeparture.pricePerPerson * adults : 0;
  const soldOutOnly = availableDepartures.length === 0;
  const callToAction = soldOutOnly ? "Pošalji upit o narednim polascima" : "Pošalji upit za rezervaciju";

  function updateTraveler(field: "adults" | "children", delta: number) {
    if (field === "adults") {
      setAdults((value) => Math.max(1, Math.min(9, value + delta)));
      return;
    }

    setChildren((value) => Math.max(0, Math.min(6, value + delta)));
  }

  async function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    const nextErrors = validateInquiryForm(values);

    if (!selectedDeparture && !soldOutOnly) {
      nextErrors.form = "Izaberite dostupan termin pre slanja upita.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="detail-content-grid">
      <div className="detail-content-stack">
        <section className="detail-card">
          <div className="section-header">
            <p className="eyebrow">TERMINI I IZBOR PUTNIKA</p>
            <div className="section-header__copy">
              <h2>Izaberite termin i pripremite upit</h2>
              <p>
                Termin menja cenu po odrasloj osobi, status polaska, informativni zbir i sažetak upita koji šaljete agentu.
              </p>
            </div>
            <div className="double-rule" aria-hidden="true" />
          </div>

          <div className="departure-list" role="radiogroup" aria-label="Dostupni termini">
            {item.departures.map((departure) => {
              const isSelected = selectedDeparture?.id === departure.id;
              const isDisabled = departure.status === "sold-out";
              const statusLabel =
                departure.status === "limited" && departure.remainingSpots
                  ? `Još ${departure.remainingSpots} mesta`
                  : departure.status === "sold-out"
                    ? "Popunjeno"
                    : "Dostupno";

              return (
                <button
                  key={departure.id}
                  type="button"
                  className={`departure-button ${isSelected ? "is-selected" : ""}`}
                  aria-checked={isSelected}
                  role="radio"
                  disabled={isDisabled}
                  onClick={() => setSelectedDeparture(departure)}
                >
                  <div className="departure-button__top">
                    <div>
                      <p className="eyebrow">Polazak</p>
                      <div className="departure-button__date">{formatTravelDateCompact(departure.startDate)}</div>
                    </div>
                    <div>
                      {departure.previousPrice ? <p>{formatMoney(departure.previousPrice, departure.currency)}</p> : null}
                      <strong className="booking-total" style={{ fontSize: "24px" }}>
                        {formatMoney(departure.pricePerPerson, departure.currency)}
                      </strong>
                    </div>
                  </div>
                  <div className="departure-button__meta">
                    <span>Povratak {formatTravelDateCompact(departure.endDate)}</span>
                    <span>{item.durationDays} dana</span>
                    <span>{item.nights} noćenja</span>
                  </div>
                  <span className={`departure-button__status ${departure.status}`}>{statusLabel}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="detail-card traveler-panel">
          <h3>Putnici</h3>
          <div className="traveler-stepper">
            <div>
              <strong>Odrasli</strong>
              <p>Minimum 1</p>
            </div>
            <div className="traveler-stepper__controls">
              <button type="button" aria-label="Smanji broj odraslih" onClick={() => updateTraveler("adults", -1)}>
                −
              </button>
              <strong>{adults}</strong>
              <button type="button" aria-label="Povećaj broj odraslih" onClick={() => updateTraveler("adults", 1)}>
                +
              </button>
            </div>
          </div>
          <div className="traveler-stepper">
            <div>
              <strong>Deca</strong>
              <p>Minimum 0</p>
            </div>
            <div className="traveler-stepper__controls">
              <button type="button" aria-label="Smanji broj dece" onClick={() => updateTraveler("children", -1)}>
                −
              </button>
              <strong>{children}</strong>
              <button type="button" aria-label="Povećaj broj dece" onClick={() => updateTraveler("children", 1)}>
                +
              </button>
            </div>
          </div>
          {children > 0 ? (
            <p className="traveler-summary-note">
              Cena za decu nije uključena u ovu procenu. Konačan iznos potvrđuje agent.
            </p>
          ) : null}
        </section>
      </div>

      <aside className="booking-panel">
        <p className="eyebrow">PUTNI LIST</p>
        <div className="double-rule" aria-hidden="true" />
        <div className="booking-summary">
          <div className="booking-summary__row">
            <span>Aranžman</span>
            <strong>{item.title}</strong>
          </div>
          <div className="booking-summary__row">
            <span>Katalog</span>
            <strong>#{String(item.catalogNumber).padStart(2, "0")}</strong>
          </div>
          <div className="booking-summary__row">
            <span>Izabrani termin</span>
            <strong>{selectedDeparture ? formatTravelDate(selectedDeparture.startDate) : "Agent predlaže naredne polaske"}</strong>
          </div>
          <div className="booking-summary__row">
            <span>Putnici</span>
            <strong>{adults} odrasla / {children} dece</strong>
          </div>
          {selectedDeparture ? (
            <>
              <div className="booking-summary__row">
                <span>Cena po odrasloj osobi</span>
                <strong>{formatMoney(selectedDeparture.pricePerPerson, selectedDeparture.currency)}</strong>
              </div>
              <div className="booking-summary__row">
                <span>Informativna cena</span>
                <strong className="booking-total">{formatMoney(estimatedAdultTotal, selectedDeparture.currency)}</strong>
              </div>
            </>
          ) : null}
        </div>

        <form className="inquiry-panel" onSubmit={handleSubmit}>
          <h3>{callToAction}</h3>

          {Object.keys(errors).length > 0 ? (
            <div ref={errorSummaryRef} className="error-summary" tabIndex={-1}>
              <strong>Forma nije spremna za slanje.</strong>
              <p>{errors.form ?? "Proverite obavezna polja i pokušajte ponovo."}</p>
            </div>
          ) : null}

          {submitted ? (
            <div ref={successRef} className="success-panel" tabIndex={-1}>
              <strong>Demo upit je uspešno pripremljen.</strong>
              <p>Demo upit je uspešno pripremljen, ali nije poslat agenciji. U produkcionoj verziji ovde će biti potvrda prijema upita.</p>
              <p>{item.title} · {selectedDeparture ? formatTravelDate(selectedDeparture.startDate) : "Naredni polasci"} · {item.id}</p>
            </div>
          ) : null}

          <div className="form-grid">
            <div className="field">
              <label htmlFor="booking-name">Ime i prezime</label>
              <input
                id="booking-name"
                value={values.fullName}
                onChange={(event) => setValues((current) => ({ ...current, fullName: event.target.value }))}
              />
              {errors.fullName ? <span className="field__error">{errors.fullName}</span> : null}
            </div>

            <div className="field">
              <label htmlFor="booking-email">Email</label>
              <input
                id="booking-email"
                type="email"
                value={values.email}
                onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
              />
              {errors.email ? <span className="field__error">{errors.email}</span> : null}
            </div>

            <div className="field">
              <label htmlFor="booking-phone">Telefon</label>
              <input
                id="booking-phone"
                value={values.phone}
                onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))}
              />
              {errors.phone ? <span className="field__error">{errors.phone}</span> : null}
            </div>

            <div className="field">
              <label htmlFor="booking-note">Napomena</label>
              <textarea
                id="booking-note"
                value={values.note}
                onChange={(event) => setValues((current) => ({ ...current, note: event.target.value }))}
              />
              {errors.note ? <span className="field__error">{errors.note}</span> : null}
            </div>
          </div>

          <button className="button button--primary" type="submit" disabled={submitting}>
            {submitting ? "Priprema demo upita..." : callToAction}
          </button>
        </form>
      </aside>
    </div>
  );
}
