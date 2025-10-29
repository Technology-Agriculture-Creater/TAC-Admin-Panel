import express from 'express';
import { registerFarmer, sendOtp, verifyOtp } from '../controllers/farmerController.ts';
import { authenticate } from '../middlewares/auth.middleware.ts';
import upload from '../services/multer.service.ts';

const authRoute = express.Router();
authRoute.post('/', (req,res)=>{res.send("Farmer Route")});
authRoute.post(
  '/register',
  upload.fields([
    { name: 'farmerProfilePic', maxCount: 1 },
    { name: 'farmerAadharPic', maxCount: 1 },
  ]),
  registerFarmer,
);
authRoute.post('/sendOtp', sendOtp);
authRoute.post('/verifyOtp', verifyOtp);

export default authRoute;
