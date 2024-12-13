import { ResponseHandler } from "../utils/responseHandler.js";
import { StatusCodes } from "http-status-codes";
/**
 * BaseController class provides methods to handle success and error responses.
 */
export class BaseController {
  /**
   * Sends a success response.
   *
   * @param {Object} res - The response object.
   * @param {any} data - The data to be sent in the response.
   * @param {number} [code=StatusCodes.OK] - The HTTP status code (default is 200).
   * @returns {Object} The response object with success status.
   */
  success(res, data, code = StatusCodes.OK) {
    return ResponseHandler.success(res, data, code);
  }

  /**
   * Sends an error response.
   *
   * @param {Object} res - The response object.
   * @param {Error} error - The error to be sent in the response.
   * @returns {Object} The response object with error status.
   */
  error(res, error) {
    return ResponseHandler.error(res, error);
  }
}
