import { useEffect, useState } from 'react'
import { getFavorites, toggleFavorite, isFavorite } from '../utils/localStorage'
import { toast } from 'react-toastify'
import Pokelist from '../components/Pokelist'
import pikachutriste from '../assets/pikachutriste.jpeg'

function Favorites() {
  const [favoritos, setFavoritos] = useState([])

  useEffect(() => {
    setFavoritos(getFavorites())
  }, [])

  const handleToggleFav = (pokemon) => {
    const updated = toggleFavorite(pokemon)
    setFavoritos(updated)

    toast.info(`${pokemon.name} eliminado de favoritos`, {
      autoClose: 4000,
      pauseOnHover: true,
      className: 'custom-toast',
      icon: false,
    })
  }

  return (
    <div className="p-4 min-h-screen flex flex-col items-center bg-yellow-400">
      {/* Título fijo en negro bold */}
      <h1 className="text-4xl font-extrabold text-black mb-8 drop-shadow-md">
        Mis Pokemones
      </h1>

      {favoritos.length === 0 ? (
        <div className="text-center">
          <p className="text-2xl text-white font-bold drop-shadow-lg mb-6">
            Todavía no agregaste favoritos 😢
          </p>
          <img
            src={pikachutriste}
            alt="pikachu triste"
            className="mx-auto w-52 h-auto rounded-lg shadow-lg"
          />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 w-full">
          <Pokelist
            pokemons={favoritos}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFav}
          />
        </div>
      )}
    </div>
  )
}

export default Favorites
