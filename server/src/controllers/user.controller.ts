import type { Request, Response } from 'express';
import User from '../models/user.model.ts';
import createHttpError from 'http-errors';
import type { NextFunction } from 'express';
import { uploadImage } from '../services/imagekit.service.ts';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      fullName,
      email,
      password,
      roleType,
      phoneNumber,
      localAddressProof,
      aadharNumber,
      hasSmartPhone,
      workingHoursPerDay,
      salaryMonthly,
      incentives,
      languageList,
      userId,
    } = req.body;

    // Check if files are uploaded
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (
      !fullName ||
      !email ||
      !password ||
      !roleType ||
      !phoneNumber ||
      !localAddressProof ||
      !aadharNumber ||
      hasSmartPhone === undefined ||
      !workingHoursPerDay ||
      !salaryMonthly ||
      !userId ||
      !files?.propertyDocument?.[0] ||
      !files?.profilePic?.[0] ||
      !files?.aadharCardPic?.[0] ||
      !files?.panCardPic?.[0] ||
      !files?.signaturePic?.[0]
    ) {
      return next(createHttpError(400, 'All required fields must be provided'));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(400, 'Email already registered'));
    }

    // Upload files to ImageKit and get URLs
    const [propertyDocumentUrl, profilePicUrl, aadharCardPicUrl, panCardPicUrl, signaturePicUrl] = await Promise.all([
      uploadImage(files.propertyDocument[0]),
      uploadImage(files.profilePic[0]),
      uploadImage(files.aadharCardPic[0]),
      uploadImage(files.panCardPic[0]),
      uploadImage(files.signaturePic[0])
    ]);

    const passwordHash = await User.hashPassword(password);
    const user = new User({
      fullName,
      email,
      passwordHash,
      roleType,
      phoneNumber,
      localAddressProof,
      propertyDocument: propertyDocumentUrl,
      profilePic: profilePicUrl,
      aadharNumber,
      aadharCardPic: aadharCardPicUrl,
      panCardPic: panCardPicUrl,
      signaturePic: signaturePicUrl,
      hasSmartPhone,
      workingHoursPerDay,
      salaryMonthly,
      incentives: incentives || 0,
      languageList: languageList || [],
      userId,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Registration error:', error);
    next(createHttpError(500, 'Failed to register user'));
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, 'Email and password are required'));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(createHttpError(401, 'Invalid credentials'));
  }

  const isMatch = await user.verifyPassword(password);
  if (!isMatch) {
    return next(createHttpError(401, 'Invalid credentials'));
  }

  const token = user.generateToken();
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ message: 'Login successful', user });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId).select('-passwordHash');

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    res.status(200).json({ user });
  } catch (error) {
    next(createHttpError(500, 'Failed to fetch profile'));
  }
};
