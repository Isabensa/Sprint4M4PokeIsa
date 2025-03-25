const FAVORITES_KEY = "pokefavs";

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavorites(favs) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

export function toggleFavorite(pokemon) {
  const current = getFavorites();
  const exists = current.find((p) => p.id === pokemon.id);

  let updated;
  if (exists) {
    updated = current.filter((p) => p.id !== pokemon.id);
  } else {
    updated = [...current, pokemon];
  }

  saveFavorites(updated);
  return updated;
}

export function isFavorite(pokemon) {
  const current = getFavorites();
  return current.some((p) => p.id === pokemon.id);
}
