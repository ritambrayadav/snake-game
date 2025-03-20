import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import { UserProvider } from "./context/userContext";
import { GameProvider } from "./context/gameContext.jsx";
import ProtectedRoute from "./components/auth/protectedRoutes";
import GameBoard from "./components/game/gameBoard";
import GameDashboard from "./components/game/gameDashboard.jsx";
import ThemeProviderWrapper from "./context/themeContext.jsx";
function App() {
  return (
    <ThemeProviderWrapper>
      <UserProvider>
        <GameProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <GameDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/game/:sessionId"
                element={
                  <ProtectedRoute>
                    <GameBoard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </GameProvider>
      </UserProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
