import { User } from "../models/user.model.js";
import apiHandler from "../utils/apiHandler.js";
import { API_ENDPOINTS } from "../utils/constants.js";
import BaseService from "./base.service.js";

class UserService extends BaseService{
  constructor() {
    super(User);
  }
  async findAll() {
    let users = await super.findAll();
    if(users.length == 0){
      let fetchedUsers = await apiHandler.get(API_ENDPOINTS.USER.GET_ALL);
      this.batchCreate(fetchedUsers)
      users = await super.findAll();
    }
    return users
  }
}

export const userService = new UserService();
