import type { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import config from '../config/config.ts';

const globalErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message,
    errorStack: config.NODE_ENV === 'development' ? err.stack : '',
  });
};

export default globalErrorHandler;
