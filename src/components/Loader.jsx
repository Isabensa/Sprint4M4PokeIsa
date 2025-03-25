export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-black">
      <div className="animate-spin rounded-full h-20 w-20 border-4 border-yellow-400 border-t-black mb-4"></div>
      <p className="text-lg font-semibold">Cargando Pokémon...</p>
    </div>
  )
}
