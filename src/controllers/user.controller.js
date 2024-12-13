import { userService } from "../services/user.service.js";
import { BaseController } from "./base.controller.js";
/**
 * UserController class extends BaseController to handle user-related operations.
 *
 * @class UserController
 * @extends {BaseController}
 */
class UserController extends BaseController {
  /**
   * Retrieves all users.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  getAll = async (req, res) => {
    try {
      const users = await userService.findAll();
      this.success(res, users);
    } catch (error) {
      this.error(res, error);
    }
  };
}

export const userController = new UserController();
