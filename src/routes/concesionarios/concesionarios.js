const express = require("express");
const router = express.Router();

let concesionarios = require("../../models/concesionario.js"); // Aquí estás usando el modelo de concesionarios

// Obtener todos los concesionarios
router.get("/", (req, res) => {
  res.json(concesionarios);
});

// Crear un nuevo concesionario
router.post("/", (req, res) => {
  const nuevoConcesionario = {
    id: concesionarios.length + 1, // Aquí decides usar un id secuencial
    ...req.body,
    coches: [] // Inicializas el listado de coches vacío
  };
  concesionarios.push(nuevoConcesionario); // Añades el concesionario a la lista
  res.json({ message: "Concesionario agregado" });
});

// Obtener un concesionario por ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const concesionario = concesionarios.find((c) => c.id === id); // Buscar concesionario por id
  if (!concesionario) {
    return res.status(404).json({ message: "Concesionario no encontrado" });
  }
  res.json(concesionario); // Respuesta con los datos del concesionario
});

// Actualizar un concesionario por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = concesionarios.findIndex((c) => c.id === id); // Buscar el índice del concesionario
  if (index === -1) {
    return res.status(404).json({ message: "Concesionario no encontrado" });
  }

  // Actualizamos los datos del concesionario
  concesionarios[index] = { ...concesionarios[index], ...req.body };
  res.json({ message: "Concesionario actualizado" });
});

// Eliminar un concesionario por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = concesionarios.findIndex((c) => c.id === id); // Buscar el índice del concesionario
  if (index === -1) {
    return res.status(404).json({ message: "Concesionario no encontrado" });
  }

  concesionarios.splice(index, 1); // Eliminar el concesionario por índice
  res.json({ message: "Concesionario eliminado" });
});

module.exports = router;
