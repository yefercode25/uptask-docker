import { Link } from 'react-router-dom';

const Registrar = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus {''}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form className="mt-10 bg-white shadow rounded px-10 py-5 pb-12">
        <div className="my-5">
          <label className="uppercase text-gray-600 block font-black text-xl" htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Tu nombre de registro"
            className="w-full mt-3 p-3 border rounded bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block font-black text-xl" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block font-black text-xl" htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña de registro"
            className="w-full mt-3 p-3 border rounded bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block font-black text-xl" htmlFor="password2">Repetir Contraseña</label>
          <input
            type="password"
            id="password2"
            placeholder="Repetir contraseña de registro"
            className="w-full mt-3 p-3 border rounded bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Crear cuenta"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded text-xl mt-3 hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 hover:text-slate-700 text-sm"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 hover:text-slate-700 text-sm"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </nav>
    </>
  )
}

export default Registrar;