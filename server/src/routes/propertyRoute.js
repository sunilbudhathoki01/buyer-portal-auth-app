import express from "express";
import {
  addPropertyController,
  getProperties,
} from "../controllers/Property.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
const router = express.Router();
router.get("/", getProperties);
router.post("/", auth, upload.single("image"), addPropertyController);
export default router;
