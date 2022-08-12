import { createContext, useState } from 'react';
import { IAlertaValues, IProyectoValues, IProyectoSaveValues } from '../types/context/proyectos';
import { ApiService } from '../services/ApiService';

interface IProyectosContextData {
  proyectos: any[];
  alerta: IAlertaValues;
  mostrarAlerta: (alerta: IAlertaValues) => void;
  submitProyecto: (proyecto: IProyectoValues) => Promise<boolean>;
}

export const ProyectosContext = createContext<IProyectosContextData>({} as IProyectosContextData);

export const ProyectosProvider = ({ children }: { children: React.ReactNode }) => { 
  const [proyectos, setProyectos] = useState<IProyectoSaveValues[]>([]);
  const [alerta, setAlerta] = useState<IAlertaValues>({} as IAlertaValues);

  const mostrarAlerta = (datos: IAlertaValues) => {
    setAlerta(datos);
  }

  const submitProyecto = async (proyecto: IProyectoValues): Promise<boolean> => {
    try {
      const { data } = await ApiService.post<IProyectoSaveValues>('/proyectos', { ...proyecto });
      setProyectos([...proyectos, data]);
      setAlerta({ msg: 'Proyecto creado con éxito', error: false });

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
        submitProyecto
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
}