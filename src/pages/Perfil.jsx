
import { useAuth } from '../context/AuthContext.jsx';

function Perfil() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Meu Perfil</h1>

      <p>Nome: {user?.user_metadata?.nome}</p>

      <p>E-mail: {user?.email}</p>

      <p>ID: {user?.id}</p>
    </div>
  );
}

export default Perfil;
