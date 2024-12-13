import s3Service from "../utils/s3.service.js";
import config from "../config/index.js";

/**
 * Service for handling attachments in an S3 bucket.
 */
class AttachmentService {
  /**
   * Constructs the AttachmentService.
   */
  constructor() {
    this.bucketName = config.aws.s3.buckets.attachments;
  }

  /**
   * Generates a pre-signed URL for uploading a file to the S3 bucket.
   * 
   * @param {Object} payload - The payload containing file details.
   * @param {string} payload.fileName - The name of the file to be uploaded.
   * @param {string} payload.contentType - The MIME type of the file to be uploaded.
   * @returns {Promise<string>} A promise that resolves to the pre-signed URL.
   */
  async createPreSignUrl(payload) {
    return await s3Service.getPreSignedUploadUrl(
      this.bucketName,
      payload.fileName,
      payload.contentType
    );
  }

  /**
   * Deletes a file from the S3 bucket.
   * 
   * @param {string} key - The key of the file to be deleted.
   * @returns {Promise<void>} A promise that resolves when the file is deleted.
   */
  async deleteAttachment(key) {
    return await s3Service.deleteFile(this.bucketName, key);
  }
}

export const attachmentService = new AttachmentService();
