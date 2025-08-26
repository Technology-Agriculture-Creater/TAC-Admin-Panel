import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.ts';
import type { IUser } from '../types/user.types.ts';
import { token } from 'morgan';

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, 'Phone must be 10 digits'],
    },
    localAddressProof: { type: String, required: true },
    propertyDocument: { type: String, required: true },
    profilePic: { type: String, required: true },
    aadharNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{12}$/, 'Aadhar must be 12 digits'],
    },
    panNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z]{5}\d{4}[A-Z]$/, 'Invalid PAN'],
    },
    signature: { type: String, required: true },
    basicTechLiteracyList: { type: [String], default: [] },
    hasSmartPhone: { type: Boolean, required: true },
    farmingLevel: {
      type: String,
      enum: ['none', 'basic', 'intermediate', 'expert'],
      default: 'none',
    },
    farmingNotes: { type: String, trim: true },
    workingHoursPerDay: { type: Number, min: 0, max: 24, required: true },
    salaryMonthly: { type: Number, min: 0, required: true },
    incentives: { type: Number, min: 0, default: 0 },
    languageList: { type: [String], default: [] },
    userId: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    roleType: { type: Number, required: true },
  },
  { timestamps: true },
);
userSchema.statics.hashPassword = async function (password) {
  if (!password) {
    throw new Error('Password is required');
  }
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function (password: string) {
  if (!password) {
    throw new Error('Password is required');
  }
  if (!this.passwordHash) {
    throw new Error('Password is required');
  }
  return await bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ id: this._id }, config.JWT_SECRET as string, {
    expiresIn: config.JWT_EXPIRES_IN as unknown as string,
    algorithm: config.JWT_ALGORITHM as unknown as jwt.Algorithm,
  });
  return token;
};

userSchema.statics.verifyToken = async function (token) {
  if (!token) {
    throw new Error('Token is required');
  }
  const decoded = jwt.verify(token, Buffer.from(config.JWT_SECRET as string), {
    algorithms: [config.JWT_ALGORITHM as unknown as jwt.Algorithm],
  });
  return decoded;
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
