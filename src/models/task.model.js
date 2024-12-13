import dynamoose from "../db/database.js";
import { Enums } from "../utils/constants.js";
import uuid from "../utils/uuidHelper.js"
import config from "../config/index.js";

/**
 * TaskSchema defines the schema for the Task model in DynamoDB using dynamoose.
 * 
 * @typedef {Object} TaskSchema
 * @property {string} id - The unique identifier for the task. It is the hash key and is generated using UUID v4.
 * @property {string} title - The title of the task. It is required and must be between 1 and 100 characters.
 * @property {string} description - The description of the task. It is required and must be between 1 and 1000 characters.
 * @property {string} status - The status of the task. It is required and must be one of the values defined in Enums.TaskStatuses. Defaults to "pending".
 * @property {string} [image] - The optional image associated with the task.
 * @property {Date} createdAt - The timestamp when the task was created. Automatically managed by dynamoose.
 * @property {Date} updatedAt - The timestamp when the task was last updated. Automatically managed by dynamoose.
 */
const TaskSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuid.generateV4(),
      required: true,
    },
    title: {
      type: String,
      required: true,
      validate: (value) => value && value.length >= 1 && value.length <= 100,
    },
    description: {
      type: String,
      required: true,
      validate: (value) => value && value.length >= 1 && value.length <= 1000,
    },
    status: {
      type: String,
      required: true,
      enum: Enums.TaskStatuses,
      default: "pending",
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
console.log(config.aws.dynamodb.tasksTable)
const Task = dynamoose.model(config.aws.dynamodb.tasksTable, TaskSchema);

export { TaskSchema, Task }
