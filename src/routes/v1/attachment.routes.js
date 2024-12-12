import { Router } from "express";
import { attachmentController } from "../../controllers/attachment.controller.js";
import { attachmentSchema } from "../../middlewares/validators/attachment.validator.js";
import validate from "../../middlewares/validation.middleware.js";

/**
 * @swagger
 * tags:
 *   name: Attachment
 *   description: Attachment management
 */

/**
 * @swagger
 * /attachments/sign-url:
 *   post:
 *     summary: Get pre-signed URL for file upload
 *     tags: [Attachment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: Name of the file to be uploaded
 *                 example: test.jpeg
 *               contentType:
 *                 type: string
 *                 description: Type of the file to be uploaded
 *                 example: image/jpeg     
 *             required:
 *               - fileName
 *               - fileType
 *     responses:
 *       "200":
 *         description: Pre-signed URL generated successfully
 *         content:
 *           application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                      uploadUrl:
 *                        type: string
 *                        example: https://atm-task-attachments.s3.ap-south-1.amazonaws.com/1733822793445-ac7f12fd0a422990.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5B64AUZKWK4YQLUE%2F20241210%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241210T092633Z&X-Amz-Expires=3600&X-Amz-Signature=2198ec1d0234f762d612c1f741fcda1afece23ced394393727b9d79c767f31e3&X-Amz-SignedHeaders=host&x-id=PutObject
 *                      fileKey:
 *                        type: string
 *                        example: 1733822793445-ac7f12fd0a422990.png
 *               
 *       "400":
 *         description: Invalid request body
 *       "500":
 *         description: Internal server error
 */
const router = Router();

router.post(
  "/sign-url",
  validate(attachmentSchema),
  attachmentController.createPreSignUrl
);

export default router;
