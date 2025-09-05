import type { Request, Response, NextFunction } from 'express';
import type { ZodObject } from 'zod';
import createHttpError from 'http-errors';

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      next(createHttpError(400, error.errors ? error.errors[0].message : error.message));
    }
  };
