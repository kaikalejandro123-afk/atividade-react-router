
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

function Protecao() {
  const { user, carregando } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default Protecao;
