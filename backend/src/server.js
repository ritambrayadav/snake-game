import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500).json({ message: err.message });
});
app.get("/", (req, res) => {
  res.send("Snake Game Backend is Running!");
});
app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
