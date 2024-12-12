import { taskService } from "../services/task.service.js";
import { BaseController } from "./base.controller.js";
import {
	StatusCodes
} from 'http-status-codes';
class TaskController extends BaseController {
  getAll = async (req, res, next) => {
    try {
      const tasks = await taskService.findAll();
      this.success(res, tasks);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const task = await taskService.findById(req.params.id);
      this.success(res, task);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const task = await taskService.create(req.body);
      this.success(res, task, StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const task = await taskService.update(req.params.id, req.body);
      this.success(res, task);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await taskService.delete(req.params.id);
      this.success(res, { message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export const taskController = new TaskController();
