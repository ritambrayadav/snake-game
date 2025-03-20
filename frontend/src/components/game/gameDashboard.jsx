import React, { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Scoreboard from "../game/scoreBoard";
import { startGame } from "../../api/game";
import { useGame } from "../../context/gameContext";
import { getUserById } from "../../api/users";
const GameDashboard = () => {
  const userId = JSON.parse(sessionStorage.getItem("user"))?.userId;
  const navigate = useNavigate();
  const { setSessionId } = useGame();
  const [lastActiveSessionId, setLastActiveSessionId] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(userId);
        if (userData?.lastActiveSessionId) {
          setLastActiveSessionId(userData.lastActiveSessionId);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleNewGame = async () => {
    try {
      const response = await startGame(userId);
      if (response?.sessionId) {
        setSessionId(response.sessionId);
        navigate(`/game/${response.sessionId}`);
      } else {
        console.error("Failed to get sessionId from startGame API");
      }
    } catch (error) {
      console.error("Error starting new game:", error);
    }
  };

  const handleResumeGame = () => {
    if (lastActiveSessionId) {
      navigate(`/game/${lastActiveSessionId}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Snake Game Dashboard
      </Typography>

      {lastActiveSessionId && (
        <Button
          variant="contained"
          color="primary"
          sx={{ m: 1 }}
          onClick={handleResumeGame}
        >
          Resume Game
        </Button>
      )}
      <Button
        variant="contained"
        color="secondary"
        sx={{ m: 1 }}
        onClick={handleNewGame}
      >
        Start New Game
      </Button>

      <Scoreboard />
    </Box>
  );
};

export default GameDashboard;
