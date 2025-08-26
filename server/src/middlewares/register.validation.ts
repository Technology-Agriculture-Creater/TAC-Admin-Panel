import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits').trim(),
  localAddressProof: z.string().min(1, 'Local address proof is required'),
  propertyDocument: z.string().min(1, 'Property document is required'),
  profilePic: z.string().min(1, 'Profile picture is required'),
  aadharNumber: z.string().regex(/^\d{12}$/, 'Aadhar number must be 12 digits').trim(),
  panNumber: z.string().regex(/^[A-Z]{5}\d{4}[A-Z]$/, 'Invalid PAN number').toUpperCase().trim(),
  signature: z.string().min(1, 'Signature is required'),
  basicTechLiteracyList: z.array(z.string()).default([]),
  hasSmartPhone: z.boolean(),
  farmingLevel: z.enum(['none', 'basic', 'intermediate', 'expert']).default('none'),
  farmingNotes: z.string().trim().optional(),
  workingHoursPerDay: z.number().min(0).max(24),
  salaryMonthly: z.number().min(0),
  incentives: z.number().min(0).default(0),
  languageList: z.array(z.string()).default([]),
  userId: z.string().trim().min(1, 'User ID is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  roleType: z.number(),
});

export default registerSchema;
