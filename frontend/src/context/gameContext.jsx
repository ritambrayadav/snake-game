import { createContext, useContext, useState } from "react";
import { updateGameState, getGameState } from "../api/game.js";
const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const loadGameSession = async (id) => {
    const session = await getGameState(id);
    if (session) {
      setSnake(session.snakeState);
      setFood(session.foodPosition);
      setScore(session.score);
      setIsGameOver(session.isGameOver);
      setSessionId(session.sessionId);
    }
  };

  const saveGameSession = async () => {
    if (sessionId) {
      await updateGameState(sessionId, {
        snakeState: snake,
        foodPosition: food,
        score,
        isGameOver,
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
