
import { useState } from 'react';
import { supabase } from '../servicos/supabase.js';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function entrar(event) {
    event.preventDefault();
    setMensagem('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    });

    if (error) {
      setMensagem(error.message);
    } else {
      setMensagem('Login realizado com sucesso!');
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={entrar}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <br />

        <button type="submit">Entrar</button>
      </form>

      <p>{mensagem}</p>
    </div>
  );
}

export default Login;
