import dynamoose from "dynamoose";
import config from "../config/index.js";

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: config.aws.region,
  maxAttempts: 3,
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

export default dynamoose;
