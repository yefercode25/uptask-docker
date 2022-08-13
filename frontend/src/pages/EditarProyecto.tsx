import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProyectos } from '../hooks/useProyectos';
import FormularioProyecto from '../components/FormularioProyecto';

const EditarProyecto = () => {
  const { id } = useParams();
  const { obtenerProyecto, proyecto, cargando } = useProyectos();

  useEffect(() => {
    obtenerProyecto(id!);
  }, []);

  const { nombre, _id } = proyecto;

  if (cargando) return 'Cargando...';

  return (
    <>
      <h1 className="font-black text-4xl">
        Editar Proyecto: {''}
        <span className="font-semibold">{nombre}</span>
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  )
}

export default EditarProyecto;