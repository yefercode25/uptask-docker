import { createContext, useState, useEffect } from 'react';
import { IAuthValues } from '../types/context/auth';
import { ApiService } from '../services/ApiService';

interface IAuthContextData { 
  auth: IAuthValues;
  setAuth: (auth: IAuthValues) => void;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => { 
  const [auth, setAuth] = useState<IAuthValues>({} as IAuthValues);
  
  useEffect(() => { 
    const autenticarUsuario = async () => { 
      const token = localStorage.getItem('token') || '';
      if (!token) {
        return;
      }

      try {
        const { data } = await ApiService('/usuarios/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setAuth({ ...data, token });
      } catch (error: any) {
        console.log(error.response.data.msg);
      }
    }

    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}