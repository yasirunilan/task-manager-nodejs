import dynamoose from "../db/database.js";
import config from "../config/index.js";

/**
 * UserSchema defines the schema for the User model in DynamoDB using dynamoose.
 * 
 * @typedef {Object} UserSchema
 * @property {number} id - The unique identifier for the user. This is the hash key and is required.
 * @property {string} name - The name of the user. This field is required.
 * @property {string} username - The username of the user. This field is required.
 * @property {Date} createdAt - The timestamp when the user was created. Automatically managed by dynamoose.
 * @property {Date} updatedAt - The timestamp when the user was last updated. Automatically managed by dynamoose.
 */
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
