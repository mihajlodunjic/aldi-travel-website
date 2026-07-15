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

export function getSavedPackageIds(): string[] {
  if (typeof window === "undefined") return [];
  return parseIds(window.localStorage.getItem(FAVORITES_STORAGE_KEY));
}

export function persistSavedPackageIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
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
