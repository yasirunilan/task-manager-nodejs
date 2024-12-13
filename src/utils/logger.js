import winston from "winston";

/**
 * Logger instance configured with Winston.
 * Logs messages at the 'error' level to both the console and a file named 'error.log'.
 *
 * @constant {Object} logger - The Winston logger instance.
 * @property {string} level - The logging level, set to 'error'.
 * @property {Array} transports - The list of transports for logging.
 * @property {winston.transports.Console} transports[0] - Transport for logging to the console.
 * @property {winston.transports.File} transports[1] - Transport for logging to a file named 'error.log'.
 */
const logger = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log" }),
  ],
});

export default logger;
