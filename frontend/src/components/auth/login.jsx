import React, { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { user, loading, error, fetchUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await fetchUser(userData);
    setUserData({ email: "", password: "" });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: isMobile ? "90%" : "100%",
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleOnSubmit}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            name="email"
            value={userData.email}
            onChange={onChange}
            required
            fullWidth
            variant="outlined"
            autoComplete="email"
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={userData.password}
            onChange={onChange}
            required
            fullWidth
            variant="outlined"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Typography sx={{ mt: 2 }}>
          Don't have an account? <Link to="/register">Register Here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
