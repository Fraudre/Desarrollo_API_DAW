require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://faudre755:zxuctr2004@cluster0.42hdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!uri) {
  console.error(
    "La URI de MongoDB no está definida. Verifica tu archivo .env."
  );
  process.exit(1);
}

(async () => {
  const client = new MongoClient(uri);

  try {
    console.log("Intentando conectar a MongoDB...");
    await client.connect();
    console.log("Conexión exitosa a MongoDB.");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
  } finally {
    await client.close();
  }
})();
