const express = require("express");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const routes = require("./routes/routes.js"); // Importa las rutas

const app = express();

// Configura Helmet como middleware
app.use(helmet());

// Configura Express para procesar JSON
app.use(express.json());

// Ruta para la documentación de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Usa las rutas definidas
app.use("/", routes);

module.exports = app;
