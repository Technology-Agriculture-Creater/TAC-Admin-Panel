import express from 'express';
import { register, login, logout, getProfile } from '../controllers/user.controller.ts';
import { validate } from '../middlewares/validate.middleware.ts';
import { authenticate } from '../middlewares/auth.middleware.ts';
import loginSchema from '../middlewares/login.validation.ts';
import registerSchema from '../middlewares/register.validation.ts';
import upload from '../services/multer.service.ts';

const authRoute = express.Router();

authRoute.post(
  '/register',
  upload.fields([
    { name: 'propertyDocument', maxCount: 1 },
    { name: 'profilePic', maxCount: 1 },
    { name: 'aadharCardPic', maxCount: 1 },
    { name: 'panCardPic', maxCount: 1 },
    { name: 'signaturePic', maxCount: 1 },
  ]),
  validate(registerSchema),
  register,
);
authRoute.post('/login', validate(loginSchema), login);
authRoute.get('/logout', logout);
authRoute.get('/profile', authenticate, getProfile);

export default authRoute;
