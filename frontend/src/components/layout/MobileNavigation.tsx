import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  function closeMenu(restoreFocus = false) {
    setOpen(false);

    if (restoreFocus) {
      window.setTimeout(() => menuButtonRef.current?.focus(), 0);
    }
  }

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };

    if (open) {
      const firstLink = dialogRef.current?.querySelector<HTMLAnchorElement>("a");
      firstLink?.focus();
      body.classList.add("mobile-menu-open");
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      html.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      body.classList.remove("mobile-menu-open");
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
      html.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        className="mobile-menu-button"
        aria-label={open ? "Zatvori meni" : "Otvori meni"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="visually-hidden">{open ? "Zatvori meni" : "Otvori meni"}</span>
        <span className="mobile-menu-button__icon" aria-hidden="true">
          <span className="mobile-menu-button__line" />
          <span className="mobile-menu-button__line" />
          <span className="mobile-menu-button__line" />
        </span>
      </button>

      {open ? (
        <div
          ref={dialogRef}
          id="mobile-nav-panel"
          className="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Mobilna navigacija"
        >
          <div
            className="mobile-nav-panel__inner"
          >
            <nav aria-label="Mobilna navigacija">
              <ul className="mobile-nav-list">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} onClick={() => closeMenu()}>
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
