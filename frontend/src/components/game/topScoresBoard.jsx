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
import { useTheme } from "@mui/material/styles";

const TopScoreBoard = () => {
  const theme = useTheme();
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
    <Container maxWidth="sm" sx={styles.container}>
      <Typography variant="h5" align="center" gutterBottom>
        🏆 Top Score Board
      </Typography>

      {loading ? (
        <CircularProgress sx={styles.loader} />
      ) : (
        <TableContainer component={Paper} sx={styles.tableContainer(theme)}>
          <Table>
            <TableHead>
              <TableRow sx={styles.headerRow(theme)}>
                <TableCell sx={styles.headerCell}>Rank</TableCell>
                <TableCell sx={styles.headerCell}>Player</TableCell>
                <TableCell sx={styles.headerCell}>Score</TableCell>
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
                  <TableRow key={score.userId} sx={styles.row(index)}>
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

const styles = {
  container: { mt: 4 },
  loader: { display: "block", margin: "auto" },
  tableContainer: (theme) => ({
    boxShadow: theme.shadows[3],
  }),
  headerRow: (theme) => ({
    backgroundColor: theme.palette.primary.main,
  }),
  headerCell: {
    color: "white",
    fontWeight: "bold",
  },
  row: () => ({
    "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
  }),
};

export default TopScoreBoard;
