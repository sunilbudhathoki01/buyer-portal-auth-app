import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import authRoutes from "./routes/authRoute.js";
import propertyRoute from "./routes/propertyRoute.js";
import favouriteRoute from "./routes/favouriteRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
//databaseconnection
databaseConnection();

//cors setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
// APIs
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoute);
app.use("/api/favourites", favouriteRoute);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`server is running at ${port} `);
});
