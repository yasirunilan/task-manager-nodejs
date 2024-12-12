import { StatusCodes } from "http-status-codes";
import AppError from "./appError.js";
class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;
