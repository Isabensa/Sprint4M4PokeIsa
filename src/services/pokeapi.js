const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemons(limit = 10, offset = 0) {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error("Error al obtener los Pokémon");
    const data = await response.json();

    const detailedData = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );

    return detailedData;
  } catch (error) {
    throw error;
  }
}
