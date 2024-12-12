import { userService } from "../../../src/services/user.service.js";
import { User } from "../../../src/models/user.model.js";
import apiHandler from "../../../src/utils/apiHandler.js";
import { API_ENDPOINTS } from "../../../src/utils/constants.js";

jest.mock("../../../src/models/user.model.js");
jest.mock("../../../src/utils/apiHandler.js");

describe("UserService - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return users from the database if they exist", async () => {
    const existingUsers = [
      { id: 1, name: "John Doe", username: "johndoe" },
    ];
    User.scan.mockReturnValue({
      exec: jest.fn().mockResolvedValue(existingUsers),
    });

    const users = await userService.findAll();
    expect(users).toHaveLength(1);
    expect(users[0]).toHaveProperty("id", 1);
    expect(User.scan).toHaveBeenCalled();
    expect(apiHandler.get).not.toHaveBeenCalled();
  });

  it("should fetch users from remote API if database is empty", async () => {
    const apiUsers = [
      { id: 2, name: "Jane Smith", username: "janesmith" },
    ];

    // Mock database scan returning empty
    User.scan.mockReturnValue({
      exec: jest.fn().mockResolvedValue([]),
    });

    // Mock API call
    apiHandler.get.mockResolvedValue(apiUsers);

    // Mock batchPut
    User.batchPut.mockResolvedValue();

    const users = await userService.findAll();
    expect(User.scan).toHaveBeenCalledTimes(2); // Initial + after batchPut
    expect(apiHandler.get).toHaveBeenCalledWith(API_ENDPOINTS.USER.GET_ALL);
    expect(User.batchPut).toHaveBeenCalledWith(apiUsers);
  });

  it("should throw an error if remote API fails and database is empty", async () => {
    User.scan.mockReturnValue({
      exec: jest.fn().mockResolvedValue([]),
    });

    apiHandler.get.mockRejectedValue(new Error("API Failure"));

    await expect(userService.findAll()).rejects.toThrow("API Failure");
    expect(User.scan).toHaveBeenCalledTimes(1);
    expect(apiHandler.get).toHaveBeenCalled();
    expect(User.batchPut).not.toHaveBeenCalled();
  });
});
