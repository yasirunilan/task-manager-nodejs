export class ResponseHandler {
    static success(res, data, statusCode = 200) {
      return res.status(statusCode).json({
        status: "success",
        data,
      });
    }
  
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
  