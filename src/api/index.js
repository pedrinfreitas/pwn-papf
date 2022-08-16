require("dotenv").config();
const express = require("express");
const knex = require("../db/knex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

// Checkar admin
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

const fnIsAdmin = (id) => {
  knex("usuarios")
    .where({ id })
    .first()
    .then((usuario) => {
      if (usuario) {
        const roles = usuario.roles.split(";");
        const adminRole = roles.find((i) => i === "ADMIN");
        if (adminRole === "ADMIN") {
          return true;
        } else {
          return false;
        }
      }
    })
    .catch((_err) => {
      return false;
    });
};

// Login - POST
routesApi.post("/login", (req, res) => {
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

// Registro - POST
routesApi.post("/registro", (req, res) => {
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

// Lista - GET
routesApi.get("/usuarios", (_req, res) => {
  return knex("usuarios")
    .select(
      "id",
      "nome",
      "email",
      "login",
      "roles",
      "criado_em",
      "atualizado_em"
    )
    .then((usuarios) => res.json(usuarios))
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

// ID - GET
routesApi.get("/usuario/:id", checkToken, (req, res) => {
  let { id } = req.params;

  return knex("usuarios")
    .select(
      "id",
      "nome",
      "email",
      "login",
      "roles",
      "criado_em",
      "atualizado_em"
    )
    .where({ id })
    .first()
    .then((usuario) => res.json(usuario))
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

// Atualiza - PUT
routesApi.put("/usuario/:id", checkToken, (req, res) => {
  const { id } = req.params;
  const { nome, senha, email, login, roles } = req.body;

  let atualizaUsuario = {
    nome,
    senha: bcrypt.hashSync(senha, 8),
    email,
    login,
    atualizado_em: knex.fn.now(),
  };

  //Verifica se usuario é admin para poder mudar a ROLES
  if (fnIsAdmin(id)) {
    atualizaUsuario.push(roles);
  }

  //TODO: verificar se é o id autenticado para alterar a senha (imperdir mudança de senha de outro usuario)

  return knex("usuarios")
    .where({ id })
    .update(atualizaUsuario, "*")
    .then((usuario) => {
      if (usuario && usuario[0]) {
        res.status(200).json(usuario);
      } else {
        res.status(400).json({ error: "Usuário não encontrado!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Ops, algo deu errado, ${err.message}`,
      });
    });
});

// Excluir - DELETE
routesApi.delete("/usuario/:id", checkToken, isAdmin, (req, res) => {
  const { id } = req.params;

  return knex("usuarios")
    .where({ id })
    .del("*")
    .then((usuario) => {
      if (usuario && usuario[0]) {
        res.status(200).json(usuario);
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
