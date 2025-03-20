import dynamoose from "dynamoose";

const scoreboardSchema = new dynamoose.Schema(
  {
    userId: { type: String, hashKey: true },
    playerName: { type: String },
    topScore: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Scoreboard = dynamoose.model("Scores", scoreboardSchema);
