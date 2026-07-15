export const FAVORITES_STORAGE_KEY = "aldi-travel:saved-package-ids";

function parseIds(value: string | null): string[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function readFavoritesStorage(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(FAVORITES_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeFavoritesStorage(ids: string[]): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
}

export function getSavedPackageIds(): string[] {
  return parseIds(readFavoritesStorage());
}

export function persistSavedPackageIds(ids: string[]): void {
  if (!writeFavoritesStorage(ids) || typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("favorites:change", { detail: ids }));
}

export function toggleSavedPackageId(packageId: string): string[] {
  const ids = getSavedPackageIds();
  const next = ids.includes(packageId) ? ids.filter((id) => id !== packageId) : [...ids, packageId];
  persistSavedPackageIds(next);
  return next;
}

export function sanitizeSavedPackageIds(validIds: string[]): string[] {
  const validSet = new Set(validIds);
  const sanitized = getSavedPackageIds().filter((id) => validSet.has(id));
  persistSavedPackageIds(sanitized);
  return sanitized;
}
