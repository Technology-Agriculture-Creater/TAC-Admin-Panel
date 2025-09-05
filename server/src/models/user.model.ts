import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.ts';
import type { IUser, UserModel } from '../types/user.types.ts';

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
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, 'Phone must be 10 digits'],
    },
    aadharNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{12}$/, 'Aadhar must be 12 digits'],
    },
    propertyDocument: { type: String, required: true },
    profilePic: { type: String, required: true },
    aadharCardPic: { type: String, required: true },
    panCardPic: { type: String, required: true },
    signaturePic: { type: String, required: true },
    basicTechLiteracyList: { type: [String], default: [] },
    hasSmartPhone: { type: Boolean, required: true },
    farmingLevel: {
      type: String,
      enum: ['none', 'basic', 'intermediate', 'expert'],
      default: 'none',
    },
    workingHoursPerDay: { type: Number, min: 0, max: 24, required: true },
    parsedSalaryMonthly: { type: Number, min: 0, required: true },
    incentives: { type: Number, min: 0, default: 0 },
    languageList: { type: [String], default: [] },
    // userId: { type: String, required: true, unique: true, trim: true },
    // roleType: { type: Number, required: true },
  },
  { timestamps: true },
);
userSchema.statics.hashPassword = async function (password: string) {
  if (!password) {
    throw new Error('Password is required');
  }
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.verifyPassword = async function (password: string) {
  if (!password) {
    throw new Error('Password is required');
  }
  if (!this.password) {
    throw new Error('Password is required');
  }
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  if (!config.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  const token = jwt.sign({ id: this._id.toString() }, config.JWT_SECRET as string);
  return token;
};

userSchema.statics.verifyToken = async function (token) {
  if (!token) {
    throw new Error('Token is required');
  }
  if (!config.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  const decoded = jwt.verify(token, config.JWT_SECRET as string);
  return decoded;
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);
export default User;
