import mongoose from 'mongoose';
import { Document } from 'mongoose';

interface IUser extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  localAddressProof: string;
  propertyDocument: string;
  profilePic: string;
  aadharNumber: string;
  panNumber: string;
  signature: string;
  basicTechLiteracyList: string[];
  hasSmartPhone: boolean;
  farmingLevel: 'none' | 'basic' | 'intermediate' | 'expert';
  farmingNotes?: string;
  workingHoursPerDay: number;
  salaryMonthly: number;
  incentives: number;
  languageList: string[];
  userId: string;
  passwordHash: string;
  roleType: number;

  setPassword(plain: string): Promise<void>;
  verifyPassword(plain: string): Promise<boolean>;
  generateToken(): string;
}

interface UserModel extends mongoose.Model<IUser> {
  hashPassword(password: string): Promise<string>;
  verifyToken(token: string): Promise<any>;
}

export type { IUser, UserModel };
