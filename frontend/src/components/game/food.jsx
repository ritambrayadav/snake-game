import React from "react";
import { useGame } from "../../context/GameContext";
import { Box } from "@mui/material";

const Food = () => {
  const { food } = useGame();

  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        backgroundColor: "red",
        position: "absolute",
        top: food.y * 20,
        left: food.x * 20,
      }}
    />
  );
};

export default Food;
