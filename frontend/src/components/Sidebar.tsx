import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl">Hola: Yeferson</p>

      <Link to="/crear-proyecto" className="bg-sky-600 w-full p-3 text-white uppercase font-bold block rounded mt-5 text-center">
        Nuevo Proyecto
      </Link>
    </aside>
  )
}

export default Sidebar;