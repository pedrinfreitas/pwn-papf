const express = require("express");
const morgan = require("morgan");

const port = process.env.PORT || 3333;

//ROUTES
const routesApi = require("./api");
const routesSite = require("./site");

const app = express();
app.use(express.json());

app.use(morgan("tiny"));
app.use("/api", routesApi);
app.use("/site", routesSite);

app.get("/", function (_req, res) {
  res.send(`
    <section style="margin: 2rem; text-align: center">
      <h1>Ops... estamos em construção...</h1>
      <h2>tente alguns desses links:</h2>
      <div style="display: flex; flex-direction: column">
        <a href="https://pwn-papf-v4.herokuapp.com/">Acesse aqui</a>
      </div>
    </section>
  `);
});

app.listen(port, () => {
  console.info(`..::### Servidor de pé, rodando na porta ${port} ###::..`);
});
