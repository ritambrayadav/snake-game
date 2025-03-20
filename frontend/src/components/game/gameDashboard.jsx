import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { startGame } from "../../api/game";
import { useGame } from "../../context/gameContext";
import { getUserById } from "../../api/users";
import TopScoreBoard from "./topScoresBoard";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Replay from "@mui/icons-material/Replay";
import { getUserFromSession } from "../../utils/helper";
import { useTheme } from "@mui/material/styles";

const GameDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setSessionId } = useGame();
  const userId = getUserFromSession()?.userId;
  const [lastActiveSessionId, setLastActiveSessionId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(userId);
        if (userData?.lastActiveSessionId) {
          setLastActiveSessionId(userData.lastActiveSessionId);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
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
    <Box sx={styles.container}>
      <Card sx={styles.card(theme)}>
        <CardContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2} justifyContent="center" mt={2}>
              {lastActiveSessionId && (
                <Grid item xs={12} md={6} sx={styles.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Replay />}
                    sx={styles.button}
                    onClick={handleResumeGame}
                  >
                    Resume Game
                  </Button>
                </Grid>
              )}

              <Grid item xs={12} md={6} sx={styles.buttonContainer}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PlayArrow />}
                  sx={styles.button}
                  onClick={handleNewGame}
                >
                  Start New Game
                </Button>
              </Grid>
            </Grid>
          )}

          <Box mt={3}>
            <TopScoreBoard />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const styles = {
  container: {
    maxWidth: 500,
    mx: "auto",
    textAlign: "center",
    mt: 5,
    p: 2,
  },
  card: (theme) => ({
    p: 2,
    borderRadius: 3,
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.light}`,
  }),
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    fontSize: "1rem",
    py: 1,
    width: "100%",
  },
};

export default GameDashboard;
