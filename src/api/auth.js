const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const knex = require("../db/knex");

const secRouter = express.Router();

secRouter.post("/login", express.json(), (req, res) => {
  const { login, senha } = req.body;

  knex("usuarios")
    .where({ login })
    .first()
    .then((usuario) => {
      if (usuario) {
        const comparaSenha = bcrypt.compareSync(senha, usuario.senha);
        if (comparaSenha) {
          let token = jwt.sign({ id: usuario.id }, process.env.ENV_SECRET_KEY, {
            expiresIn: 300,
          });
          res
            .status(200)
            .json({
              id: usuario.id,
              token: token,
            })
            .end();
        } else {
          res
            .status(401)
            .json({ message: "Ops... Login ou senha incorretos..." })
            .end();
        }
      } else {
        res
          .status(401)
          .json({ message: "Ops... Login ou senha incorretos..." })
          .end();
      }
    })
    .catch((err) => res.status(500).json({ message: `Ops.. ${err.message}` }));
});

secRouter.post("/registro", express.json(), (req, res) => {
  const { nome, email, login, senha } = req.body;

  if (!nome || !email || !login || !senha) {
    return res.status(400).json({ error: "Ops, faltou preencher algum dado." });
  }

  const criarUsuario = {
    nome,
    email,
    login,
    senha: bcrypt.hashSync(senha, 8),
  };

  knex("usuarios")
    .insert(criarUsuario, "*")
    .then((usuario) => res.status(201).json(usuario))
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

module.exports = secRouter;
