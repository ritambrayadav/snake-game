import React from "react";
import { useGame } from "../../context/gameContext";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Snake = () => {
  const theme = useTheme();
  const { snake } = useGame();

  return (
    <>
      {snake.map((segment, index) => (
        <Box key={index} sx={styles.segment(theme, segment)} />
      ))}
    </>
  );
};

const styles = {
  segment: (theme, segment) => ({
    width: 20,
    height: 20,
    backgroundColor: theme.palette.success.main, // Dynamic color
    position: "absolute",
    top: segment.y * 20,
    left: segment.x * 20,
  }),
};

export default Snake;
