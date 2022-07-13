const express = require("express");
const morgan = require("morgan");

const port = process.env.PORT || 3333;

//ROUTES
const routesApi = require("./api");
const routesClient = require("./client");

const app = express();
app.use(express.json());

app.use(morgan("tiny"));
app.use("/api", routesApi);
app.use("/site", routesClient);

app.listen(port, () => {
  console.info(`..::### Servidor de pé, rodando na porta ${port} ###::..`);
});
