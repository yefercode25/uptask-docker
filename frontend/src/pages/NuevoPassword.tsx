const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablece tu password y no pierdas el acceso a tus {''}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form className="mt-10 bg-white shadow rounded px-10 py-5 pb-12">
        <div className="my-5">
          <label className="uppercase text-gray-600 block font-black text-xl" htmlFor="password">Nueva Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Tú nueva contraseña"
            className="w-full mt-3 p-3 border rounded bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Guardar nueva contraseña"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded text-xl mt-3 hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  )
}

export default NuevoPassword;