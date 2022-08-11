import { createContext } from 'react';

interface IProyectosContextData {

}

export const ProyectosContext = createContext<IProyectosContextData>({} as IProyectosContextData);

export const ProyectosProvider = ({ children }: { children: React.ReactNode }) => { 
  return (
    <ProyectosContext.Provider value={{ }}>
      {children}
    </ProyectosContext.Provider>
  );
}