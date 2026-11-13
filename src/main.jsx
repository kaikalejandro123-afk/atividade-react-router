
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router';

import Inicio from './pages/Inicio.jsx';
import Registros from './pages/Registros.jsx';
import Detalhes from './pages/Detalhes.jsx';
import Registro from './pages/Registro.jsx';
import Login from './pages/Login.jsx';
import Protecao from './pages/Protecao.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Perfil from './pages/Perfil.jsx';

import { AuthProvider } from './context/AuthContext.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <nav className="site-nav" aria-label="Navegação principal">
          <Link className="site-brand" to="/">
            <span className="site-brand__mark" aria-hidden="true">✦</span>
            PIXEL<span>PLAY</span>
          </Link>
          <div className="site-nav__links">
            <Link to="/">Início</Link>
            <Link to="/registros">Catálogo</Link>
            <Link to="/dashboard">Minha área</Link>
            <Link to="/perfil">Perfil</Link>
          </div>
          <div className="site-nav__account">
            <Link to="/login">Entrar</Link>
            <Link className="site-nav__signup" to="/registro">Criar conta</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registros" element={<Registros />} />
          <Route path="/registros/:id" element={<Detalhes />} />

          <Route element={<Protecao />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
