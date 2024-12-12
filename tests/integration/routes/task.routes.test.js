import request from "supertest";
import app from "../../../src/app.js";
import { Task } from "../../../src/models/task.model.js";
describe("Task Routes", () => {
  
  describe("POST /api/v1/tasks", () => {
    it("should create a new task", async () => {
      const taskData = { title: "Test Task", description: "Test Description" };
      const res = await request(app)
        .post("/api/v1/tasks") 
        .send(taskData)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(res.body.data.title).toBe(taskData.title);
      expect(res.body.data.description).toBe(taskData.description);
      expect(res.body.data.status).toBe("pending");
      await Task.batchDelete(await Task.scan().exec());
    });

    it("should return a validation error if the body is not sent", async () => {
      const res = await request(app)
        .post("/api/v1/tasks")
        .send({})
        .expect(400);

      expect(res.body.message).toBe("Validation failed");
    });

    it("should return a validation error if the body do not have all properties", async () => {
      const res = await request(app)
        .post("/api/v1/tasks")
        .send({
          description: "Go to bank and collect letters",
          image: "1733732015252-e527cb8be6c7d6e3.png",
        })
        .expect(400);

      expect(res.body.message).toBe("Validation failed");
    });
  });

  describe("GET /tasks", () => {
    it("should return all tasks", async () => {
      const task = { title: "Test Task 1", description: "Test Description 1" };

      const res = await request(app)
        .post("/api/v1/tasks")
        .send(task)
        .expect("Content-Type", /json/)
        .expect(201);
      


      const fetchRes = await request(app)
        .get("/api/v1/tasks")
        .expect("Content-Type", /json/)
        .expect(200);

        expect(fetchRes.body.data.length).toBe(1);

        await Task.batchDelete(await Task.scan().exec());
    
    });
  });
});
