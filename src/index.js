const express = require("express");

const router = express.Router();

router.use("/concesionarios", require("./routes/concesionarios/concesionarios"));

router.use("/concesionarios/:id/coches", require("./routes/coches/coches"));

module.exports = router;