/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");

require("dotenv").config();

// Inicializamos la aplicación
const app = express();

const uri = process.env.MONGODB;

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

// Arrancamos la aplicación
app.listen(port, async () => {
  await client.connect();
  db = await client.db("mi-proyecto");

  console.log(`Servidor desplegado en puerto: ${port}`);
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Listar todos los concesionarios
app.get("/concesionarios", async (req, res) => {
  try {
    const concesionarios = await db
      .collection("concesionarios")
      .find()
      .toArray();
    res.json(concesionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Añadir un nuevo concesionario
app.post("/concesionarios", async (req, res) => {
  try {
    const nuevoConcesionario = {
      ...req.body,
      listado_coches: [],
    };
    const result = await db
      .collection("concesionarios")
      .insertOne(nuevoConcesionario);
    res.json({ message: "Concesionario agregado", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un concesionario por ID
app.get("/concesionarios/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const concesionario = await db
      .collection("concesionarios")
      .findOne({ _id: new ObjectId(id) });
    res.json(concesionario || { message: "Concesionario no encontrado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un concesionario
app.put("/concesionarios/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const result = await db
      .collection("concesionarios")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });
    res.json({ message: "Concesionario actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un concesionario
app.delete("/concesionarios/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db
      .collection("concesionarios")
      .deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Concesionario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
