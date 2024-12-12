import axios from "axios";
import config from "../config/index.js";
import NetworkError from "../middlewares/errors/networkError.js";

class APIHandler {
  constructor() {
    this.client = axios.create({
      baseURL: config.remoteAPIBaseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Private error handler method
  handleError(error) {
    if (error.code === "ENOTFOUND" || error.code === "ECONNABORTED") {
      throw new NetworkError("Failed to connect to the remote API", error);
    }
  }

  // Transform response to return only data
  handleResponse(response) {
    return response.data;
  }

  // GET request
  async get(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(endpoint, data = {}, config = {}) {
    try {
      const response = await this.client.post(endpoint, data, config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async put(endpoint, data = {}, config = {}) {
    try {
      const response = await this.client.put(endpoint, data, config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch(endpoint, data = {}, config = {}) {
    try {
      const response = await this.client.patch(endpoint, data, config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(endpoint, config = {}) {
    try {
      const response = await this.client.delete(endpoint, config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default new APIHandler();
