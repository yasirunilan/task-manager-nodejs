import { taskService } from "../../../src/services/task.service.js";
import { attachmentService } from "../../../src/services/attachment.service.js";
import { Task } from "../../../src/models/task.model.js";
import { DatabaseError } from "../../../src/middlewares/errors/databaseError.js";
import { NotFoundError } from "../../../src/middlewares/errors/notFoundError.js";


jest.mock("../../../src/services/attachment.service.js");  // Mock attachmentService

describe("TaskService", () => {
  describe("create()", () => {
    it("should create a new task", async () => {
      const taskData = { title: "Test Task", description: "Test Description" };
      const mockTask = new Task(taskData);
      jest.spyOn(Task.prototype, "save").mockResolvedValue(mockTask);

      const result = await taskService.create(taskData);

      expect(result).toBe(mockTask);
    });

    it("should throw a database error if DynamoDB is not reachable", async () => {
      const taskData = { title: "Test Task", description: "Test Description" };
      jest
        .spyOn(Task.prototype, "save")
        .mockRejectedValue(new Error("ENOTFOUND"));

      await expect(taskService.create(taskData)).rejects.toThrow(DatabaseError);
    });
  });

  describe("findAll()", () => {
    it("should return all tasks", async () => {
      const mockTasks = [
        {
          id: "2d36ad59-45c9-478e-b225-4288cdeecf96",
          title: "Task 1",
          description: "Description 1",
          status: "pending",
        },
        {
          id: "3d36ad59-45c9-478e-b225-4288cdeecf96",
          title: "Task 2",
          description: "Description 2",
          status: "pending",
        },
      ];

      jest.spyOn(Task, "scan").mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTasks),
      });

      const result = await taskService.findAll();

      expect(result).toEqual(mockTasks);
    });
  });

  describe("findById()", () => {
    it("should return a task by ID", async () => {
      const mockTask = {
        id: "2d36ad59-45c9-478e-b225-4288cdeecf96",
        title: "Task 1",
        description: "Description 1",
        status: "pending",
      };

      // Mock the findById method to return a mock task
      jest.spyOn(Task, "get").mockResolvedValue(mockTask);

      const result = await taskService.findById(
        "2d36ad59-45c9-478e-b225-4288cdeecf96"
      );

      expect(result).toEqual(mockTask);
    });

    it("should throw a NotFoundError if task is not found", async () => {
      jest.spyOn(Task, "get").mockResolvedValue(null);

      await expect(
        taskService.findById("4d36ad59-45c9-478e-b225-4288cdeecf96")
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("delete()", () => {
    it("should delete a task by ID and return success", async () => {
      const mockTask = {
        id: "2d36ad59-45c9-478e-b225-4288cdeecf96",
        title: "Task 1",
        description: "Description 1",
        status: "pending",
      };

      jest.spyOn(Task, "get").mockResolvedValue(mockTask);
      jest.spyOn(Task, "delete").mockResolvedValue(undefined);

      const result = await taskService.delete(
        "2d36ad59-45c9-478e-b225-4288cdeecf96"
      );

      expect(result).toEqual(undefined);
    });

    it("should delete a task by ID and return success when image is available", async () => {
        const mockTask = {
          id: "2d36ad59-45c9-478e-b225-4288cdeecf96",
          title: "Task 1",
          description: "Description 1",
          status: "pending",
          image: "1733732015252-e527cb8be6c7d6e3.png"
        };
  
        jest.spyOn(Task, "get").mockResolvedValue(mockTask);
        jest.spyOn(Task, "delete").mockResolvedValue(undefined);
        const deleteAttachmentSpy = jest.spyOn(attachmentService, "deleteAttachment").mockResolvedValue(undefined);

        const result = await taskService.delete(
          "2d36ad59-45c9-478e-b225-4288cdeecf96"
        );
  
        expect(result).toEqual(undefined);
        expect(deleteAttachmentSpy).toHaveBeenCalledWith(mockTask.image);
        expect(deleteAttachmentSpy).toHaveBeenCalledTimes(1);
      });

    it("should throw a NotFoundError if task is not found", async () => {
      jest.spyOn(Task, "get").mockResolvedValue(null);

      await expect(
        taskService.delete("2d36ad59-45c9-478e-b225-4288cdeecf96")
      ).rejects.toThrow(NotFoundError);
    });
  });
});
