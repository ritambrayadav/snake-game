import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/users";
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

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await registerUser(userData);
      setUserData({ name: "", email: "", password: "" });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          Register
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 1, mb: 1 }}>
            {error}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleOnSubmit}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            type="text"
            name="name"
            value={userData.name}
            onChange={onChange}
            required
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Email"
            type="email"
            name="email"
            value={userData.email}
            onChange={onChange}
            required
            fullWidth
            variant="outlined"
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
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }}>
          Already have an account? <Link to="/">Login Here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
