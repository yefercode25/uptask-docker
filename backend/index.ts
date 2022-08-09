import express, { Express } from "express";
import dotenv from "dotenv";
import { conectDB } from "./config/db";

import usuarioRoutes from "./routes/usuario";

dotenv.config();

const app: Express = express();
app.use(express.json());

conectDB();

app.use("/api/usuarios", usuarioRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});