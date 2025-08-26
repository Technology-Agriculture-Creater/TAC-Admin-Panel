import { z } from 'zod';

const registerValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z
    .string()
    .optional()
    .default('user')
    .refine((role) => role === 'user' || role === 'admin', 'Role must be either user or admin'),
});

export default registerValidationSchema;
