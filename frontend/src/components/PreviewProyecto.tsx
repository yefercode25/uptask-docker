import { Link } from 'react-router-dom';
import { IProyectoSaveValues } from '../types/context/proyectos';

interface IPreviewProyectoProps {
  proyecto: IProyectoSaveValues;
}

const PreviewProyecto = ({ proyecto }: IPreviewProyectoProps) => {
  const { _id, cliente, nombre } = proyecto;

  return (
    <div className="border-b p-5 flex items-center">
      <p className="flex-1 text-base">
        {nombre} {''}
        <span className="text-sm text-gray-500 uppercase font-semibold">{cliente}</span>
      </p>
      <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 uppercase text-xs font-bold">
        Ver Proyecto
      </Link>
    </div>
  )
}

export default PreviewProyecto;