import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getPokemons } from '../services/pokeapi'
import Loader from '../components/Loader'
import Pokelist from '../components/Pokelist'
import {
  getFavorites,
  toggleFavorite,
  isFavorite,
} from '../utils/localStorage'
import { motion } from 'framer-motion'
import pokeIcon from '../assets/poke2.jpg'
import pikachu from '../assets/poke2.jpg'

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [cantidad, setCantidad] = useState(100)
  const [loading, setLoading] = useState(true)
  const [favoritos, setFavoritos] = useState(getFavorites())
  const [busqueda, setBusqueda] = useState('')
  const hasMounted = useRef(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getPokemons(cantidad)
        setTimeout(() => {
          setPokemons(data)
          setLoading(false)

          if (hasMounted.current) {
            toast.dismiss()
            toast(
              <div className="flex items-center space-x-4">
                <img
                  src={pokeIcon}
                  alt="pikachu"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold">
                  ¡Se cargaron {data.length} Pokémon!
                </span>
              </div>,
              {
                toastId: 'carga-exitosa',
                autoClose: 4000,
                pauseOnHover: true,
                className: 'custom-toast',
                icon: false,
              }
            )
          } else {
            hasMounted.current = true
          }
        }, 400)
      } catch (error) {
        toast.error('Hubo un error al cargar los Pokémon', {
          autoClose: 4000,
          pauseOnHover: true,
          className: 'custom-toast',
          icon: false,
        })
        setLoading(false)
        console.error(error)
      }
    }

    fetchData()
  }, [cantidad])

  const handleChange = (e) => {
    const valor = parseInt(e.target.value)
    if (!isNaN(valor) && valor > 0) {
      setCantidad(valor)
    }
  }

  const handleToggleFav = (pokemon) => {
    const updated = toggleFavorite(pokemon)
    setFavoritos(updated)

    const mensaje = isFavorite(pokemon)
      ? `${pokemon.name} agregado a favoritos`
      : `${pokemon.name} eliminado de favoritos`

    toast.info(mensaje, {
      autoClose: 4000,
      pauseOnHover: true,
      className: 'custom-toast',
      icon: false,
    })
  }

  const pokemonsFiltrados = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busqueda)
  )

  return (
    <div className="p-[2cm] text-black flex flex-col min-h-screen">
      {/* Título de la página */}
      <h2 className="text-4xl font-extrabold text-center text-black drop-shadow-[2px_2px_0px_rgba(253,224,71,0.8)] mb-20 mt-[-1cm]">
        Buscador de Pokemones
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 flex-grow">
        {/* Columna izquierda */}
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-start space-y-6">
          <motion.img
            src={pikachu}
            alt="pikachu"
            className="w-56 h-56 rounded-full shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />

          <div className="text-center space-y-6">
            <div>
              <label
                htmlFor="busqueda"
                className="block text-lg font-bold mb-2 text-black drop-shadow-md"
              >
                Buscar por nombre
              </label>
              <input
                type="text"
                id="busqueda"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value.toLowerCase())}
                className="border border-yellow-600 bg-black text-white text-lg font-semibold rounded px-4 py-2 w-56 text-center placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-md"
                placeholder="Ej: pikachu"
              />
            </div>

            <div>
              <label
                htmlFor="cantidad"
                className="block text-lg font-bold mb-2 text-black drop-shadow-md"
              >
                ¿Cuántos Pokémon querés ver?
              </label>
              <input
                type="number"
                id="cantidad"
                value={cantidad}
                onChange={handleChange}
                className="border border-yellow-600 bg-black text-white text-lg font-semibold rounded px-4 py-2 w-24 text-center placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Columna derecha con scroll interno */}
        <div className="w-full lg:w-2/3 h-[70vh] overflow-y-auto pr-2">
          {loading ? (
            <Loader />
          ) : (
            <div className="max-w-6xl mx-auto px-4">
              <Pokelist
                pokemons={pokemonsFiltrados}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFav}
              />
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  )
}

export default Home
