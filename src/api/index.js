require("dotenv").config();
const express = require("express");
const knex = require("../db/knex");

const routesApi = express.Router();

// Incluir um aluno CREATE POST / alunos
routesApi.post("/alunos", (req, res) => {
  const { nome, email, celular, idade, objetivo, peso } = req.body;

  if (!nome || !email || !celular || !idade || !objetivo || !peso) {
    return res.status(400).json({ error: "Ops, faltou preencher algum dado." });
  }

  const criarAluno = {
    nome,
    email,
    celular,
    idade,
    objetivo,
    peso,
  };

  return knex("alunos")
    .insert(criarAluno, "*")
    .then((aluno) => res.status(201).json(aluno))
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

// Obter a lista de alunos RETRIEVE GET / alunos
routesApi.get("/alunos", (req, res) => {
  return knex("alunos")
    .then((alunos) => res.json(alunos))
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

// Obter um aluno específico RETRIEVE GET / alunos /:id
routesApi.get("/alunos/:id", (req, res) => {
  let { id } = req.params;

  return knex("alunos")
    .where({ id })
    .first()
    .then((aluno) => res.json(aluno))
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

// Alterar um aluno UPDATE PUT / alunos /:id
routesApi.put("/alunos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, celular, idade, objetivo, peso } = req.body;
  const atualizado_em = knex.fn.now();

  return knex("alunos")
    .where({ id })
    .update(
      {
        nome,
        email,
        celular,
        idade,
        objetivo,
        peso,
        atualizado_em,
      },
      "*"
    )
    .then((aluno) => {
      if (aluno && aluno[0]) {
        res.status(200).json(aluno);
      } else {
        res.status(400).json({ error: "Aluno não encontrado!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

// Excluir um aluno DELETE DELETE /alunos/:id
routesApi.delete("/alunos/:id", (req, res) => {
  const { id } = req.params;

  return knex("alunos")
    .where({ id })
    .del("*")
    .then((aluno) => {
      if (aluno && aluno[0]) {
        res.status(200).json(aluno);
      } else {
        res.status(400).json({ error: "aluno não encontrado!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

module.exports = routesApi;
