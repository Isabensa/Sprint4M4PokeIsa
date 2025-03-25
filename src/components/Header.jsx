import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/emblemapokemon.jpg'

export default function Header() {
  const location = useLocation()
  const current = location?.pathname || '/'

  const linkStyle = (path) =>
    `inline-block font-bold px-4 py-2 rounded-full shadow-md border border-yellow-500 transition ${
      current === path
        ? 'bg-yellow-500 text-black'
        : 'bg-yellow-400 text-black hover:bg-yellow-300'
    }`

  return (
    <header className="bg-black shadow mb-6">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo + Título */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Pokémon logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-extrabold text-white drop-shadow-[1px_1px_0px_rgba(253,224,71,0.8)]">
            Pokébuscador
          </h1>
        </div>

        {/* Navegación */}
        <nav className="space-x-4">
          <button
            onClick={() => (window.location.href = '/')}
            className={linkStyle('/')}
          >
            Inicio
          </button>
          <Link to="/favoritos" className={linkStyle('/favoritos')}>
            Favoritos
          </Link>
        </nav>
      </div>
    </header>
  )
}
