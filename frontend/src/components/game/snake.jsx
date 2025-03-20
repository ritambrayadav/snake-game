import React from "react";
import { useGame } from "../../context/gameContext";
import { Box } from "@mui/material";

const Snake = () => {
  const { snake } = useGame();

  return (
    <>
      {snake.map((segment, index) => (
        <Box
          key={index}
          sx={{
            width: 20,
            height: 20,
            backgroundColor: "green",
            position: "absolute",
            top: segment.y * 20,
            left: segment.x * 20,
          }}
        />
      ))}
    </>
  );
};

export default Snake;
