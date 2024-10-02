import { config } from "dotenv";
import express from "express";
import routes from "./routes/route.js";

config();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
