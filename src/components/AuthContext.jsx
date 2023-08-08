import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [telaAcesso, setTelaAcesso] = useState(false)
    const [logado, setLogado] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <AuthContext.Provider value={{ telaAcesso, setTelaAcesso, logado, setLogado, isOpen, setIsOpen }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
