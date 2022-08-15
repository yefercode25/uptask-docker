import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import Tarea from '../components/Tarea';
import { useProyectos } from '../hooks/useProyectos';

const Proyecto = () => {
  const { id } = useParams();
  const { obtenerProyecto, proyecto, cargando, handleModalTarea } = useProyectos();

  useEffect(() => {
    obtenerProyecto(id!);
  }, []);

  const { nombre, _id } = proyecto;

  return (
    <div>
      {cargando ? 'Cargando...' : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="font-black text-4xl">{nombre}</h1>
            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <Link to={`/proyectos/editar/${_id}`} className="uppercase font-bold">Editar</Link>
            </div>
          </div>
         
          <button type="button" className="flex gap-2 items-center justify-center text-sm px-5 py-3 w-full md:w-auto rounded uppercase font-bold bg-sky-400 hover:bg-sky-600 text-white text-center mt-5" onClick={handleModalTarea}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Nueva tarea
          </button>

          <p className="font-bold text-2xl mt-10">
            Tareas del proyecto {''}
            <span className="text-gray-400 text-sm">{ proyecto.tareas?.length}</span>
          </p>

          <div className="bg-white shadow mt-10 rounded">
            {proyecto.tareas?.length ? (
              proyecto.tareas?.map(tarea => (
                <Tarea key={tarea._id} tarea={tarea} />
              ))
            ) : (
              <p className="text-center font-semibold uppercase p-5">
                No hay tareas en este proyecto
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-2xl">
              Colaboradores del proyecto {''}
            </p>
            <Link to={`/proyectos/nuevo-colaborador/${id}`} className="text-gray-400 hover:text-black uppercase font-bold">
              Añadir
            </Link>
          </div>
         
          <ModalFormularioTarea />
          <ModalEliminarTarea />
        </>
      )}
    </div>
  )
}

export default Proyecto;