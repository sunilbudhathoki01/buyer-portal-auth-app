import express from "express";
import {
  loginUserController,
  registeruserController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registeruserController);
router.post("/login", loginUserController);

export default router;
