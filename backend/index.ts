import express, { Express } from "express";
import dotenv from "dotenv";
import { conectDB } from "./config/db";

dotenv.config();

const app: Express = express();

conectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});