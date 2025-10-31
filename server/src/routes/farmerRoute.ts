import express from 'express';
import { registerFarmer, sendOtp, verifyOtp ,registerDraft,registerWithOtp,sendRegisterOtp, sellCrop,
  updateCropDetails,
  getActiveCropListings,} from '../controllers/farmerController.ts';
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

// -----------------------------
// 🌾 Crop Management Routes
// -----------------------------

authRoute.post(
  '/sellCrop',
  upload.array('cropImages', 5), // reuse your multer config
  sellCrop
);

// 2️⃣ Update existing crop details by cropId
authRoute.put('/updateCrop/:cropId', updateCropDetails);

// 3️⃣ Get all active crops by farmerId (with pagination)
authRoute.get('/activeCrops/:farmerId', getActiveCropListings);

export default authRoute;
