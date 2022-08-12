import PreviewProyecto from '../components/PreviewProyecto';
import { useProyectos } from '../hooks/useProyectos';
const Proyectos = () => {
  const { proyectos } = useProyectos();

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
      <div className="bg-white shadow mt-10 rounded">
        {proyectos?.length ? (
          proyectos.map(proyecto => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
            <p className="text-center uppercase font-bold text-red-800 p-5">
            No tienes ningún proyecto registrado, crea uno rapidamente.  
          </p>
        )}
      </div>
    </>
  )
}

export default Proyectos;