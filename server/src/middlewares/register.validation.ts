import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be 10 digits')
    .trim(),
  aadharNumber: z
    .string()
    .regex(/^\d{12}$/, 'Aadhar number must be 12 digits')
    .trim(),
  basicTechLiteracyList: z.array(z.string()).default([]),
  hasSmartPhone: z.boolean(),
  farmingLevel: z.enum(['none', 'basic', 'intermediate', 'expert']).default('none'),
  workingHoursPerDay: z.number().min(0).max(24),
  salaryMonthly: z.number().min(0),
  incentives: z.number().min(0).default(0),
  languageList: z.array(z.string()).default([]),
  // userId: z.string().trim().min(1, 'User ID is required'),
  // roleType: z.number(),
});

export default registerSchema;
