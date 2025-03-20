import React from "react";
import { useGame } from "../../context/gameContext";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Scoreboard = () => {
  const theme = useTheme();
  const { score } = useGame();

  return (
    <Box sx={styles.container(theme)}>
      <Typography variant="h6">Score: {score}</Typography>
    </Box>
  );
};

const styles = {
  container: (theme) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    fontSize: 20,
    fontWeight: "bold",
  }),
};

export default Scoreboard;
