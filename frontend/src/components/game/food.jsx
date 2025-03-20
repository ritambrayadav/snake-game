import React from "react";
import { useGame } from "../../context/gameContext";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Food = () => {
  const { food } = useGame();
  const theme = useTheme();

  return <Box sx={foodStyles(theme, food)} />;
};

const foodStyles = (theme, food) => ({
  width: theme.spacing(2.5),
  height: theme.spacing(2.5),
  backgroundColor: theme.palette.error.main,
  borderRadius: "50%",
  position: "absolute",
  top: food.y * theme.spacing(2.5),
  left: food.x * theme.spacing(2.5),
  boxShadow: `0px 0px 8px ${theme.palette.error.dark}`,
});

export default Food;
