import Joi from "joi";

import { Enums } from "../../utils/constants.js";

export const attachmentSchema = Joi.object({
  fileName: Joi.string().required(),
  contentType: Joi.string()
    .valid(...Enums.ValidMimeTypes)
    .required()
    .messages({
      "any.only": `Invalid content type. Allowed types: ${Enums.ValidMimeTypes.join(
        ", "
      )}.`,
    }),
});
