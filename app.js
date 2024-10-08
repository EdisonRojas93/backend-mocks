import { config } from "dotenv";
import express from "express";
import routes from "./routes/route.js";
import cors from 'cors';

config();

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());
app.use("/", routes);

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
