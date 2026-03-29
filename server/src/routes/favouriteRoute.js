import express from "express";
import auth from "../middlewares/auth.js";
import {
  addToFavourites,
  getFavourites,
  removeFromFavourites,
} from "../controllers/Favourite.js";

const router = express.Router();

router.get("/", auth, getFavourites);
router.post("/:propertyId", auth, addToFavourites);
router.delete("/:propertyId", auth, removeFromFavourites);

export default router;
