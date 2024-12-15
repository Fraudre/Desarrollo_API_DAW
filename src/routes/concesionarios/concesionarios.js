const express = require("express");

const router = express.Router();

const concesionarios = require("../../models/concesionario");

router.get("/", (request, response) => {
    response.json(concesionarios);
});

module.exports = router;