const express = require("express");

const router = express.Router();

const concesionarios = require("../../models/concesionario");

router.get("/", (request, response) => {
    response.json(concesionarios);
});

router.post("/", (request, response) => {
    const nuevoConcesionario = {
        id: concesionarios.length + 1,
        ...request.body,
        coches: []
    };
    concesionarios.push(nuevoConcesionario);
    response.json({message: "ok"});
});

router.get("/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const concesionario = concesionarios.find((c) => c.id === id);
    response.json({concesionario});
});

module.exports = router;