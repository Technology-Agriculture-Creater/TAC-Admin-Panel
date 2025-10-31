import express from 'express';
import { registerFarmer, sendOtp, verifyOtp ,registerDraft,registerWithOtp,sendRegisterOtp} from '../controllers/farmerController.ts';
import { authenticate } from '../middlewares/auth.middleware.ts';
import upload from '../services/multer.service.ts';

const authRoute = express.Router();
authRoute.post('/', (req,res)=>{res.send("Farmer Route")});

authRoute.post(
  '/registerDraft',
  upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'aadharPic', maxCount: 1 },
  ]),
  registerDraft
);

// Send OTP for registration
authRoute.post('/sendRegisterOtp', sendRegisterOtp);

// Verify OTP (returns token)
// authRoute.post('/registerWithOtp', registerWithOtp);

// Final registration (with file upload)
authRoute.post(
  '/registerWithOtp',
  upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'aadharPic', maxCount: 1 },
  ]),
  registerWithOtp
);

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
