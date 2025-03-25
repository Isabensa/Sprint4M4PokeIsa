import { motion } from 'framer-motion'

export default function Pokecard({ pokemon, isFavorite, onToggleFavorite }) {
  const habilidades = pokemon.abilities
    .map((h) => h.ability.name)
    .join(', ')

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 8,
        duration: 0.8,
      }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="bg-black text-white p-3 rounded-xl shadow text-center max-w-[220px]"
    >
      {/* Imagen */}
      <div className="bg-white w-32 h-32 mx-auto mb-3 flex items-center justify-center rounded">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-20 h-20 object-contain"
        />
      </div>

      <h2 className="text-base font-bold capitalize">{pokemon.name}</h2>

      <p className="text-xs text-gray-300 mb-1">
        Tipo: {pokemon.types.map((t) => t.type.name).join(', ')}
      </p>
      <p className="text-xs text-gray-400">
        Altura: {(pokemon.height / 10).toFixed(1)} m
      </p>
      <p className="text-xs text-gray-400 mb-1">
        Peso: {(pokemon.weight / 10).toFixed(1)} kg
      </p>
      <p className="text-xs text-gray-500 italic mb-3">
        Habilidades: {habilidades}
      </p>

      <button
        onClick={() => onToggleFavorite(pokemon)}
        className={`text-xs px-3 py-1 rounded font-semibold ${
          isFavorite(pokemon)
            ? 'bg-yellow-400 text-black hover:bg-yellow-300'
            : 'bg-yellow-600 text-black hover:bg-yellow-500'
        }`}
      >
        {isFavorite(pokemon) ? 'Quitar ❤️' : 'Favorito 🤍'}
      </button>
    </motion.li>
  )
}
