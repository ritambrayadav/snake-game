import { useEffect } from "react";
import { useGame } from "../context/gameContext";
import { getRandomPosition, checkCollision } from "../utils/helper"

const GRID_SIZE = 20;

const useGameLogic = () => {
  const {
    snake,
    setSnake,
    food,
    setFood,
    direction,
    setDirection,
    setIsGameOver,
    setScore,
  } = useGame();

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
    if (!snake.length) return;

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

      if (checkCollision(head, newSnake)) {
        setIsGameOver(true);
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
  }, [snake, direction]);

  return {};
};

export default useGameLogic;
