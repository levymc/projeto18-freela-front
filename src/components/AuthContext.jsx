import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [telaAcesso, setTelaAcesso] = useState(false);

  return (
    <AuthContext.Provider value={{ telaAcesso, setTelaAcesso }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
