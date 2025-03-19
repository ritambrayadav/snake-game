import dynamoose from "dynamoose";

const userSchema = new dynamoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, hashKey: true, required: true },
  password: { type: String, required: true },
  companyId: { type: String, required: true },
});

const User = dynamoose.model("Users", userSchema);

export default User;
