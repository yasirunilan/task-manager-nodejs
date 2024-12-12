import validate from "../../../src/middlewares/validation.middleware.js";
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const schema = Joi.object({
  title: Joi.string().required().min(1).max(100),
  description: Joi.string().required().min(1).max(1000),
});

describe('Validation Middleware', () => {
  it('should return a 400 status code if validation fails', () => {
    const req = { body: { title: '', description: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validate(schema)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
  });

  it('should call next if validation passes', () => {
    const req = { body: { title: 'Valid Task', description: 'Valid description' } };
    const res = {};
    const next = jest.fn();

    validate(schema)(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
