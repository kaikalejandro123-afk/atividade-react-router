
# Atividade Prática — React Router e Supabase

**Disciplina:** Frameworks Front-end  
**Professor:** Elemar  
**Aluno:** Kaik Alejandro Nunes dos Santos

## 1. Descrição do projeto

Aplicação desenvolvida utilizando React, Vite, React Router e Supabase.

O sistema permite consultar produtos cadastrados em um banco de dados e visualizar os detalhes de cada produto por meio de rotas dinâmicas.

## 2. Tecnologias utilizadas

- React
- Vite
- React Router
- JavaScript
- Supabase

## 3. Funcionalidades

- Página inicial.
- Listagem de produtos do Supabase.
- Navegação entre páginas.
- Consulta de produtos pelo ID.
- Rotas dinâmicas utilizando useParams.
- Tratamento de carregamento e erros.
- Mensagem para registros inexistentes.
- Mensagem quando não existem produtos cadastrados.

## 4. Como executar o projeto

Clone o repositório e abra a pasta do projeto.

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=URL_DO_PROJETO
VITE_SUPABASE_PUBLISHABLE_KEY=CHAVE_PUBLICA
```

Substitua os valores pelos dados do seu projeto Supabase.

Execute:

```bash
npm run dev
```

Abra o endereço informado no terminal.

## 5. Rotas

- `/` — Página inicial.
- `/registros` — Listagem de produtos.
- `/registros/:id` — Detalhes de um produto.

## 6. Banco de dados

O projeto utiliza a tabela `Sistema de Cadastro de Produtos`, criada anteriormente no Supabase.

Os dados são consultados utilizando o Supabase Client, com uma política RLS que permite leitura dos produtos.
