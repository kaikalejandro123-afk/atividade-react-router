
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { supabase } from '../servicos/supabase.js';

function Registros() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarProdutos() {
      setCarregando(true);
      setErro('');

      try {
        const { data, error } = await supabase
          .from('Sistema de Cadastro de Produtos')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          throw error;
        }

        setProdutos(data || []);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarProdutos();
  }, []);

  if (carregando) {
    return <p>Carregando produtos...</p>;
  }

  if (erro) {
    return <p>Erro ao carregar produtos: {erro}</p>;
  }

  return (
    <div>
      <h1>Listagem de Produtos</h1>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        produtos.map((produto) => (
          <div key={produto.id}>
            <h3>{produto.nome}</h3>

            <p>Categoria: {produto.categoria}</p>

            <p>
              Preço: R$ {Number(produto.preco).toFixed(2)}
            </p>

            <p>Quantidade: {produto.quantidade}</p>

            <p>
              Disponível: {produto.disponivel ? 'Sim' : 'Não'}
            </p>

            <Link to={`/registros/${produto.id}`}>
              Ver detalhes
            </Link>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Registros;
