const express = require("express");
const helmet = require("helmet"); // Importa Helmet

const router = require("./index");

const app = express();

// Usa Helmet como middleware
app.use(helmet());

// Configura Express para procesar JSON
app.use(express.json());

// Configura las rutas
app.use("/", router);

module.exports = app;
