import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
dotenv.config();

const app = express();

//databaseconnection
databaseConnection();

app.use(express.json());
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`server is running at ${port} `);
});
