require("dotenv").config();
const express = require("express");
const knex = require("../db/knex");
const jwt = require("jsonwebtoken");

const routesApi = express.Router();

// Checar token
const checkToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(403).json({ message: "Ops... Token requerida!" }).end();
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ENV_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Ops... Token invalida!" }).end();
      } else {
        req.token = decodedToken;
        req.userId = decodedToken.id;
        next();
      }
    });
  }
};

const isAdmin = (req, res, next) => {
  knex("usuarios")
    .where({ id: req.userId })
    .first()
    .then((usuario) => {
      if (usuario) {
        let roles = usuario.roles.split(";");
        let adminRole = roles.find((i) => i === "ADMIN");
        if (adminRole === "ADMIN") {
          next();
          return;
        } else {
          res.status(403).json({ message: "Ops... Role de ADMIN requerida" });
          return;
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Ops... Erro ao verificar roles de usuário - " + err.message,
      });
    });
};

// Incluir um aluno CREATE POST / alunos
routesApi.post("/alunos", checkToken, isAdmin, (req, res) => {
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
routesApi.get("/alunos/:id", checkToken, (req, res) => {
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
routesApi.put("/alunos/:id", checkToken, isAdmin, (req, res) => {
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
routesApi.delete("/alunos/:id", checkToken, isAdmin, (req, res) => {
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
