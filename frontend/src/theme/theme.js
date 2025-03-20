import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007FFF", // Vibrant blue
    },
    secondary: {
      main: "#FF4081", // Stylish pink
    },
    background: {
      default: "#F4F6F8", // Soft gray background
      paper: "#FFFFFF", // White cards
    },
    text: {
      primary: "#333333", // Dark gray for readability
      secondary: "#757575", // Subtle gray
    },
    error: {
      main: "#D32F2F", // Red for errors
    },
    success: {
      main: "#4CAF50", // Green for success
    },
    warning: {
      main: "#FFA726", // Orange for warnings
    },
    info: {
      main: "#29B6F6", // Light blue for info
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: 16,
        },
      },
    },
  },
});

export default theme;
