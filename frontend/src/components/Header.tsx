import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b sticky top-0">
      <div className="md:flex md:justify-between md:items-center">
        <h2 className="text-4xl text-sky-600 font-black text-center">
          Uptask
        </h2>
        <input
          type="search"
          placeholder="Buscar proyecto"
          className="rounded lg:w-96 block p-2 border"
        />
        <div className="flex items-center gap-5">
          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>
          <button type="button" className="text-white text-sm bg-sky-600 p-3 rounded uppercase font-bold">
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header;