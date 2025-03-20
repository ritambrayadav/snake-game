import { Scoreboard } from "../models/Score.js";
export const getTopScores = async (req, res) => {
  try {
    const scores = await Scoreboard.scan().exec(); 
    const sortedScores = scores.sort((a, b) => b.topScore - a.topScore);

    return res.status(200).json(sortedScores);
  } catch (error) {
    console.error("Error fetching top scores:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
