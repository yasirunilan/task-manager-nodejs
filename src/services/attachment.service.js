import s3Service from "../utils/s3.service.js";
import config from "../config/index.js";

class AttachmentService {
  constructor() {
    this.bucketName = config.aws.s3.buckets.attachments;
  }

  async createPreSignUrl(payload) {
    return await s3Service.getPreSignedUploadUrl(
      this.bucketName,
      payload.fileName,
      payload.contentType
    );
  }

  async deleteAttachment(key) {
    return await s3Service.deleteFile(this.bucketName, key);
  }
}

export const attachmentService = new AttachmentService();
