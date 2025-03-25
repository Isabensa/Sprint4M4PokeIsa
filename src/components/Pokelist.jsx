import Pokecard from './Pokecard'

function Pokelist({ pokemons, isFavorite, onToggleFavorite }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemons.map((pokemon) => (
        <Pokecard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  )
}

export default Pokelist
