import express from "express";
import {
  startNewGame,
  updateGameSession,
  getGameSession,
} from "../controllers/gameController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", startNewGame);
router.put("/", updateGameSession);
router.get("/:sessionId", getGameSession);

export default router;
