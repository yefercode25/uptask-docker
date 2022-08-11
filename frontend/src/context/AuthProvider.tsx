import { createContext, useState, useEffect } from 'react';

interface IAuthContextData { 

}

export const AuthContext = createContext<IAuthContextData>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => { 
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}