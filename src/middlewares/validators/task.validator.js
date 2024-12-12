import Joi from "joi";
import { Enums } from "../../utils/constants.js";

export const taskCreateSchema = Joi.object({
  title: Joi.string().required().min(1).max(100),
  description: Joi.string().required().min(1).max(1000),
  image: Joi.string().allow(null).default(null),
});

export const taskUpdateSchema = Joi.object({
  title: Joi.string().required().min(1).max(100),
  description: Joi.string().required().min(1).max(1000),
  image: Joi.string().allow(null).default(null),
  status: Joi.string().valid(...Enums.TaskStatuses),
});
