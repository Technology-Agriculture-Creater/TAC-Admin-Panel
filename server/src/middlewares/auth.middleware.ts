import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config/config.ts';
import User from '../models/user.model.ts';

interface AuthRequest extends Request {
  user?: { id: string };
}

const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Authentication failed: No token provided' });
    }

    if (!config.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    const decoded = jwt.verify(token, config.JWT_SECRET as string) as { id: string };

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed: User not found' });
    }

    req.user = { id: (user._id as any).toString() };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Authentication failed: Invalid token' });
    }
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

export { authenticate };
