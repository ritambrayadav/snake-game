import { useEffect } from "react";
import { useGame } from "../context/gameContext";
import { getRandomPosition, checkCollision } from "../utils/helper";

const GRID_SIZE = 20;

const useGameLogic = () => {
  const {
    sessionId,
    snake,
    setSnake,
    food,
    setFood,
    direction,
    setDirection,
    isGameOver,
    setIsGameOver,
    setScore,
    loadGameSession,
    saveGameSession,
    setOpenModal,
  } = useGame();

  useEffect(() => {
    if (sessionId) {
      loadGameSession(sessionId);
    }
  }, [sessionId]);
  useEffect(() => {
    if (isGameOver) {
      saveGameSession();
    }
  }, [isGameOver]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      const directions = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
      };
      if (directions[key]) setDirection(directions[key]);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!snake.length || isGameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      let head = { ...newSnake[0] };

      switch (direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
        default:
          return;
      }

      if (
        checkCollision(head, newSnake) ||
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setIsGameOver(true);
        setOpenModal(true);
        loadGameSession(sessionId);
        setTimeout(() => saveGameSession(true), 0);
        return;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 1);
        setFood(getRandomPosition(GRID_SIZE));
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [
    snake,
    direction,
    isGameOver,
    food.x,
    food.y,
    setSnake,
    setIsGameOver,
    setScore,
    setFood,
  ]);

  return {};
};

export default useGameLogic;
