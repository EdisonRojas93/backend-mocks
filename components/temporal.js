import connectDB from "../config/db.js";

const createTTLIndex = async (data) => {
  try {
    const database = await connectDB();
    const collection = database.collection('temporalData');
    // Crear el índice TTL en el campo 'createdAt' con un tiempo de vida de 1 día (86400 segundos)
    await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 });
    console.log('Índice TTL creado exitosamente');
    // Insertar un documento con el campo 'createdAt'
    const doc = {
        ...data,
        createdAt: new Date() // Fecha actual
    };
    await collection.insertOne(doc);
    console.log('Documento insertado');



  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

const getSessionInfo = async (token) => {
  try {
    const database = await connectDB();
    const collection = database.collection('temporalData');
    // Crear el índice TTL en el campo 'createdAt' con un tiempo de vida de 1 día (86400 segundos)
    
    const document = await collection.findOne({ token: token.trim() });
    console.log(document)
    return document
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

export { createTTLIndex, getSessionInfo};