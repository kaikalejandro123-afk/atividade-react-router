
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { supabase } from '../servicos/supabase.js';
import { cadastroSchema } from '../schemas/cadastroSchema.js';

function Registro() {
  const [mensagem, setMensagem] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(cadastroSchema)
  });

  async function cadastrar(dados) {
    setMensagem('');

    const { data, error } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.senha,
      options: {
        data: {
          nome: dados.nome
        }
      }
    });

    if (error) {
      if (
        error.code === 'user_already_exists' ||
        error.code === 'email_exists'
      ) {
        setError('email', {
          type: 'server',
          message: 'Este e-mail já está cadastrado.'
        });
      } else {
        setError('root.serverError', {
          type: 'server',
          message: 'Não foi possível realizar o cadastro. Tente novamente.'
        });
      }

      return;
    }

    // Verifica se o Supabase retornou uma identidade vazia.
    if (data.user?.identities?.length === 0) {
      setError('email', {
        type: 'server',
        message: 'Este e-mail já está cadastrado.'
      });

      return;
    }

    setMensagem('Cadastro realizado! Verifique seu e-mail.');
    reset();
  }

  return (
    <div>
      <h1>Cadastro de Usuário</h1>

      <form onSubmit={handleSubmit(cadastrar)}>

        <input
          type="text"
          placeholder="Nome completo"
          {...register('nome')}
        />
        {errors.nome && <p>{errors.nome.message}</p>}

        <br />

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

        <input
          type="password"
          placeholder="Confirmar senha"
          {...register('confirmarSenha')}
        />
        {errors.confirmarSenha && (
          <p>{errors.confirmarSenha.message}</p>
        )}

        <br />

        {errors.root?.serverError && (
          <p>{errors.root.serverError.message}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>

      </form>

      <p>{mensagem}</p>
    </div>
  );
}

export default Registro;
