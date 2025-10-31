import type { Request, Response } from 'express';
import { Types } from 'mongoose';
import Farmer from '../models/farmer.model.ts';
import crypto from 'crypto';

interface FarmerRequestBody {
  userId?: string;
  name?: {
    first: string;
    middle?: string;
    last?: string;
  };
  mobileNumber?: string;
  dob?: Date | string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  farmerProfilePic?: string;
  farmerAadharPic?: string;
  aadharNumber?: string;
  address?: {
    houseNo?: string;
    street?: string;
    villageOrCity?: string;
    district?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  farmerType?: 'small' | 'marginal' | 'medium' | 'large' | 'commercial' | 'subsistence' | 'other';
  cropsGrown?: string[];
  whereDoYouSell?: string[];
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  language?: string[];
  irrigationType?: string;
  farmingMethod?:
    | 'organic'
    | 'conventional'
    | 'integrated'
    | 'permaculture'
    | 'hydroponic'
    | 'other';
  landSize?: {
    value?: number;
    unit?: 'hectare' | 'acre' | 'sq_meter' | 'bigha' | 'other';
  };
  applicationStatus?: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  isPaid?: boolean;
  otp?: string;
}

// OTP store for registration (separate from your login otpStore)
const registerOtpStore: Record<string, { otpOrToken: string; expiresAt: number; type: 'otp' | 'token' }> = {};

export const registerDraft = async (req: Request<any, any, FarmerRequestBody>, res: Response) => {
  try {
    let { userId, ...rest } = req.body;

    // If userId supplied keep it, else generate new one (same logic as your registerFarmer)
    if (!userId) {
      const lastFarmer = await Farmer.findOne({}, { userId: 1 }).sort({ createdAt: -1 }).lean();
      let newIdNumber = 1;
      if (lastFarmer?.userId) {
        const match = lastFarmer.userId.match(/\d+$/);
        if (match) newIdNumber = parseInt(match[0]) + 1;
      }
      userId = `TAC${newIdNumber.toString().padStart(5, '0')}`;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const profilePicUrl = files?.profilePic?.[0]?.path ?? rest.farmerProfilePic ?? null;
    const aadharImageUrl = files?.aadharPic?.[0]?.path ?? rest.farmerAadharPic ?? null;

    const updateData = {
      ...rest,
      userId,
      applicationStatus: 'draft',
      isPaid: rest.isPaid ?? false,
      profilePicUrl,
      aadharImageUrl,
      isMobileVerified: false,
    };

    // Minimal validation: mobile or name optional for draft — but at least one identifier useful
    const farmer = await Farmer.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).exec();

    res.status(200).json({
      success: true,
      message: 'Draft saved successfully',
      farmer,
    });
  } catch (error: any) {
    console.error('❌ Error in registerDraft:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const sendRegisterOtp = async (req: Request, res: Response) => {
  try {
    const { mobileNumber } = req.body;
     if (!mobileNumber) return res.status(400).json({ success: false, message: 'Mobile number is required' });

    // If a farmer exists and is already verified, block new OTP
    const existing = await Farmer.findOne({ mobileNumber }).exec();
    if (existing) {
      return res.status(400).json({ success: false, message: 'Mobile number already verified/registered' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    registerOtpStore[mobileNumber] = {
      otpOrToken: otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
      type: 'otp',
    };

    // TODO: replace console.log with real SMS provider
    console.log(`Registration OTP for ${mobileNumber}: ${otp}`);

    res.status(200).json({ success: true, message: 'OTP sent successfully for registration' });
  } catch (error) {
    console.error('❌ Error in sendRegisterOtp:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const registerWithOtp = async (req: Request<any, any, FarmerRequestBody>, res: Response) => {
  try {
    const { mobileNumber, otp, userId: providedUserId, ...rest } = req.body;
    console.log("🚀 ~ registerWithOtp ~ mobileNumber:", mobileNumber)

    if (!mobileNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and OTP are required.',
      });
    }

    const existing = await Farmer.findOne({ mobileNumber }).exec();
    if (existing) {
      return res.status(400).json({ success: false, message: 'The Farmer already registered with same number' });
    }

    const record = registerOtpStore[mobileNumber];
    if (!record || record.type !== 'otp') {
      return res.status(400).json({
        success: false,
        message: 'No OTP sent to this number.',
      });
    }

    if (Date.now() > record.expiresAt) {
      delete registerOtpStore[mobileNumber];
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.',
      });
    }

    if (record.otpOrToken !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP.',
      });
    }

    // ✅ OTP verified → remove it immediately
    delete registerOtpStore[mobileNumber];

    // 🧩 Generate or reuse userId
    let userId = providedUserId;
    if (!userId) {
      const lastFarmer = await Farmer.findOne({}, { userId: 1 }).sort({ createdAt: -1 }).lean();
      let newIdNumber = 1;
      if (lastFarmer?.userId) {
        const match = lastFarmer.userId.match(/\d+$/);
        if (match) newIdNumber = parseInt(match[0]) + 1;
      }
      userId = `TAC${newIdNumber.toString().padStart(5, '0')}`;
    }

    // 🖼️ File uploads
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const profilePicUrl = files?.farmerProfilePic?.[0]?.path ?? rest.farmerProfilePic ?? null;
    const aadharImageUrl = files?.farmerAadharPic?.[0]?.path ?? rest.farmerAadharPic ?? null;

    // 🧠 Prepare data
    const farmerData = {
      ...rest,
      userId,
      mobileNumber,
      isMobileVerified: true,
      applicationStatus: rest.applicationStatus ?? 'submitted',
      profilePicUrl,
      aadharImageUrl,
    };

    if (!farmerData.name || !farmerData.mobileNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name or mobile number.',
      });
    }

    // 💾 Save farmer
    const farmer = await Farmer.findOneAndUpdate(
      { userId },
      { $set: farmerData },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).exec();

    res.status(200).json({
      success: true,
      message: 'Farmer registered successfully with OTP verification',
      farmer,
    });
  } catch (error: any) {
    console.error('❌ Error in registerWithOtp:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};


export const registerFarmer = async (req: Request<any, any, FarmerRequestBody>, res: Response) => {
  try {
    let { userId, ...rest } = req.body;

    // 🧩 Generate new userId if not provided
    if (!userId) {
      const lastFarmer = await Farmer.findOne({}, { userId: 1 }).sort({ createdAt: -1 }).lean();

      let newIdNumber = 1;
      if (lastFarmer?.userId) {
        const match = lastFarmer.userId.match(/\d+$/);
        if (match) newIdNumber = parseInt(match[0]) + 1;
      }

      userId = `TAC${newIdNumber.toString().padStart(5, '0')}`;
    }

    // 🖼️ File handling
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const profilePicUrl = files?.profilePic?.[0]?.path ?? rest.farmerProfilePic ?? null;
    const aadharImageUrl = files?.aadharPic?.[0]?.path ?? rest.farmerAadharPic ?? null;

    // ⚙️ Build update object
    const updateData = {
      ...rest,
      userId,
      applicationStatus: rest.applicationStatus ?? 'draft',
      isPaid: rest.isPaid ?? false,
      profilePicUrl,
      aadharImageUrl,
    };

    // 🧠 Validate mandatory fields (you can expand this list)
    if (!updateData.name || !updateData.mobileNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name or mobile number.',
      });
    }

    // 💾 Save or update the farmer
    const farmer = await Farmer.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).exec();

    res.status(200).json({
      success: true,
      message: 'Farmer registered/updated successfully',
      farmer,
    });
  } catch (error: any) {
    console.error('❌ Error in registerFarmer:', error);

    // ⚠️ Specific MongoDB errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors,
      });
    }

    if (error.code === 11000) {
      // Duplicate key error (e.g., unique field)
      return res.status(409).json({
        success: false,
        message: 'Duplicate entry detected. Please check your data.',
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: `Invalid data type for field "${error.path}".`,
      });
    }

    // 🧯 Catch-all server error
    res.status(500).json({
      success: false,
      message: 'Internal Server Error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};


const otpStore: Record<string, { otp: string; expiresAt: number }> = {};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { mobileNumber } = req.body;
    console.log('🚀 ~ sendOtp ~ mobileNumber:', mobileNumber);
    if (!mobileNumber) return res.status(400).json({ message: 'Mobile number is required' });

    const farmer = await Farmer.findOne({ mobileNumber }).exec();
    console.log('🚀 ~ sendOtp ~ farmer:', farmer);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('🚀 ~ sendOtp ~ otp:', otp);

    otpStore[mobileNumber] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    console.log(`OTP for ${mobileNumber}: ${otp}`); // Replace with actual SMS service

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, otp } = req.body;
    console.log('🚀 ~ verifyOtp ~ mobileNumber:', mobileNumber);
    if (!mobileNumber || !otp)
      return res.status(400).json({ message: 'Mobile number and OTP are required' });

    const record = otpStore[mobileNumber];
    console.log('🚀 ~ verifyOtp ~ record:', record);
    if (!record) return res.status(400).json({ message: 'No OTP sent to this number' });

    if (Date.now() > record.expiresAt) {
      delete otpStore[mobileNumber];
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    const farmers = await Farmer.find({ mobileNumber }).exec();
    delete otpStore[mobileNumber];

    const token = crypto.randomBytes(16).toString('hex');

    res.status(200).json({ message: 'OTP verified successfully', token, farmers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getFarmerById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid farmer ID' });
    }

    const farmer = await Farmer.findById(id).exec();
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

    res.status(200).json({ farmer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllFarmers = async (req: Request, res: Response) => {
  try {
    const farmers = await Farmer.find().exec();
    res.status(200).json({ farmers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteFarmer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid farmer ID' });
    }

    const farmer = await Farmer.findByIdAndDelete(id).exec();
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

    res.status(200).json({ message: 'Farmer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const sellCrop = async (req: Request, res: Response) => {
  try {
    const { farmerId, cropDetails } = req.body;

    if (!farmerId || !Types.ObjectId.isValid(farmerId)) {
      return res.status(400).json({ message: 'Invalid farmer ID' });
    }

    if (!cropDetails || !Array.isArray(cropDetails) || cropDetails.length === 0) {
      return res.status(400).json({ message: 'Crop details are required' });
    }

    const farmer = await Farmer.findById(farmerId).exec();
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

    farmer.cropsGrown = [...(farmer.cropsGrown || []), ...cropDetails];
    await farmer.save();

    res.status(200).json({ message: 'Crops added for sale successfully', farmer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

export const activeCropListings = async (req: Request, res: Response) => {
  try {
    const farmers = await Farmer.find({ 'cropsGrown.0': { $exists: true } }).exec();
    res.status(200).json({ farmers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

