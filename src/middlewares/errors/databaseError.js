import AppError from "./appError.js";
import { StatusCodes } from "http-status-codes";

class DatabaseError extends AppError {
  constructor(message = "Database operation failed") {
    super(message, StatusCodes.SERVICE_UNAVAILABLE);
  }
}

export default DatabaseError;
