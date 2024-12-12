import dotenv from "dotenv";
dotenv.config();

export default {
  aws: {
    region: process.env.REGION_AWS || "ap-south-1",
    s3: {
      buckets: {
        attachments: process.env.ATTACHMENTS_BUCKET,
      },
    },
    dynamodb: {
      tasksTable: process.env.TASKS_TABLE,
      usersTable: process.env.USERS_TABLE
    }
  },
  remoteAPIBaseUrl:
    process.env.REMOTE_API_BASE_URL,
};
