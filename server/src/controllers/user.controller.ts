import type { Request, Response } from 'express';
import User from '../models/user.model.ts';
import createHttpError from 'http-errors';
import type { NextFunction } from 'express';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, roleType } = req.body;

  if (!name || !email || !password || !roleType) {
    const error = createHttpError(400, 'Name, email, password, and roleType are required');
    return next(error);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = createHttpError(400, 'Email already registered');
    return next(error);
  }

  const hashPassword = await User.hashPassword(password);
  const user = new User({ name, email, password: hashPassword, roleType });
  await user.save();
  const token = user.generateToken();
  res.status(201).json({ message: 'User registered successfully', token });
};

export const login = (req: Request, res: Response) => {
  res.send('Login');
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout successful' });
};
