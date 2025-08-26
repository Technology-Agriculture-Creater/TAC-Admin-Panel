// models/BDO.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
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
      type: Number,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, 'Phone must be 10 digits'],
    },

    // Store file paths or URLs
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
    signature: { type: String, required: true }, // path/URL

    basicTechLiteracyList: { type: [String], default: [] },
    hasSmartPhone: { type: Boolean, required: true },

    // farming knowledge/background
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
    roleType: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

// helper virtual to set password
userSchema.methods.setPassword = async function (plain: any) {
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(plain, salt);
};

// helper to check password
userSchema.methods.verifyPassword = function (plain: any) {
  return bcrypt.compare(plain, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

export default User;
