
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../servicos/supabase.js';
import { useNavigate, Link } from 'react-router';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function sair() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
    } else {
      navigate('/login');
    }
  }

  const nome = user?.user_metadata?.nome || 'Player';

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <span className="store-eyebrow">MINHA ÁREA</span>
        <h1>Olá, {nome}!</h1>
        <p>Bem-vindo à PixelPlay. O que você quer fazer?</p>
        <div className="dashboard-links">
          <Link className="store-button" to="/registros">Ver produtos</Link>
          <Link className="dashboard-profile" to="/perfil">Meu perfil</Link>
          <button className="dashboard-logout" type="button" onClick={sair}>
            Sair da conta
          </button>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
