import { useEffect, useState } from "react";
import { getSavedPackageIds, toggleSavedPackageId } from "@/utils/favorites";

type FavoriteButtonProps = {
  packageId: string;
  packageTitle: string;
};

export default function FavoriteButton({ packageId, packageTitle }: FavoriteButtonProps) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const update = () => setSavedIds(getSavedPackageIds());

    update();
    window.addEventListener("storage", update);
    window.addEventListener("favorites:change", update as EventListener);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("favorites:change", update as EventListener);
    };
  }, []);

  const isSaved = savedIds.includes(packageId);

  return (
    <button
      type="button"
      className={`favorite-marker ${isSaved ? "is-saved" : ""}`}
      aria-pressed={isSaved}
      aria-label={
        isSaved
          ? `Ukloni aranžman ${packageTitle} iz sačuvanih`
          : `Sačuvaj aranžman ${packageTitle}`
      }
      onClick={() => setSavedIds(toggleSavedPackageId(packageId))}
    >
      <span className="favorite-marker__cut" aria-hidden="true" />
      <span>{isSaved ? "Sačuvano" : "Sačuvaj aranžman"}</span>
    </button>
  );
}
