import { GameSession } from "../models/Game.js";
import User from "../models/Users.js";
import { v4 as uuidv4 } from "uuid";

export const startNewGame = async (req, res) => {
  const { userId } = req.params;
  const sessionId = uuidv4();
  console.log(userId, "");
  try {
    const newSession = new GameSession({
      sessionId,
      userId,
      snakeState: [{ x: 10, y: 10 }],
      foodPosition: {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      },
      score: 0,
      isGameOver: false,
    });

    await newSession.save();
    console.log({ userId }, { lastActiveSessionId: sessionId });
    await User.update({ userId }, { lastActiveSessionId: sessionId });
    return res.status(201).json(newSession);
  } catch (error) {
    console.error("Error starting new game:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
export const updateGameSession = async (req, res) => {
  try {
    const { userId, sessionId, snakeState, foodPosition, score, isGameOver } =
      req.body;
    let gameSession = await GameSession.get(sessionId);
    if (!gameSession) {
      return res.status(404).json({ message: "Game session not found" });
    }
    gameSession.snakeState = snakeState;
    gameSession.score = score;
    gameSession.foodPosition = foodPosition;
    gameSession.isGameOver = isGameOver;
    await gameSession.save();
    if (isGameOver) {
      await User.update({ userId }, { $REMOVE: ["lastActiveSessionId"] }); // ✅ Removes the field
    }
    return res
      .status(200)
      .json({ message: "Game state updated successfully", gameSession });
  } catch (error) {
    console.error("Error updating game state:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getGameSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const gameSession = await GameSession.get(sessionId);

    if (!gameSession) {
      return res.status(404).json({ message: "Game session not found" });
    }

    return res.status(200).json(gameSession);
  } catch (error) {
    console.error("Error fetching game session:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
