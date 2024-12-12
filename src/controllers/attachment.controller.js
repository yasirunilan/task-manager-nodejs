import { StatusCodes } from "http-status-codes";
import { attachmentService } from "../services/attachment.service.js";
import { BaseController } from "./base.controller.js";
class AttachmentController extends BaseController {
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
