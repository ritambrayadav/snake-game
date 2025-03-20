import { GameSession } from "../models/Game.js";
import { v4 as uuidv4 } from "uuid";

export const startNewGame = async (req, res) => {
  const { userId } = req.body;

  try {
    const newSession = new GameSession({
      sessionId: uuidv4(),
      userId,
      snakeState: [{ x: 10, y: 10 }],
      foodPosition: { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) },
      score: 0,
      isGameOver: false,
    });

    await newSession.save();
    return res.status(201).json(newSession);
  } catch (error) {
    console.error("Error starting new game:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
