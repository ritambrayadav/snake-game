import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import { UserProvider } from "./context/userContext";
import ProtectedRoute from "./components/auth/protectedRoutes";
import { GameProvider } from "./context/gameContext.jsx";
import GameBoard from "./components/game/gameBoard";
import GameDashboard from "./components/game/gameDashboard.jsx";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <GameProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<GameDashboard />} />
              <Route path="/game" element={<GameBoard />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </GameProvider>
      </UserProvider>
    </div>
  );
}

export default App;
