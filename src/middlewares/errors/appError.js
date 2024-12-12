class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Ensure the error stack is properly captured
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
