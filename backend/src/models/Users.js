import dynamoose from "dynamoose";

const userSchema = new dynamoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, hashKey: true, required: true },
    password: { type: String, required: true },
    lastActiveSessionId: { type: String },
  },
  { timestamps: true }
);

const User = dynamoose.model("Users", userSchema);

export default User;
