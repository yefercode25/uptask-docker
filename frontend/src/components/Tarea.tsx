import { ITareaSaveValues } from '../types/context/proyectos';
import { formaterFecha } from '../helpers/formater-fecha';

interface ITareaProps {
  tarea: ITareaSaveValues
}

const Tarea = ({ tarea }: ITareaProps) => {
  const { nombre, descripcion, prioridad, fechaEntrega, _id, estado } = tarea;

  return (
    <div className="border-b p-5 flex justify-between items-center gap-4">
      <div>
        <p className="text-xl">{nombre}</p>
        <p className="text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="text-sm text-gray-500 uppercase">{formaterFecha(fechaEntrega)}</p>
        <p className="text-sm text-gray-500 uppercase">Prioridad: {prioridad}</p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-white uppercase rounded font-bold text-sm">Editar</button>
        {estado ? (
          <button className="bg-sky-600 hover:bg-sky-700 px-4 py-2 text-white uppercase rounded font-bold text-sm">Completa</button>
        ) : (
          <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 text-white uppercase rounded font-bold text-sm">Incompleta</button>
        )}
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white uppercase rounded font-bold text-sm">Eliminar</button>
      </div>
    </div>
  )
}

export default Tarea;