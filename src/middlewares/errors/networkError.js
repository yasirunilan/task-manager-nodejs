// /src/middlewares/errors/networkError.js
import AppError from "./appError.js";
import { StatusCodes } from "http-status-codes";

class NetworkError extends AppError {
  constructor(message = "Network error occurred") {
    super(message, StatusCodes.GATEWAY_TIMEOUT);
  }
}

export default NetworkError;
