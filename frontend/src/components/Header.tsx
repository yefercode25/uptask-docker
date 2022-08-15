import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b sticky top-0">
      <div className="md:flex md:justify-between md:items-center">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          Uptask
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <button type="button" className="font-bold uppercase">
            Buscar Proyectos
          </button>
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