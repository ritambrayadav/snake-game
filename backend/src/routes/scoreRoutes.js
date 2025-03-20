import express from "express";
import { getTopScores } from "../controllers/scoreController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getTopScores);

export default router;
