import express from 'express';
import { register, login, logout, getProfile } from '../controllers/user.controller.ts';
import { authenticate } from '../middlewares/auth.middleware.ts';
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
  register,
);
authRoute.post('/login', login);
authRoute.get('/logout', logout);
authRoute.get('/profile', authenticate, getProfile);

export default authRoute;
