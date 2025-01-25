const express = require("express");
const router = express.Router();

// Rutas de los concesionarios
router.use(
  "/concesionarios",
  require("./concesionarios/concesionarios.js")
);

// Rutas de los coches dentro de concesionarios
router.use("/concesionarios/:id/coches", require("./coches/coches.js"));

module.exports = router;
