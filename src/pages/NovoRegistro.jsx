
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { supabase } from '../servicos/supabase.js';
import { produtoSchema } from '../schemas/produtoSchema.js';

function NovoRegistro() {
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: '',
      categoria: '',
      preco: '',
      quantidade: '',
      disponivel: true
    }
  });

  async function cadastrarProduto(dados) {
    setMensagem('');

    const { data: { user }, error: erroUsuario } =
      await supabase.auth.getUser();

    if (erroUsuario || !user) {
      setMensagem('Você precisa estar logado para cadastrar um produto.');
      return;
    }

    const { error } = await supabase
      .from('Sistema de Cadastro de Produtos')
      .insert([{
        nome: dados.nome,
        categoria: dados.categoria,
        preco: dados.preco,
        quantidade: dados.quantidade,
        disponivel: dados.disponivel,
        user_id: user.id
      }]);

    if (error) {
      setMensagem('Não foi possível cadastrar o produto. Tente novamente.');
      return;
    }

    reset();
    navigate('/registros');
  }

  return (
    <div>
      <h1>Novo Produto</h1>

      <form onSubmit={handleSubmit(cadastrarProduto)}>
        <input
          type="text"
          placeholder="Nome do produto"
          {...register('nome')}
        />
        {errors.nome && <p>{errors.nome.message}</p>}

        <input
          type="text"
          placeholder="Categoria"
          {...register('categoria')}
        />
        {errors.categoria && <p>{errors.categoria.message}</p>}

        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          {...register('preco')}
        />
        {errors.preco && <p>{errors.preco.message}</p>}

        <input
          type="number"
          placeholder="Quantidade"
          {...register('quantidade')}
        />
        {errors.quantidade && <p>{errors.quantidade.message}</p>}

        <label>
          <input type="checkbox" {...register('disponivel')} />
          Produto disponível
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Cadastrar produto'}
        </button>
      </form>

      <p>{mensagem}</p>
    </div>
  );
}

export default NovoRegistro;
