import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../context/gameContext";
const GameOverModal = ({ open, onClose, onRestart }) => {
  const navigate = useNavigate();
  const { resetGame } = useGame();

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      <DialogTitle sx={styles.dialogTitle}>Game Over!</DialogTitle>
      <DialogContent>
        <Typography variant="h6" textAlign="center">
          Oops! You lost the game. Try again?
        </Typography>
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Button variant="contained" color="primary" onClick={onRestart}>
          Restart Game
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            resetGame();
            onClose();
            navigate("/dashboard");
          }}
        >
          Back to Dashboard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
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

export default GameOverModal;
