import express from "express";
import { startNewGame } from "../controllers/gameController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", startNewGame);

export default router;
