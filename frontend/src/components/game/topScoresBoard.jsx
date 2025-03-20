import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import { getTopScores } from "../../api/score";
const TopScoreBoard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await getTopScores();
        setScores(response);
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🏆 TopScoreBoard
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Rank
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Player
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No scores available
                  </TableCell>
                </TableRow>
              ) : (
                scores.map((score, index) => (
                  <TableRow
                    key={score.userId}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{score.playerName}</TableCell>
                    <TableCell>{score.topScore}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default TopScoreBoard;
