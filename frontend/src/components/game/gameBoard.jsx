import React, { useEffect } from "react";
import { useGame } from "../../context/gameContext";
import useGameLogic from "../../hooks/useGameLogic";
import Snake from "./Snake";
import Food from "./Food";
import Scoreboard from "./Scoreboard";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const GameBoard = () => {
  const { sessionId } = useParams();
  const { setSessionId, loadGameSession, isGameOver } = useGame();

  useEffect(() => {
    if (sessionId) {
      setSessionId(sessionId);
      loadGameSession(sessionId);
    }
  }, [sessionId]);

  useGameLogic();
  useGameLogic();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Scoreboard />
      <Box
        sx={{
          width: 400,
          height: 400,
          display: "grid",
          gridTemplateColumns: "repeat(20, 1fr)",
          border: "2px solid black",
          position: "relative",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Snake />
        <Food />
        {isGameOver && (
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "35%",
              color: "red",
              fontSize: 24,
            }}
          >
            Game Over
          </div>
        )}
      </Box>
    </Box>
  );
};

export default GameBoard;
