const dynamoose = require("dynamoose");

const ScoreSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    userId: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const Score = dynamoose.model("Scores", ScoreSchema);
module.exports = Score;
