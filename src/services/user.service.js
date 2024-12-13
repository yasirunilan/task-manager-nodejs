import { User } from "../models/user.model.js";
import apiHandler from "../utils/apiHandler.js";
import { API_ENDPOINTS } from "../utils/constants.js";
import BaseService from "./base.service.js";

/**
 * UserService class that extends BaseService to provide user-specific service methods.
 * 
 * @class UserService
 * @extends {BaseService}
 */
class UserService extends BaseService{
  constructor() {
    super(User);
  }
  /**
   * Retrieves all users from the database. If no users are found, it fetches users from an external API,
   * stores them in the database, and then retrieves them again.
   *
   * @returns {Promise<Array>} A promise that resolves to an array of user objects.
   * @throws {Error} If there is an issue with fetching or storing users.
   */
  async findAll() {
    let users = await super.findAll();
    if(users.length === 0){
      let fetchedUsers = await apiHandler.get(API_ENDPOINTS.USER.GET_ALL);
      await this.batchCreate(fetchedUsers)
      users = await super.findAll();
    }
    return users
  }
}

export const userService = new UserService();
