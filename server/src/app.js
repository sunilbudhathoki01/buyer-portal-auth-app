import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import authRoutes from "./routes/authRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
//databaseconnection
databaseConnection();
app.use(express.json());

// APIs
app.use("/api/auth", authRoutes);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`server is running at ${port} `);
});
