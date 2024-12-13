import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import config from "../config/index.js";

/**
 * A service class for interacting with AWS S3, providing methods to generate pre-signed URLs for file uploads
 * and to delete files from an S3 bucket.
 */
class S3Service {
  constructor() {
    this.s3Client = new S3Client({ region: config.aws.region });
  }

  /**
   * Generates a unique file key using the current timestamp, a random string, and the file's extension.
   *
   * @param {string} fileName - The name of the file for which to generate the key.
   * @returns {string} A unique file key in the format `timestamp-randomString.extension`.
   */
  generateFileKey(fileName) {
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(8).toString("hex");
    const extension = fileName.split(".").pop();
    return `${timestamp}-${randomString}.${extension}`;
  }

  /**
   * Generates a pre-signed URL for uploading a file to an S3 bucket.
   *
   * @param {string} bucketName - The name of the S3 bucket.
   * @param {string} fileName - The name of the file to be uploaded.
   * @param {string} contentType - The MIME type of the file to be uploaded.
   * @returns {Promise<{uploadUrl: string, fileKey: string}>} An object containing the pre-signed upload URL and the file key.
   * @throws {Error} If unable to generate the upload URL.
   */
  async getPreSignedUploadUrl(bucketName, fileName, contentType) {
    try {
      const fileKey = this.generateFileKey(fileName);
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
        ContentType: contentType,
      });

      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600, // URL expires in 1 hour
      });

      return {
        uploadUrl: signedUrl,
        fileKey,
      };
    } catch (error) {
      console.error("Error generating pre-signed upload URL:", error.message);
      throw new Error("Unable to generate upload URL. Please try again later.");
    }
  }

  /**
   * Deletes a file from an S3 bucket.
   *
   * @param {string} bucketName - The name of the S3 bucket.
   * @param {string} fileKey - The key of the file to delete.
   * @throws {Error} If bucketName or fileKey is not provided.
   * @throws {Error} If the bucket does not exist.
   * @throws {Error} If access is denied to the S3 bucket or file.
   * @throws {Error} If unable to delete the file for any other reason.
   */
  async deleteFile(bucketName, fileKey) {
    try {
      if (!bucketName || !fileKey) {
        throw new Error("Bucket name and file key are required.");
      }

      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
      });

      await this.s3Client.send(command);
    } catch (error) {
      if (error.name === "NoSuchBucket") {
        throw new Error(`Bucket ${bucketName} does not exist.`);
      } else if (error.name === "AccessDenied") {
        throw new Error("Access denied to the S3 bucket or file.");
      } else {
        throw new Error("Unable to delete the file. Please try again later.");
      }
    }
  }
}

export default new S3Service();
