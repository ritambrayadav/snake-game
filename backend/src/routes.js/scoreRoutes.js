const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Score = require("../models/Score");

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { userId, score } = req.body;
    if (!userId || score == null)
      return res.status(400).json({ error: "User ID and score are required" });

    const newScore = new Score({ id: uuidv4(), userId, score });
    await newScore.save();

    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const scores = await Score.scan().exec();
    scores.sort((a, b) => b.score - a.score); 
    res.json(scores.slice(0, 10));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
