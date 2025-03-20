import dynamoose from "dynamoose";
const positionSchema = new dynamoose.Schema({
  x: Number,
  y: Number,
});
const gameSchema = new dynamoose.Schema(
  {
    sessionId: { type: String, hashKey: true },
    userId: { type: String, index: { global: true } },
    snakeState: { type: Array, schema: [positionSchema] },
    foodPosition: positionSchema,
    score: { type: Number, default: 0 },
    isGameOver: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const GameSession = dynamoose.model("GameSessions", gameSchema);
