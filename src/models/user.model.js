import dynamoose from "../db/database.js";
import config from "../config/index.js";

const UserSchema = new dynamoose.Schema(
  {
    id: {
      type: Number,
      hashKey: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = dynamoose.model(config.aws.dynamodb.usersTable, UserSchema, { expires: {ttl: 300000} });

export { UserSchema, User };
