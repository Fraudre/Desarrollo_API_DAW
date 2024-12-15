const express = require("express");

const router = express.Router();

const concesionarios = require("../../models/concesionario");

router.get("/", (request, response) => {
  const concesionarioId = parseInt(request.baseUrl.split("/").slice(-2, -1)[0]);
  const concesionario = concesionarios.find((c) => c.id === concesionarioId);
  response.json(concesionario.listado_coches);
});



module.exports = router;
