import express from "express";
import { register, login, getUserById } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", authMiddleware, getUserById);

export default router;
