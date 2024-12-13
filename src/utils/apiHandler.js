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
  /**
   * Sends a GET request to the specified endpoint with the given parameters.
   *
   * @param {string} endpoint - The API endpoint to send the GET request to.
   * @param {Object} [params={}] - The query parameters to include in the GET request.
   * @returns {Promise<Object>} - A promise that resolves to the response data.
   * @throws {Error} - Throws an error if the request fails.
   */
  async get(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Sends a POST request to the specified endpoint with the provided data and configuration.
   *
   * @param {string} endpoint - The API endpoint to send the POST request to.
   * @param {Object} [data={}] - The data to be sent in the body of the POST request.
   * @param {Object} [config={}] - Optional configuration for the POST request.
   * @returns {Promise<Object>} - The response from the API, processed by handleResponse.
   * @throws {Error} - If the request fails, the error is handled by handleError.
   */
  async patch(endpoint, data = {}, config = {}) {
    try {
      const response = await this.client.patch(endpoint, data, config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @param {string} endpoint - The API endpoint to send the DELETE request to.
   * @param {object} [config={}] - Optional configuration for the DELETE request.
   * @returns {Promise<any>} - A promise that resolves with the response data.
   * @throws Will call handleError if the request fails.
   */
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
