import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Home from './routes/Home'
import Login from './routes/Login'
import Header from './components/Header';
import Cadastro from './routes/Cadastro';
import Categoria from './routes/Categoria'
import Perfil from './routes/Perfil/Perfil';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/categoria/:id" element={<Categoria />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
