import { createContext, useState, useEffect } from 'react';
import { IAuthValues } from '../types/context/auth';
import { ApiService } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';

interface IAuthContextData { 
  auth: IAuthValues;
  setAuth: (auth: IAuthValues) => void;
  cargando: boolean;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => { 
  const [auth, setAuth] = useState<IAuthValues>({} as IAuthValues);
  const [cargando, setCargando] = useState<boolean>(true);

  const navigate = useNavigate();
  
  useEffect(() => { 
    const autenticarUsuario = async () => { 
      const token = localStorage.getItem('token') || '';
      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const { data } = await ApiService('/usuarios/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setAuth({ ...data, token });
        navigate('/proyectos');
      } catch (error: any) {
        console.log(error.response.data.msg);
        setAuth({} as IAuthValues);
      } finally {
        setCargando(false);
      }
    }

    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}