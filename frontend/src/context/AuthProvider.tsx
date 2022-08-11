import { createContext, useState, useEffect } from 'react';
import { IAuthValues } from '../types/context/auth';

interface IAuthContextData { 
  setAuth: (auth: IAuthValues) => void;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => { 
  const [auth, setAuth] = useState<IAuthValues>({} as IAuthValues);

  return (
    <AuthContext.Provider value={{ setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}