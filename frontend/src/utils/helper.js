export const getRandomPosition = (gridSize) => ({
  x: Math.floor(Math.random() * gridSize),
  y: Math.floor(Math.random() * gridSize),
});

export const checkCollision = (head, snake) => {
  return (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= 20 ||
    head.y >= 20 ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y) // Self-collision
  );
};
