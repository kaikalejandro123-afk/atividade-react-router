
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { supabase } from '../servicos/supabase.js';

function Detalhes() {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarProduto() {
      setCarregando(true);
      setErro('');
      setProduto(null);

      try {
        const { data, error } = await supabase
          .from('Sistema de Cadastro de Produtos')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        setProduto(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarProduto();
  }, [id]);

  if (carregando) {
    return <p>Carregando produto...</p>;
  }

  if (erro) {
    return <p>Erro: {erro}</p>;
  }

  if (!produto) {
    return (
      <div>
        <h2>Produto não encontrado!</h2>
        <Link to="/registros">Voltar</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Detalhes do Produto</h1>

      <h2>{produto.nome}</h2>

      <p>Categoria: {produto.categoria}</p>

      <p>
        Preço: R$ {Number(produto.preco).toFixed(2)}
      </p>

      <p>Quantidade: {produto.quantidade}</p>

      <p>
        Disponível: {produto.disponivel ? 'Sim' : 'Não'}
      </p>

      <Link to="/registros">
        Voltar para a listagem
      </Link>
    </div>
  );
}

export default Detalhes;
