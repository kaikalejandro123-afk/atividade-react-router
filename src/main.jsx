
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router';

import Inicio from './pages/Inicio.jsx';
import Registros from './pages/Registros.jsx';
import Detalhes from './pages/Detalhes.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <nav>
        <Link to="/">Início</Link>
        {' | '}
        <Link to="/registros">Registros</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registros" element={<Registros />} />
        <Route path="/registros/:id" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
