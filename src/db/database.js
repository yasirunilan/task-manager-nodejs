import dynamoose from "dynamoose";
import config from "../config/index.js";

// Create new DynamoDB instance
/**
 * Initializes a new instance of the DynamoDB service object.
 * 
 * @constant {DynamoDB} ddb - The DynamoDB service object.
 * @property {string} region - The AWS region to send service requests to.
 * @property {number} maxAttempts - The maximum number of retry attempts for failed requests.
 */
const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: config.aws.region,
  maxAttempts: 3,
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

export default dynamoose;
