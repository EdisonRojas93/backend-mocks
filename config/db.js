import { MongoClient } from "mongodb";

let client;

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!client) {
    client = new MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Conectado a MongoDB");
  }
  return client.db("mocks");
}

export default connectDB;
