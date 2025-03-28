import { createContext, useContext, useState } from "react";
import { updateGameState, getGameState } from "../api/game.js";
const GameContext = createContext();
import { getUserFromSession } from "../utils/helper.js";
export const GameProvider = ({ children }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const userId = getUserFromSession()?.userId;
  const userName = getUserFromSession()?.userName;
  const [openModal, setOpenModal] = useState(false);
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
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection("");
    setIsGameOver(false);
    setScore(0);
    setSessionId(null);
    setOpenModal(false);
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
        openModal,
        setOpenModal,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
