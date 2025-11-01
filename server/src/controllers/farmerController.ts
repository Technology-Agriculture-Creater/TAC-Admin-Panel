import type { Request, Response } from 'express';
import { Types } from 'mongoose';
import Farmer from '../models/farmer.model.ts';
import crypto from 'crypto';
import cropModel from '../models/crop.model.ts';
import path from 'path';
import { uploadImage } from '../services/imagekit.service.ts';

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

export const sellCropApi = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      cropName,
      variety,
      type,
      fertilizersUsed,
      cropQualityGrade,
      quantity,
      pricePerQuintal,
      landSize,
      soilType,
      irrigationType,
      packagingType,
      feedback,
      userId,
    } = req.body;

    // Check for missing fields
    if (
      !cropName ||
      !variety ||
      !type ||
      !fertilizersUsed ||
      !cropQualityGrade ||
      !quantity ||
      !pricePerQuintal ||
      !landSize ||
      !soilType ||
      !irrigationType ||
      !packagingType ||
      !userId
    ) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required." });
      return;
    }

    // Convert and validate numeric fields
    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(pricePerQuintal);
    const parsedLandSize = parseFloat(landSize);

    if (isNaN(parsedQuantity) || isNaN(parsedPrice) || isNaN(parsedLandSize)) {
      res.status(400).json({
        success: false,
        message: "Quantity, pricePerQuintal, and landSize must be numbers.",
      });
      return;
    }

    // Create new crop listing
    const crop = new cropModel({
      cropName,
      variety,
      type,
      fertilizersUsed,
      cropQualityGrade,
      quantity: parsedQuantity,
      pricePerQuintal: parsedPrice,
      landSize: parsedLandSize,
      soilType,
      irrigationType,
      packagingType,
      feedback,
      userId,
      farmerId:userId,
    });

    await crop.save();

    res.status(201).json({
      success: true,
      message: "Crop listed successfully.",
      data: crop,
    });
  } catch (error: any) {
    console.error("Error in sellCrop:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
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
    const {
      cropName,
      variety,
      type,
      fertilizersUsed,
      cropQualityGrade,
      quantity,
      pricePerQuintal,
      landSize,
      soilType,
      irrigationType,
      packagingType,
      feedback,
      userId, // this is farmer's userId
      
    } = req.body;
    if (!userId || !cropName) {
      return res.status(400).json({
        success: false,
        message: 'User ID and crop name are required.',
      });
    }
    
    const farmer = await Farmer.findOne({_id:userId });
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found. Please register as a farmer first.',
      });
    }
    // console.log("🚀 ~ sellCrop ~ req:")

    const files = req.files as Express.Multer.File[] | undefined;
    let imageUrls: string[] = [];

    if (files && files.length > 0) {
      imageUrls = await Promise.all(
        files.map(async (file) => {
          const imageUrl = await uploadImage(file);
          return imageUrl;
        })
      );
    }

    const crop = new cropModel({
      userId: farmer.userId,      
      farmerId: userId, 
      cropName,
      variety,
      type,
      fertilizersUsed,
      cropQualityGrade,
      quantity,
      pricePerQuintal,
      landSize,
      soilType,
      irrigationType,
      packagingType,
      feedback,
      cropImages: imageUrls,
      status: 'active',
      
    });

    await crop.save();

    return res.status(200).json({
      success: true,
      message: 'Crop listed successfully.',
      data: crop,
    });

  } catch (error: any) {
    console.error('Sell Crop API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while listing your crop.',
      error: error.message || 'Internal Server Error',
    });
  }
};

export const updateCropDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { cropId } = req.params;

    if (!cropId) {
      return res.status(400).json({
        success: false,
        message: 'Crop ID is required.',
      });
    }

    // Extract allowed fields from request body
    const {
      cropName,
      variety,
      type,
      quantity,
      pricePerQuintal,
      description,
      location,
      harvestDate,
      status,
      cropImages,
    } = req.body;

    // Build update object dynamically
    const updateData: Record<string, any> = {};
    if (cropName) updateData.cropName = cropName;
    if (variety) updateData.variety = variety;
    if (type) updateData.type = type;
    if (quantity) updateData.quantity = quantity;
    if (pricePerQuintal) updateData.pricePerQuintal = pricePerQuintal;
    if (description) updateData.description = description;
    if (location) updateData.location = location;
    if (harvestDate) updateData.harvestDate = harvestDate;
    if (status) updateData.status = status;
    if (cropImages && Array.isArray(cropImages)) updateData.cropImages = cropImages;

    // Update crop details
    const updatedCrop = await cropModel.findByIdAndUpdate(cropId, updateData, {
      new: true, // return updated document
      runValidators: true, // ensure validation rules are applied
    }).lean();

    if (!updatedCrop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found. Unable to update.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Crop details updated successfully.',
      data: updatedCrop,
    });

  } catch (error: any) {
    console.error('Update Crop Details Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while updating crop details.',
      error: error.message || 'Internal Server Error',
    });
  }
};

export const getActiveCropListings = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { farmerId } = req.body;

    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: 'Farmer ID is required.',
      });
    }

    // Pagination setup
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Fetch only active crops for this farmer
    const activeCrops = await cropModel.find({
      farmerId: farmerId,
      status: 'active',
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    console.log("🚀 ~ getActiveCropListings ~ activeCrops:", activeCrops)

    const totalActiveCrops = await cropModel.countDocuments({
      farmerId: farmerId,
      status: 'active',
    });

    return res.status(200).json({
      success: true,
      message: 'Active crops fetched successfully.',
      pagination: {
        total: totalActiveCrops,
        page,
        limit,
        totalPages: Math.ceil(totalActiveCrops / limit),
      },
      data: activeCrops,
    });

  } catch (error: any) {
    console.error('Get Active Crop Listings Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching active crops.',
      error: error.message || 'Internal Server Error',
    });
  }
};

export const getAllCrops = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { farmerId } = req.body;

    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: 'Farmer ID is required.',
      });
    }

    // Pagination setup
    const page = parseInt(req.query.page as string) || 1;
    console.log("🚀 ~ getAllCrops ~ req.query.page:", req.query.page)
    const limit = parseInt(req.query.limit as string) || 10;
    console.log("🚀 ~ getAllCrops ~ req.query.limit:", req.query.limit)
    const skip = (page - 1) * limit;

    // Fetch only active crops for this farmer
    const activeCrops = await cropModel.find({
      farmerId:farmerId,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalActiveCrops = await cropModel.countDocuments({
      farmerId: farmerId,
    });

    return res.status(200).json({
      success: true,
      message: 'Active crops fetched successfully.',
      pagination: {
        total: totalActiveCrops,
        page,
        limit,
        totalPages: Math.ceil(totalActiveCrops / limit),
      },
      data: activeCrops,
    });

  } catch (error: any) {
    console.error('Get Active Crop Listings Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching active crops.',
      error: error.message || 'Internal Server Error',
    });
  }
};

