import { taskService } from "../services/task.service.js";
import { BaseController } from "./base.controller.js";
import { StatusCodes } from "http-status-codes";
/**
 * Controller for handling task-related operations.
 * @class TaskController
 * @extends BaseController
 */
class TaskController extends BaseController {
  /**
   * Get all tasks.
   * @function
   * @name getAll
   * @memberof TaskController
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  getAll = async (req, res, next) => {
    try {
      const tasks = await taskService.findAll();
      this.success(res, tasks);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get a single task by ID.
   * @function
   * @name getOne
   * @memberof TaskController
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  getOne = async (req, res, next) => {
    try {
      const task = await taskService.findById(req.params.id);
      this.success(res, task);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a new task.
   * @function
   * @name create
   * @memberof TaskController
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  create = async (req, res, next) => {
    try {
      const task = await taskService.create(req.body);
      this.success(res, task, StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update an existing task by ID.
   * @function
   * @name update
   * @memberof TaskController
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>}
   */
  update = async (req, res, next) => {
    try {
      const task = await taskService.update(req.params.id, req.body);
      this.success(res, task);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete a task by ID.
   * @function
   * @name delete
   * @memberof TaskController
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>}
   */
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
