import { ResponseHandler } from "../utils/responseHandler.js";
import {
	StatusCodes
} from 'http-status-codes';
export class BaseController {
  success(res, data, code = StatusCodes.OK) {
    return ResponseHandler.success(res, data, code);
  }

  error(res, error) {
    return ResponseHandler.error(res, error);
  }
}
