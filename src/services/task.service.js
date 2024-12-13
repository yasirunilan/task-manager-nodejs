import { Task } from "../models/task.model.js";
import config from "../config/index.js";
import BaseService from "./base.service.js";
import { attachmentService } from "./attachment.service.js";

/**
 * TaskService class provides methods to interact with Task model and manage task-related operations.
 * Extends the BaseService class.
 */
class TaskService extends BaseService {
  /**
   * Creates an instance of TaskService.
   * Initializes the bucket name and region from the configuration.
   */
  constructor() {
    super(Task);
    this.bucketName = config.aws.s3.buckets.attachments;
    this.region = config.aws.region;
  }

  /**
   * Deletes a task by its ID.
   * If the task has an associated image, it deletes the image from the attachment service.
   * 
   * @param {string} id - The ID of the task to delete.
   * @returns {Promise<Object>} - The result of the delete operation.
   * @throws {Error} - If the task cannot be found or the delete operation fails.
   */
  async delete(id) {
    const task = await this.findById(id);
    if (task.image) {
      await attachmentService.deleteAttachment(task.image);
    }
    return await this.model.delete(id);
  }
}
export const taskService = new TaskService();
