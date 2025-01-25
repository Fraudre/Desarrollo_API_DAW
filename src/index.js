const app = require("./app.js"); // Importa la aplicación configurada
const { MongoClient } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 8080; // Puerto del servidor
const uri = "mongodb+srv://faudre755:zxuctr2004@cluster0.42hdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db;

app.listen(port, async () => {
  try {
    // Conexión a MongoDB
    await client.connect();
    db = client.db("Cluster0");
    console.log(`Connected to MongoDB and server running on port: ${port}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Termina la ejecución si la conexión falla
  }
});

// Exportar la base de datos para su uso en otros módulos
module.exports = { db };
