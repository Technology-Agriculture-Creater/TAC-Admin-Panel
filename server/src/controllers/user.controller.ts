import type { Request, Response } from 'express';

export const register = (req: Request, res: Response) => {
  res.send('Register');
};

export const login = (req: Request, res: Response) => {
  res.send('Login');
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout successful' });
};
