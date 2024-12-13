/**
 * A utility class for handling HTTP responses.
 */
export class ResponseHandler {
  /**
   * Sends a success response.
   * 
   * @param {Object} res - The response object.
   * @param {Object} data - The data to send in the response.
   * @param {number} [statusCode=200] - The HTTP status code (default is 200).
   * @returns {Object} The JSON response.
   */
  static success(res, data, statusCode = 200) {
    return res.status(statusCode).json({
    status: "success",
    data,
    });
  }
  
  /**
   * Sends an error response.
   * 
   * @param {Object} res - The response object.
   * @param {Object} error - The error object.
   * @param {number} [error.statusCode=500] - The HTTP status code (default is 500).
   * @param {string} [error.message="Internal server error"] - The error message (default is "Internal server error").
   * @param {string} [error.status="error"] - The status of the error (default is "error").
   * @returns {Object} The JSON response.
   */
  static error(res, error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";
    const status = error.status || "error";
    console.log(error)
    const response = {
    status,
    message,
    };
    if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
    }
  
    return res.status(statusCode).json(response);
  }
  }