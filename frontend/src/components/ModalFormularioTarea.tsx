import { Fragment, useState, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useProyectos } from '../hooks/useProyectos';
import Alerta from './Alerta';
import { useParams } from 'react-router-dom';

interface IModalFormularioTarea {
  
}

const PRIORIDADES = ['Baja', 'Media', 'Alta'];

const ModalFormularioTarea = ({ }: IModalFormularioTarea) => {
  const [nombre, setNombre] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [fechaEntrega, setFechaEntrega] = useState<string>('');
  const [prioridad, setPrioridad] = useState<string>('');

  const params = useParams();
  const { modalFormularioTarea, handleModalTarea, mostrarAlerta, alerta, submitTarea } = useProyectos();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    
    if([nombre, descripcion, fechaEntrega, prioridad].includes('')) {
      mostrarAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      return;
    }

    const isValidSave = await submitTarea({ nombre, descripcion, prioridad, fechaEntrega, proyecto: params.id! });
    if (isValidSave) {
      setNombre('');
      setDescripcion('');
      setFechaEntrega('');
      setPrioridad('');
      
      setTimeout(() => {  
        handleModalTarea();
        mostrarAlerta({ msg: '', error: false });
      }, 1000);
    }
  }

  return (
    <Transition.Root show={modalFormularioTarea} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalTarea}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalTarea}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>


              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                    Crear Tarea
                  </Dialog.Title>
                  
                  <form className="mt-10" onSubmit={handleSubmit}>
                    {alerta?.msg && <Alerta {...alerta} />}
                    <div className="mb-5 mt-10">
                      <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">
                        Nombre de la Tarea
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        placeholder="Ejm. Seleccionar los colores..."
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">
                        Descripción de la Tarea
                      </label>
                      <textarea
                        id="descripcion"
                        placeholder="Ejm. Obtener los colores de la imagen..."
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="fecha-entrega" className="text-gray-700 uppercase font-bold text-sm">
                        Fecha de entrega de la Tarea
                      </label>
                      <input
                        type="date"
                        id="fecha-entrega"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded"
                        value={fechaEntrega}
                        onChange={(e) => setFechaEntrega(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="prioridad" className="text-gray-700 uppercase font-bold text-sm">
                        Prioridad de la Tarea
                      </label>
                      <select
                        id="prioridad"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                      >
                        <option value="">Seleccione una opción</option>
                        {PRIORIDADES.map((prd) => (
                          <option key={prd} value={prd}>
                            {prd}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 w-full text-white uppercase  font-bold cursor-pointer transition-colors rounded p-3 text-sm"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalFormularioTarea;