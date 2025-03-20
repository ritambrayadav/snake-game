import React, { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { getScoreboard, checkActiveSession } from "../api/gameApi";
import Scoreboard from "../game/scoreBoard";
// import { useAuth } from "../context/AuthContext";
import { startGame } from "../../api/game";

const GameDashboard = () => {
  // const { user } = useAuth();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  const [activeSession, setActiveSession] = useState(null);
  // const [scores, setScores] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (user) {
  //       const session = await checkActiveSession(user.userId);
  //       setActiveSession(session && !session.isGameOver ? session : null);
  //     }
  //     const scoresData = await getScoreboard();
  //     setScores(scoresData);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [user]);

  const handleNewGame = async () => {
    navigate("/game");
    await startGame();
  };

  const handleResumeGame = () => {
    if (activeSession) {
      navigate("/game");
    }
  };

  // if (loading) {
  //   return <CircularProgress />;
  // }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Snake Game Dashboard
      </Typography>

      {activeSession && (
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
