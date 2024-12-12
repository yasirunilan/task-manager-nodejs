import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import config from "../config/index.js";

class S3Service {
  constructor() {
    this.s3Client = new S3Client({ region: config.aws.region });
  }

  generateFileKey(fileName) {
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(8).toString("hex");
    const extension = fileName.split(".").pop();
    return `${timestamp}-${randomString}.${extension}`;
  }

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
