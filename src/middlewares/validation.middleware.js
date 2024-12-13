import { StatusCodes } from "http-status-codes";

/**
 * Middleware to validate request body against a given schema.
 *
 * @param {Object} schema - The validation schema object.
 * @returns {Function} Middleware function to validate request body.
 *
 * @example
 * const schema = Joi.object({
 *   name: Joi.string().required(),
 *   age: Joi.number().integer().min(0).required(),
 * });
 *
 * app.post('/user', validate(schema), (req, res) => {
 *   // Handle the request
 * });
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body to be validated.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
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
