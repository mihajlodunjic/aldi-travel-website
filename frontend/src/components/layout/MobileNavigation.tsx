import { useEffect, useId, useRef, useState } from "react";
import SavedCountBadge from "@/components/favorites/SavedCountBadge";
import { navigation } from "@/data/navigation";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const firstLink = dialogRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        className="mobile-menu-button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen(true)}
      >
        <span aria-hidden="true">Meni</span>
        <SavedCountBadge />
      </button>

      {open ? (
        <div className="mobile-nav-backdrop" role="presentation" onClick={() => setOpen(false)}>
          <div
            ref={dialogRef}
            id="mobile-nav-panel"
            className="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-nav-panel__header">
              <h2 id={titleId}>Navigacioni indeks</h2>
              <button
                type="button"
                className="mobile-nav-panel__close"
                onClick={() => {
                  setOpen(false);
                  menuButtonRef.current?.focus();
                }}
              >
                Zatvori meni
              </button>
            </div>
            <nav aria-label="Mobilna navigacija">
              <ul className="mobile-nav-list">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} onClick={() => setOpen(false)}>
                      <span>{item.index}</span>
                      <strong>{item.label}</strong>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
