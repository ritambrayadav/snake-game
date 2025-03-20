import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme/theme";

const ThemeProviderWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
