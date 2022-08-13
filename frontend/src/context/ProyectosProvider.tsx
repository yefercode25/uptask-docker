import { createContext, useState, useEffect } from 'react';
import { IAlertaValues, IProyectoValues, IProyectoSaveValues } from '../types/context/proyectos';
import { ApiService } from '../services/ApiService';

interface IProyectosContextData {
  proyectos: IProyectoSaveValues[];
  proyecto: IProyectoSaveValues;
  alerta: IAlertaValues;
  mostrarAlerta: (alerta: IAlertaValues) => void;
  submitProyecto: (proyecto: IProyectoValues) => Promise<boolean>;
  obtenerProyecto: (id: string) => Promise<void>;
  cargando: boolean;
  eliminarProyecto: (id: string) => Promise<boolean>;
}

export const ProyectosContext = createContext<IProyectosContextData>({} as IProyectosContextData);

export const ProyectosProvider = ({ children }: { children: React.ReactNode }) => { 
  const [proyectos, setProyectos] = useState<IProyectoSaveValues[]>([]);
  const [proyecto, setProyecto] = useState<IProyectoSaveValues>({} as IProyectoSaveValues);
  const [alerta, setAlerta] = useState<IAlertaValues>({} as IAlertaValues);
  const [cargando, setCargando] = useState<boolean>(false);

  useEffect(() => {
    const obtenerProyectos = async () => { 
      try {
        const { data } = await ApiService.get<IProyectoSaveValues[]>('/proyectos');
        setProyectos(data);
      } catch (_) { 
        console.log('Inicia sesión para administrar los proyectos');
      }
    }

    obtenerProyectos();
  }, []);

  const mostrarAlerta = (datos: IAlertaValues) => {
    setAlerta(datos);
  }

  const submitProyecto = async (proyectoSave: IProyectoValues): Promise<boolean> => {
    if (proyectoSave.id) {
      return editarProyecto(proyectoSave);
    } else {
      return nuevoProyecto(proyectoSave);
    }
  }

  const nuevoProyecto = async (proyectoSave: IProyectoValues): Promise<boolean> => { 
    try {
      const { data } = await ApiService.post<IProyectoSaveValues>('/proyectos', { ...proyectoSave });
      setProyectos([...proyectos, data]);
      setAlerta({ msg: 'Proyecto creado con éxito', error: false });

      return true;
    } catch (error: any) { 
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  const editarProyecto = async (proyectoSave: IProyectoValues): Promise<boolean> => { 
    try {
      const { data } = await ApiService.put<IProyectoSaveValues>(`/proyectos/${proyectoSave.id}`, { ...proyectoSave });
      setProyectos(proyectos.map(proy => proy._id === data._id ? data : proy));
      setAlerta({ msg: 'Proyecto editado con éxito', error: false });

      return true;
    } catch (error: any) { 
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  const obtenerProyecto = async (id: string) => { 
    setCargando(true);
    try {
      const { data } = await ApiService.get<IProyectoSaveValues>(`/proyectos/${id}`);
      setProyecto(data);
    } catch (error: any) { 
      setAlerta({ msg: error.response.data.msg, error: true });
    } finally {
      setCargando(false);
    }
  }

  const eliminarProyecto = async (id: string): Promise<boolean> => { 
    try {
      const { data } = await ApiService.delete(`/proyectos/${id}`);
      setProyectos(proyectos.filter(proy => proy._id !== id));
      setAlerta({ msg: data.msg, error: false });

      return true;
    } catch (error: any) {
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  return (
    <ProyectosContext.Provider
      value={{
        alerta,
        mostrarAlerta,
        proyectos,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
}