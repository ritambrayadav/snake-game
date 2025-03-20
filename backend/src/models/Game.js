import dynamoose from "dynamoose";

const gameSchema = new dynamoose.Schema(
  {
    sessionId: { type: String, hashKey: true },
    userId: { type: String, index: { global: true } },
    snakeState: { type: Array, default: [{ x: 10, y: 10 }] },
    foodPosition: { type: Object, default: { x: 5, y: 5 } },
    score: { type: Number, default: 0 },
    isGameOver: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const GameSession = dynamoose.model("GameSessions", gameSchema);
