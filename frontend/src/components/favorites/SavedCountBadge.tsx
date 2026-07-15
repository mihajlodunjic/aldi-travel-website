import { useEffect, useState } from "react";
import { getSavedPackageIds } from "@/utils/favorites";

export default function SavedCountBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(getSavedPackageIds().length);

    update();
    window.addEventListener("storage", update);
    window.addEventListener("favorites:change", update as EventListener);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("favorites:change", update as EventListener);
    };
  }, []);

  if (count < 1) return null;

  return <span className="saved-count-badge">{count}</span>;
}
