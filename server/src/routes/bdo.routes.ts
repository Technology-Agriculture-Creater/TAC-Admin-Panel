import express from 'express';
import { register, login, logout, getProfile } from '../controllers/user.controller.ts';
import { authenticate } from '../middlewares/auth.middleware.ts';
import upload from '../services/multer.service.ts';
import { getAllCrops,updateCropStatus,getCropDetailsById } from '../controllers/bdoController.ts';

const authRoute = express.Router();

authRoute.get(
  '/getAllCrops',
  getAllCrops,
);
authRoute.put(
  '/updateCropStatus',
  updateCropStatus,
);

authRoute.get('/getCropDetailsById/:cropId', getCropDetailsById);

export default authRoute;
