import { Link } from 'react-router';
import './Inicio.css';

function Inicio() {
  return (
    <main className="store-home">
      <section className="store-home__hero">
        <span className="store-eyebrow">PIXELPLAY • LOJA GAMER</span>
        <h1>
          Seu próximo jogo
          <br />
          <span>começa aqui.</span>
        </h1>
        <p>Encontre seus produtos favoritos e prepare-se para a próxima partida.</p>
        <Link className="store-button" to="/registros">
          Ver produtos <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}

export default Inicio;
