import request from "supertest";
import app from "../../../src/app.js";

describe("Attachment Routes", () => {
  
  describe("POST /api/v1/attachments/sign-url", () => {
    it("should create a presign url", async () => {
      const attachmentData = {
        fileName: "task-manager.png",
        contentType: "image/png",
      };
      const res = await request(app)
        .post("/api/v1/attachments/sign-url")
        .send(attachmentData)
        .expect(201);
      expect(res.body).not.toBeNull();
      expect(res.body.data).toHaveProperty("uploadUrl");
      expect(res.body.data).toHaveProperty("fileKey");
    });
  });
});
