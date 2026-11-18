
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { supabase } from '../servicos/supabase.js';
import { loginSchema } from '../schemas/loginSchema.js';

function Login() {
  const [mensagem, setMensagem] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  async function entrar(dados) {
    setMensagem('');

    const { error } = await supabase.auth.signInWithPassword({
      email: dados.email,
      password: dados.senha
    });

    if (error) {
      setError('root.serverError', {
        type: 'server',
        message: 'E-mail ou senha inválidos.'
      });

      return;
    }

    setMensagem('Login realizado com sucesso!');
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(entrar)}>

        <input
          type="email"
          placeholder="E-mail"
          {...register('email')}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <br />

        <input
          type="password"
          placeholder="Senha"
          {...register('senha')}
        />
        {errors.senha && <p>{errors.senha.message}</p>}

        <br />

        {errors.root?.serverError && (
          <p>{errors.root.serverError.message}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>

      </form>

      <p>{mensagem}</p>
    </div>
  );
}

export default Login;
