import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
      secondary: { main: "#ff4081" },
      background: {
        default: mode === "dark" ? "#121212" : "#f4f4f4",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#333",
        secondary: mode === "dark" ? "#aaaaaa" : "#555",
      },
    },
  });

export default getTheme;
