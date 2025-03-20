import React from "react";
import { useGame } from "../../context/gameContext";
import { Box, Typography } from "@mui/material";

const Scoreboard = () => {
  const { score } = useGame();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#000",
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
      }}
    >
      <Typography variant="h6">Score: {score}</Typography>
    </Box>
  );
};

export default Scoreboard;
