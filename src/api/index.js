require("dotenv").config();
const express = require("express");
const knex = require("../db/knex");

const routesApi = express.Router();

// Incluir um produto CREATE POST / produtos
routesApi.post("/produtos", (req, res) => {
  const { descricao, valor, marca } = req.body;

  if (!descricao || !valor || !marca) {
    return res
      .status(400)
      .json({ error: "descrição, valor ou marca não enviado!" });
  }

  const criarProduto = {
    descricao,
    valor,
    marca,
  };

  return knex("products")
    .insert(criarProduto, "*")
    .then((produto) => res.status(201).json(produto))
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

// Obter a lista de produtos RETRIEVE GET / produtos
routesApi.get("/produtos", (req, res) => {
  return knex("products")
    .then((produtos) => res.json(produtos))
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

// Obter um produto específico RETRIEVE GET / produtos /:id
routesApi.get("/produtos/:id", (req, res) => {
  let { id } = req.params;

  return knex("products")
    .where({ id })
    .first()
    .then((produto) => res.json(produto))
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

// Alterar um produto UPDATE PUT / produtos /:id
routesApi.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { descricao, valor, marca } = req.body;

  return knex("products")
    .where({ id })
    .update(
      {
        descricao,
        valor,
        marca,
      },
      "*"
    )
    .then((produto) => {
      if (produto && produto[0]) {
        res.status(200).json(produto);
      } else {
        res.status(400).json({ error: "produto não encontrado!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

// Excluir um produto DELETE DELETE /produtos/:id
routesApi.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;

  return knex("products")
    .where({ id })
    .del("*")
    .then((produto) => {
      if (produto && produto[0]) {
        res.status(200).json(produto);
      } else {
        res.status(400).json({ error: "produto não encontrado!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

module.exports = routesApi;
