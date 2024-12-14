const express = require("express");

//const concesionarios = require("./models/concesionario");

const app = express();

app.use(express.json());

//app.use("/concesionarios", concesionarios);

module.exports = app;