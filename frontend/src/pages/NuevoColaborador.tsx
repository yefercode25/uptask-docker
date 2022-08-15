import FormularioColaborador from "../components/FormularioColaborador";
import { useProyectos } from '../hooks/useProyectos';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, cargando } = useProyectos();
  const { id } = useParams();

  useEffect(() => { 
    obtenerProyecto(id!);
  }, [id]);

  if (cargando) return (<p>Cargando...</p>);

  return (
    <>
      <h1 className="font-black text-4xl">
        Añadir Colaborador(a): {''}
        <span className="font-semibold">{proyecto.nombre}</span>
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
    </>
  )
}

export default NuevoColaborador;