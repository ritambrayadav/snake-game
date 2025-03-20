import { createContext, useContext, useState } from "react";
import { updateGameState, getGameState } from "../api/game.js";
const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.userId;
  const userName = user?.userName;

  const loadGameSession = async (sessionId) => {
    const session = await getGameState(sessionId);
    if (session) {
      setSnake(session.snakeState);
      setFood(session.foodPosition);
      setScore(session.score);
      setIsGameOver(session.isGameOver);
      setSessionId(session.sessionId);
    }
  };

  const saveGameSession = async (gameOverState = isGameOver) => {
    if (sessionId) {
      await updateGameState({
        userName,
        userId,
        sessionId,
        snakeState: snake,
        foodPosition: food,
        score,
        isGameOver: gameOverState,
      });
    }
  };
  return (
    <GameContext.Provider
      value={{
        snake,
        setSnake,
        food,
        setFood,
        direction,
        setDirection,
        isGameOver,
        setIsGameOver,
        score,
        setScore,
        sessionId,
        setSessionId,
        loadGameSession,
        saveGameSession,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
