import dynamoose from "../db/database.js";
import { Enums } from "../utils/constants.js";
import uuid from "../utils/uuidHelper.js"
import config from "../config/index.js";

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
