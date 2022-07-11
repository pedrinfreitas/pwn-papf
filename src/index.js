const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3333;

const lista_produtos = {
  produtos: [
    {
      id: 1,
      descricao: "Arroz parboilizado 5Kg",
      valor: 25.0,
      marca: "Tio João",
    },
    { id: 2, descricao: "Maionese 250gr", valor: 7.2, marca: "Helmans" },
    { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.5, marca: "Itambé" },
    {
      id: 4,
      descricao: "Batata Maior Palha 300gr",
      valor: 15.2,
      marca: "Chipps",
    },
    { id: 5, descricao: "Nescau 400gr", valor: 8.0, marca: "Nestlé" },
  ],
};

// Incluir um produto CREATE POST / produtos
app.post("/api/produtos", (req, res) => {
  const { descricao, valor, marca } = req.body;
  const id = lista_produtos.produtos.length + 1;

  if (!descricao || !valor || !marca) {
    return res
      .status(400)
      .json({ error: "descrição, valor ou marca não enviado!" });
  }

  const criarProduto = {
    id,
    descricao,
    valor,
    marca,
  };

  lista_produtos.produtos.push(criarProduto);

  return res.status(201).json(criarProduto);
});

// Obter a lista de produtos RETRIEVE GET / produtos
app.get("/api/produtos", (req, res) => {
  return res.json(lista_produtos);
});

// Obter um produto específico RETRIEVE GET / produtos /:id
app.get("/api/produtos/:id", (req, res) => {
  let id = +req.params.id;

  res.json(lista_produtos.produtos.find((e) => e.id === id));
});

// Alterar um produto UPDATE PUT / produtos /:id
app.put("/api/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { descricao, valor, marca } = req.body;

  const indexProduto = lista_produtos.produtos.findIndex((e) => e.id === +id);

  if (indexProduto === -1) {
    return res.status(400).json({ error: "produto não encontrado!" });
  }

  const produtoAtualizado = Object.assign(
    lista_produtos.produtos[indexProduto],
    {
      descricao: descricao || lista_produtos.produtos[indexProduto].descricao,
      valor: valor || lista_produtos.produtos[indexProduto].valor,
      marca: marca || lista_produtos.produtos[indexProduto].marca,
    }
  );

  return res.status(201).json(produtoAtualizado);
});

// Excluir um produto DELETE DELETE /produtos/:id
app.delete("/api/produtos/:id", (req, res) => {
  const { id } = req.params;

  const indexProduto = lista_produtos.produtos.findIndex((e) => e.id === +id);

  if (indexProduto === -1) {
    return res.status(400).json({ error: "produto não encontrado!" });
  }

  lista_produtos.produtos.splice(indexProduto, 1);

  return res.status(200).json(lista_produtos.produtos);
});

app.listen(port, () => {
  console.info(`..::### Servidor de pé, rodando na porta ${port} ###::..`);
});
