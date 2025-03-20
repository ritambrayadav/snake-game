import React, { useEffect, useState } from "react";
import { useGame } from "../../context/gameContext";
import useGameLogic from "../../hooks/useGameLogic";
import Snake from "./Snake";
import Food from "./Food";
import Scoreboard from "./Scoreboard";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { startGame } from "../../api/game";
import { getUserFromSession } from "../../utils/helper";
import { useTheme } from "@mui/material/styles";

const GameBoard = () => {
  const theme = useTheme();
  const { sessionId } = useParams();
  const { setSessionId, loadGameSession, isGameOver } = useGame();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (sessionId) {
      setSessionId(sessionId);
      loadGameSession(sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    if (isGameOver) {
      setOpenModal(true);
    }
  }, [isGameOver]);

  useGameLogic();

  const handleRestart = async () => {
    const userId = getUserFromSession()?.userId;
    if (!userId) return;

    try {
      const response = await startGame(userId);
      if (response?.sessionId) {
        setOpenModal(false);
        setSessionId(response.sessionId);
        navigate(`/game/${response.sessionId}`);
      } else {
        console.error("Failed to get sessionId from startGame API");
      }
    } catch (error) {
      console.error("Error starting new game:", error);
    }
  };

  return (
    <Box sx={styles.container}>
      <Scoreboard />
      <Box sx={styles.gameBoard(theme)}>
        <Snake />
        <Food />
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle sx={styles.dialogTitle}>Game Over!</DialogTitle>
        <DialogContent>
          <Typography variant="h6" textAlign="center">
            Oops! You lost the game. Try again?
          </Typography>
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Button variant="contained" color="primary" onClick={handleRestart}>
            Restart Game
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setOpenModal(false);
              navigate("/dashboard");
            }}
          >
            Back to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  gameBoard: (theme) => ({
    width: 400,
    height: 400,
    display: "grid",
    gridTemplateColumns: "repeat(20, 1fr)",
    border: `2px solid ${theme.palette.primary.dark}`,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  }),
  dialogTitle: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
  dialogActions: {
    justifyContent: "center",
    paddingBottom: 2,
  },
};

export default GameBoard;
