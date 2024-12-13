import { StatusCodes } from "http-status-codes";
import { attachmentService } from "../services/attachment.service.js";
import { BaseController } from "./base.controller.js";
/**
 * Controller for handling attachment-related operations.
 *
 * @class AttachmentController
 * @extends {BaseController}
 */
class AttachmentController extends BaseController {
  /**
   * Creates a pre-signed URL for an attachment.
   *
   * @param {Object} req - The request object.
   * @param {Object} req.body - The body of the request containing necessary data.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  createPreSignUrl = async (req, res) => {
    try {
      const task = await attachmentService.createPreSignUrl(req.body);
      this.success(res, task, StatusCodes.CREATED);
    } catch (error) {
      this.error(res, error);
    }
  };
}
export const attachmentController = new AttachmentController();
