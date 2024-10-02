import connectDB from "../config/db.js";

const getData = async (req, res) => {
  const path = req.path.substring(1);

  try {
    const db = await connectDB();
    const collection = db.collection("endpoints");

    const document = await collection.findOne({ "path": path });

    if (document) {
      res.json(document.response);
    } else {
      res.status(404).json({ error: "Ruta no encontrada" });
    }
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export { getData };
