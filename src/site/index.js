const express = require("express");
const routesSite = express.Router();

routesSite.use(express.static("src/site/public"));

module.exports = routesSite;
