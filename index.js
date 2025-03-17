// Importar o Express
const express = require("express");
const app = express();
app.use(express.json()); // Permite trabalhar com JSON

// Simulando um banco de dados (inicialmente vazio)
let produtos = [
  { id: 1, nome: "Smartphone X", preco: 2500.00, quantidade: 30 },
  { id: 2, nome: "Notebook Pro", preco: 5000.00, quantidade: 5 }
];

// 1. Listar todos os produtos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// 2. Buscar um produto específico
app.get("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado!" });
  }
});

// 3. Adicionar um novo produto
app.post("/produtos", (req, res) => {
  const novoProduto = req.body;
  novoProduto.id = produtos.length + 1;
  produtos.push(novoProduto);
  res.status(201).json({ mensagem: "Produto adicionado com sucesso!" });
});

// 4. Atualizar um produto
app.put("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  if (index !== -1) {
    produtos[index] = { id, ...req.body };
    res.json({ mensagem: "Produto atualizado com sucesso!" });
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado!" });
  }
});

// 5. Deletar um produto
app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  if (index !== -1) {
    produtos.splice(index, 1);
    res.json({ mensagem: "Produto removido com sucesso!" });
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado!" });
  }
});

// Servidor rodando na porta 3000
app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
