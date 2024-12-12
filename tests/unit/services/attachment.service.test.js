import { attachmentService } from "../../../src/services/attachment.service.js";
import s3Service from "../../../src/utils/s3.service.js";
import config from "../../../src/config/index.js";


jest.mock("../../../src/utils/s3.service.js"); // Mock the s3Service module

describe("AttachmentService", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock state
  });

  describe("createPreSignUrl", () => {
    it("should generate a pre-signed URL for file upload", async () => {
      const mockPayload = {
        fileName: "example.txt",
        contentType: "text/plain",
      };

      const mockUrl = "https://mock-s3-url.com";
      const mockFileKey = "timestamp-randomString.txt";
      s3Service.getPreSignedUploadUrl.mockResolvedValue({
        uploadUrl: mockUrl,
        fileKey: mockFileKey,
      });

      const result = await attachmentService.createPreSignUrl(mockPayload);

      expect(s3Service.getPreSignedUploadUrl).toHaveBeenCalledWith(
        config.aws.s3.buckets.attachments, // The bucket name from config
        mockPayload.fileName,
        mockPayload.contentType
      );
      expect(result.uploadUrl).toBe(mockUrl);
      expect(result.fileKey).toBe(mockFileKey);
    });

    it("should throw an error when the pre-signed URL generation fails", async () => {
      const mockPayload = {
        fileName: "example.txt",
        contentType: "text/plain",
      };

      s3Service.getPreSignedUploadUrl.mockRejectedValue(new Error("Unable to generate upload URL. Please try again later."));

      await expect(attachmentService.createPreSignUrl(mockPayload)).rejects.toThrow(
        "Unable to generate upload URL. Please try again later."
      );
    });
  });

  describe("deleteAttachment", () => {
    it("should delete the attachment from S3", async () => {
      const mockFileKey = "timestamp-randomString.txt";

      s3Service.deleteFile.mockResolvedValue(undefined); // Mock successful deletion

      await attachmentService.deleteAttachment(mockFileKey);

      expect(s3Service.deleteFile).toHaveBeenCalledWith(config.aws.s3.buckets.attachments, mockFileKey);
    });

    it("should throw an error if file deletion fails", async () => {
      const mockFileKey = "timestamp-randomString.txt";

      s3Service.deleteFile.mockRejectedValue(new Error("Unable to delete the file. Please try again later."));

      await expect(attachmentService.deleteAttachment(mockFileKey)).rejects.toThrow(
        "Unable to delete the file. Please try again later."
      );
    });
  });
});
