import { userService } from "../services/user.service.js";
import { BaseController } from "./base.controller.js";
class UserController extends BaseController {
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
