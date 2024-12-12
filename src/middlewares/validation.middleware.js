import { StatusCodes } from "http-status-codes";

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }

    next();
  };
};

export default validate;
