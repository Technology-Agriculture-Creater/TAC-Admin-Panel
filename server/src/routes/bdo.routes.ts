import express from 'express';
import { register, login, logout, getProfile } from '../controllers/user.controller.ts';
import { authenticate } from '../middlewares/auth.middleware.ts';
import upload from '../services/multer.service.ts';
import { getAllCrops,updateCropStatus,getCropDetailsById } from '../controllers/bdoController.ts';

const authRoute = express.Router();

authRoute.post(
  '/getAllCrops',
  getAllCrops,
);
authRoute.post(
  '/updateCropStatus',
  updateCropStatus,
);

authRoute.post('/getCropDetailsById/:cropId', getCropDetailsById);

export default authRoute;
