import {ValidateComponent, GenerateUrl} from "../components/index.js";
import connectDB from "../config/db.js";

const getData = async (req, res) => {
  const path = req.originalUrl.substring(1);
  const newPath = GenerateUrl(path, req);
  try {
    const db = await connectDB();
    const collection = db.collection("endpoints");

    const document = await collection.findOne({ path: newPath });
    console.log(document);
    if (document) {
      const result = ValidateComponent(path, document.response);
      res.json(result);
    } else {
      res.status(404).json({ error: "Ruta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export { getData };
