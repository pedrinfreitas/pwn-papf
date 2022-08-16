const express = require("express");
const morgan = require("morgan");

const port = process.env.PORT || 3333;

//ROUTES
const routesApi = require("./api");
const routesSite = require("./site");
const routesAuth = require("./api/auth");

const app = express();
app.use(express.json());

app.use(morgan("tiny"));
app.use("/api", routesApi);
app.use("/site", routesSite);
app.use("/auth", routesAuth);

app.get("/", function (req, res) {
  res.send(`
    <section style="margin: 2rem; text-align: center">
      <h1>Ops... estamos em construção...</h1>
      <h2>tente alguns desses links:</h2>
      <div style="display: flex; flex-direction: column">
        <a href="http://localhost:3333/api/alunos">Alunos</a>
        <a href="http://localhost:3333/api/1">Aluno id:1</a>
        <a href="localhost:3000/">Autenticação</a>
      </div>
    </section>
  `);
});

app.listen(port, () => {
  console.info(`..::### Servidor de pé, rodando na porta ${port} ###::..`);
});
