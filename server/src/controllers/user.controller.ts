import type { Request, Response } from 'express';
import User from '../models/user.model.ts';
import config from '../config/config.ts';
import { uploadImage } from '../services/imagekit.service.ts';

export const register = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      aadharNumber,
      basicTechLiteracyList,
      hasSmartPhone,
      farmingLevel,
      workingHoursPerDay,
      parsedSalaryMonthly,
      incentives,
      languageList,
      // userId,
      // roleType,
    } = req.body;

    // Check if files are uploaded
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (
      !fullName ||
      !email ||
      !password ||
      !phoneNumber ||
      !aadharNumber ||
      !files?.propertyDocument?.[0] ||
      !files?.profilePic?.[0] ||
      !files?.aadharCardPic?.[0] ||
      !files?.panCardPic?.[0] ||
      !files?.signaturePic?.[0] ||
      !basicTechLiteracyList ||
      hasSmartPhone === undefined ||
      !farmingLevel ||
      !workingHoursPerDay ||
      !parsedSalaryMonthly ||
      incentives === undefined ||
      !languageList
      // !userId ||
      // !roleType
    ) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Upload files to ImageKit and get URLs
    const [propertyDocumentUrl, profilePicUrl, aadharCardPicUrl, panCardPicUrl, signaturePicUrl] =
      await Promise.all([
        uploadImage(files.propertyDocument[0]),
        uploadImage(files.profilePic[0]),
        uploadImage(files.aadharCardPic[0]),
        uploadImage(files.panCardPic[0]),
        uploadImage(files.signaturePic[0]),
      ]);

    const passwordHash = await User.hashPassword(password);
    const user = new User({
      fullName,
      email,
      password: passwordHash,
      phoneNumber,
      aadharNumber,
      propertyDocument: propertyDocumentUrl,
      profilePic: profilePicUrl,
      aadharCardPic: aadharCardPicUrl,
      panCardPic: panCardPicUrl,
      signaturePic: signaturePicUrl,
      basicTechLiteracyList,
      hasSmartPhone,
      farmingLevel,
      workingHoursPerDay,
      parsedSalaryMonthly,
      incentives: incentives || 0,
      languageList: languageList || [],
      // userId,
      // roleType,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isMatch = await user.verifyPassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = user.generateToken();
  res.cookie('token', token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ message: 'Login successful', user });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
