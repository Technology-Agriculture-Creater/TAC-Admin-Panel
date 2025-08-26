import type { Request, Response } from 'express';
import User from '../models/user.model.ts';
import createHttpError from 'http-errors';
import type { NextFunction } from 'express';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    email,
    password,
    roleType,
    phoneNumber,
    localAddressProof,
    propertyDocument,
    profilePic,
    aadharNumber,
    panNumber,
    signature,
    hasSmartPhone,
    workingHoursPerDay,
    salaryMonthly,
    incentives,
    languageList,
    userId,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !roleType ||
    !phoneNumber ||
    !localAddressProof ||
    !propertyDocument ||
    !profilePic ||
    !aadharNumber ||
    !panNumber ||
    !signature ||
    hasSmartPhone === undefined ||
    !workingHoursPerDay ||
    !salaryMonthly ||
    !userId
  ) {
    return next(createHttpError(400, 'All required fields must be provided'));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createHttpError(400, 'Email already registered'));
  }

  const passwordHash = await User.hashPassword(password);
  const user = new User({
    fullName: name,
    email,
    passwordHash,
    roleType,
    phoneNumber,
    localAddressProof,
    propertyDocument,
    profilePic,
    aadharNumber,
    panNumber,
    signature,
    hasSmartPhone,
    workingHoursPerDay,
    salaryMonthly,
    incentives: incentives || 0,
    languageList: languageList || [],
    userId,
  });

  await user.save();
  res.status(201).json({ message: 'User registered successfully', user });
};

export const login = (req: Request, res: Response) => {
  res.send('Login');
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout successful' });
};
