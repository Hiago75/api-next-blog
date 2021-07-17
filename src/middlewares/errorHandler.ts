import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../custom/errors';

export function errorHandler(err: Error, _request: Request, response: Response, _next: NextFunction): Response {
  if (err instanceof CustomError) {
    return response.status(err.statusCode).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    message: 'Internal Server Error',
  });
}
