import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import config from '../config/config.ts';
import User from '../models/user.model.ts';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(createHttpError(401, 'Authentication failed: No token provided'));
    }

    if (!config.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    const decoded = jwt.verify(token, config.JWT_SECRET as string) as { id: string };

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(createHttpError(401, 'Authentication failed: User not found'));
    }

    req.user = { id: user._id.toString() };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(createHttpError(401, 'Authentication failed: Invalid token'));
    }
    next(createHttpError(500, 'Authentication failed'));
  }
};
