import express from 'express';
import { register, login, logout, getProfile } from '../controllers/user.controller.ts';
import { authenticate } from '../middlewares/auth.middleware.ts';
import upload from '../services/multer.service.ts';
import { getAllCrops,updateCropStatus,getCropDetailsById, importCrops, bulkImportLocations, addCountries, getCountries } from '../controllers/bdoController.ts';

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

authRoute.post('/importCrops', upload.single('file'), importCrops);


authRoute.post('/bulkImportLocations', bulkImportLocations);

authRoute.post("/addCountries", addCountries);
authRoute.post("/getCountries", getCountries);

export default authRoute;
