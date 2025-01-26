const express = require("express");
const router = express.Router();

// Este sería el modelo de concesionarios donde tienes los concesionarios y sus coches
let concesionarios = require("../../models/concesionario.js");

// Obtener todos los coches de un concesionario
router.get("/", (req, res) => {
  const concesionarioId = parseInt(req.params.id); // Obtienes el id del concesionario
  const concesionario = concesionarios.find((c) => c.id === concesionarioId);

  if (!concesionario) {
    return res.status(404).json({ message: "Concesionario no encontrado" });
  }

  res.json(concesionario.coches); // Devuelve todos los coches del concesionario
});

// Añadir un coche a un concesionario
router.post("/", (req, res) => {
  const concesionarioId = parseInt(req.params.id); // Obtienes el id del concesionario
  const concesionario = concesionarios.find((c) => c.id === concesionarioId);

  if (!concesionario) {
    return res.status(404).json({ message: "Concesionario no encontrado" });
  }

  // Validación de los datos del coche
  if (!req.body.marca || !req.body.modelo || !req.body.precio) {
    return res.status(400).json({ message: "Marca, modelo y precio son requeridos." });
  }

  // Crea un nuevo coche
  const nuevoCoche = {
    id: concesionario.coches.length > 0 
      ? concesionario.coches[concesionario.coches.length - 1].id + 1 
      : 1, // Asigna un id secuencial
    ...req.body
  };

  // Añadir el coche al concesionario
  concesionario.coches.push(nuevoCoche);
  res.json({ message: "Coche agregado" });
});

// Obtener un coche específico de un concesionario
router.get("/:cocheId", (req, res) => {
  const concesionarioId = parseInt(req.params.id); // Obtienes el id del concesionario
  const cocheId = parseInt(req.params.cocheId); // Obtienes el id del coche
  const concesionario = concesionarios.find((c) => c.id === concesionarioId);

  if (!concesionario) {
    return res.status(404).json({ message: "Concesionario no encontrado" });
  }

  const coche = concesionario.coches.find((c) => c.id === cocheId);
  if (!coche) {
    return res.status(404).json({ message: "Coche no encontrado" });
  }

  res.json(coche); // Devuelve el coche encontrado
});

// Actualizar un coche de un concesionario
router.put("/:cocheId", (req, res) => {
  const concesionarioId = parseInt(req.params.id); // Obtienes el id del concesionario
  const cocheId = parseInt(req.params.cocheId); // Obtienes el id del coche
  const concesionario = concesionarios.find((c) => c.id === concesionarioId);

  if (!concesionario) {
    return res.status(404).json({ message: "Concesionario no encontrado" });
  }

  const cocheIndex = concesionario.coches.findIndex((c) => c.id === cocheId);
  if (cocheIndex === -1) {
    return res.status(404).json({ message: "Coche no encontrado" });
  }

  // Actualizar los detalles del coche
  concesionario.coches[cocheIndex] = { 
    ...concesionario.coches[cocheIndex], 
    ...req.body 
  };

  res.json({ message: "Coche actualizado" });
});

// Eliminar un coche de un concesionario
router.delete("/:cocheId", (req, res) => {
  const concesionarioId = parseInt(req.params.id); // Obtienes el id del concesionario
  const cocheId = parseInt(req.params.cocheId); // Obtienes el id del coche
  const concesionario = concesionarios.find((c) => c.id === concesionarioId);

  if (!concesionario) {
    return res.status(404).json({ message: "Concesionario no encontrado" });
  }

  const cocheIndex = concesionario.coches.findIndex((c) => c.id === cocheId);
  if (cocheIndex === -1) {
    return res.status(404).json({ message: "Coche no encontrado" });
  }

  // Eliminar el coche
  concesionario.coches.splice(cocheIndex, 1);
  res.json({ message: "Coche eliminado" });
});

module.exports = router;
