import { Task } from "../models/task.model.js";
import config from "../config/index.js";
import BaseService from "./base.service.js";
import { attachmentService } from "./attachment.service.js";

class TaskService extends BaseService {
  constructor() {
    super(Task);
    this.bucketName = config.aws.s3.buckets.attachments;
    this.region = config.aws.region;
  }

  async delete(id) {
    const task = await this.findById(id);
    if (task.image) {
      await attachmentService.deleteAttachment(task.image);
    }
    return await this.model.delete(id);
  }
}
export const taskService = new TaskService();
