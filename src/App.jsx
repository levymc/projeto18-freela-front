import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Home from './routes/Home'
import Login from './routes/Login'
import Header from './components/Header';
import Cadastro from './routes/Cadastro';


function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
