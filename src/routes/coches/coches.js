const express = require("express");

const router = express.Router();

const concesionarios = require("../../models/concesionario");

router.get("/", (request, response) => {
  const concesionarioId = parseInt(request.baseUrl.split("/").slice(-2, -1)[0]);
  const concesionario = concesionarios.find((c) => c.id === concesionarioId);
  response.json(concesionario.listado_coches);
});

router.post("/", (request, response) => {
  const concesionarioId = parseInt(request.baseUrl.split("/").slice(-2, -1)[0]);
  const concesionario = concesionarios.find((c) => c.id === concesionarioId);
  const nuevoCoche = {
    id:
      concesionarios.coches.length > 0
        ? concesionario.coches[concesionario.coches.length - 1].id + 1
        : 1,
    ...request.body,
  };
  concesionarios.coches.push(nuevoCoche);
  response.json({ message: "ok" });
});

router.get("/:id", (request, response) => {
  const concesionarioId = parseInt(request.baseUrl.split("/").slice(-2, -1)[0]);
  const concesionario = concesionarios.find((c) => c.id === concesionarioId);
  const cocheId = parseInt(request.params.id);
  const coche = concesionario.listado_coches.find((c) => c.id === cocheId);
  response.json({coche});
});

module.exports = router;
