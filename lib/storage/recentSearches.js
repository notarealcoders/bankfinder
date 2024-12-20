const STORAGE_KEY = "recent_searches";
const MAX_SEARCHES = 10;

export function getRecentSearches() {
  if (typeof window === "undefined") return [];

  try {
    const searches = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(searches) ? searches : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(search) {
  if (typeof window === "undefined") return;

  const searches = getRecentSearches();
  const newSearches = [
    search,
    ...searches.filter((s) => s.ifsc !== search.ifsc),
  ].slice(0, MAX_SEARCHES);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newSearches));
}
