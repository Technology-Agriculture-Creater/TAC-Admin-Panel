import type { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import Farmer from '../models/farmer.model.ts';
import crypto from 'crypto';
import cropModel from '../models/cropListing.model.ts';
import path from 'path';
import { uploadImage } from '../services/imagekit.service.ts';
import CropModel from '../models/crop.model.ts';
import { subDays, subMonths, subWeeks } from 'date-fns';
import axios from 'axios';

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
const registerOtpStore: Record<
  string,
  { otpOrToken: string; expiresAt: number; type: 'otp' | 'token' }
> = {};

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
    if (!mobileNumber)
      return res.status(400).json({ success: false, message: 'Mobile number is required' });

    // If a farmer exists and is already verified, block new OTP
    const existing = await Farmer.findOne({ mobileNumber }).exec();
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: 'Mobile number already verified/registered' });
    }

    const otp = Math.floor(10000 + Math.random() * 90000).toString();

    // Validate API key
    const apiKey = process.env.FAST2SMS_API_KEY;
    if (!apiKey) {
      console.error('❌ FAST2SMS_API_KEY not set');
      return res.status(500).json({ error: 'SMS gateway not configured' });
    }

    // Send OTP using Fast2SMS
    const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
      headers: {
        authorization: apiKey,
      },
      params: {
        authorization: apiKey,
        route: 'q',
        message: `Hi Farmer 👋 Your TAC verification code is ${otp}. It will expire in 5 minutes. Keep it private for your security.`,
        numbers: mobileNumber,
        flash: 0,
      },
    });
    if (response.data?.return === true) {
      registerOtpStore[mobileNumber] = {
        otpOrToken: otp,
        expiresAt: Date.now() + 5 * 60 * 1000,
        type: 'otp',
      };
      return res.status(200).json({ message: 'OTP sent successfully' });
    } else {
      console.error('❌ Fast2SMS response error:', response.data);
      return res.status(502).json({ error: 'Failed to send OTP via SMS gateway' });
    }
  } catch (error) {
    console.error('❌ Error in sendRegisterOtp:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const registerWithOtp = async (req: Request<any, any, FarmerRequestBody>, res: Response) => {
  try {
    const { mobileNumber, otp, userId: providedUserId, ...rest } = req.body;
    console.log('🚀 ~ registerWithOtp ~ mobileNumber:', mobileNumber);

    if (!mobileNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and OTP are required.',
      });
    }

    const existing = await Farmer.findOne({ mobileNumber }).exec();
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: 'The Farmer already registered with same number' });
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
    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    console.log('🚀 ~ sendOtp ~ otp:', otp);

    const apiKey = process.env.FAST2SMS_API_KEY;
    console.log('🚀 ~ sendOtp ~ apiKey:', apiKey);
    if (!apiKey) {
      console.error('❌ FAST2SMS_API_KEY not set');
      return res.status(500).json({ error: 'SMS gateway not configured' });
    }

    // Send OTP using Fast2SMS
    const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
      headers: {
        authorization: apiKey,
      },
      params: {
        authorization: apiKey,
        route: 'q',
        message: `Hi Farmer 👋 Your TAC verification code is ${otp}. It will expire in 5 minutes. Keep it private for your security.`,
        numbers: mobileNumber,
        flash: 0,
      },
    });
    console.log('🚀 ~ sendOtp ~ response:', response);
    if (response.data?.return === true) {
      otpStore[mobileNumber] = {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000,
      };
      return res.status(200).json({ otp: otp, message: 'OTP sent successfully' });
    } else {
      console.error('❌ Fast2SMS response error:', response.data);
      return res.status(502).json({ error: 'Failed to send OTP via SMS gateway' });
    }
  } catch (error) {
    console.error('❌ Error in sendRegisterOtp:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
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
      res.status(400).json({ success: false, message: 'All fields are required.' });
      return;
    }

    // Convert and validate numeric fields
    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(pricePerQuintal);
    const parsedLandSize = parseFloat(landSize);

    if (isNaN(parsedQuantity) || isNaN(parsedPrice) || isNaN(parsedLandSize)) {
      res.status(400).json({
        success: false,
        message: 'Quantity, pricePerQuintal, and landSize must be numbers.',
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
      farmerId: userId,
    });

    await crop.save();

    res.status(201).json({
      success: true,
      message: 'Crop listed successfully.',
      data: crop,
    });
  } catch (error: any) {
    console.error('Error in sellCrop:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
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
    const farmers = await Farmer.findOne({ mobileNumber }).exec();
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

    const farmer = await Farmer.findOne({ _id: userId });
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
        }),
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
    const updatedCrop = await cropModel
      .findByIdAndUpdate(cropId, updateData, {
        new: true, // return updated document
        runValidators: true, // ensure validation rules are applied
      })
      .lean();

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
    const activeCrops = await cropModel
      .find({
        farmerId: farmerId,
        status: 'Approved',
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    console.log('🚀 ~ getActiveCropListings ~ activeCrops:', activeCrops);

    const totalActiveCrops = await cropModel.countDocuments({
      farmerId: farmerId,
      status: 'Approved',
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
    console.log('🚀 ~ getAllCrops ~ req.query.page:', req.query.page);
    const limit = parseInt(req.query.limit as string) || 10;
    console.log('🚀 ~ getAllCrops ~ req.query.limit:', req.query.limit);
    const skip = (page - 1) * limit;

    // Fetch only active crops for this farmer
    const activeCrops = await cropModel
      .find({
        farmerId: farmerId,
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

export const getCropCategories = async (req: Request, res: Response) => {
  console.log('testing');
  try {
    const categories = await CropModel.distinct('category');

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error: any) {
    console.error('❌ getCropCategories Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch crop categories',
      error: error.message,
    });
  }
};

export const getCropDetails = async (req: Request, res: Response) => {
  try {
    const { cropName } = req.params;
    const duration = (req.query.duration as string) || '1m';

    if (!cropName) return res.status(400).json({ success: false, message: 'Crop name required' });

    // Define time range
    const now = new Date();
    const durationMap: Record<string, number> = {
      '1d': 1,
      '1w': 7,
      '1m': 30,
      '6m': 180,
      '1y': 365,
    };
    const days = durationMap[duration] || 30;
    const startDate = subDays(now, days);

    // Fetch chart data (price over time)
    const chartData = await CropModel.aggregate([
      { $match: { name: cropName, 'otherDetails.reportedDate': { $gte: startDate } } },
      {
        $project: {
          date: '$otherDetails.reportedDate',
          price: { $arrayElemAt: ['$variants.price', 0] },
          minPrice: { $arrayElemAt: ['$variants.minPrice', 0] },
          maxPrice: { $arrayElemAt: ['$variants.maxPrice', 0] },
          arrivals: '$supplyDemand.arrivalQtyToday',
        },
      },
      { $sort: { date: 1 } },
    ]);

    // Latest record
    const latest = await CropModel.findOne({ name: cropName })
      .sort({ 'otherDetails.reportedDate': -1 })
      .lean();

    if (!latest) return res.status(404).json({ success: false, message: 'Crop not found' });

    res.status(200).json({
      success: true,
      cropName,
      chartData,
      latestDetails: latest,
    });
  } catch (error: any) {
    console.error('❌ getCropDetails Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch crop details',
      error: error.message,
    });
  }
};

export const getTopCropsOfDay = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    // 🌐 Adjust to India time (UTC+5:30)
    const now = new Date();
    const indiaOffsetMs = 5.5 * 60 * 60 * 1000;
    const todayIndia = new Date(now.getTime() + indiaOffsetMs);
    todayIndia.setHours(0, 0, 0, 0);

    let dateToUse = new Date(todayIndia.getTime() - indiaOffsetMs);

    // 1️⃣ Get today's data based on reportedDate
    let todayData = await CropModel.aggregate([
      { $match: { 'otherDetails.reportedDate': { $gte: dateToUse } } },
      {
        $group: {
          _id: {
            name: '$name',
            variant: '$variants.name',
            city: '$location.city',
          },
          docId: { $first: '$_id' },
          avgPrice: { $avg: { $arrayElemAt: ['$variants.price', 0] } },
          minPrice: { $avg: { $arrayElemAt: ['$variants.minPrice', 0] } },
          maxPrice: { $avg: { $arrayElemAt: ['$variants.maxPrice', 0] } },
          trades: { $sum: '$supplyDemand.arrivalQtyToday' },
          variantImage: { $first: { $arrayElemAt: ['$variants.image', 0] } },
        },
      },
    ]);

    // 2️⃣ If not found, use last available reportedDate
    if (todayData.length === 0) {
      const lastRecord = await CropModel.findOne({}, { 'otherDetails.reportedDate': 1 })
        .sort({ 'otherDetails.reportedDate': -1 })
        .lean();

      if (!lastRecord?.otherDetails?.reportedDate)
        return res.status(404).json({ success: false, message: 'No crop data found.' });

      const lastDate = new Date(lastRecord.otherDetails.reportedDate);
      lastDate.setHours(0, 0, 0, 0);
      dateToUse = lastDate;

      const nextDay = new Date(lastDate);
      nextDay.setDate(nextDay.getDate() + 1);

      todayData = await CropModel.aggregate([
        {
          $match: {
            'otherDetails.reportedDate': { $gte: lastDate, $lt: nextDay },
          },
        },
        {
          $group: {
            _id: {
              name: '$name',
              variant: '$variants.name',
              city: '$location.city',
            },
            docId: { $first: '$_id' },
            avgPrice: { $avg: { $arrayElemAt: ['$variants.price', 0] } },
            minPrice: { $avg: { $arrayElemAt: ['$variants.minPrice', 0] } },
            maxPrice: { $avg: { $arrayElemAt: ['$variants.maxPrice', 0] } },
            trades: { $sum: '$supplyDemand.arrivalQtyToday' },
            variantImage: { $first: { $arrayElemAt: ['$variants.image', 0] } },
          },
        },
      ]);
    }

    // 3️⃣ Find previous reported date
    const prevRecord = await CropModel.findOne({
      'otherDetails.reportedDate': { $lt: dateToUse },
    })
      .sort({ 'otherDetails.reportedDate': -1 })
      .lean();

    let prevDay = new Date(dateToUse);
    prevDay.setDate(prevDay.getDate() - 1);
    let prevDayEnd = new Date(dateToUse);

    if (prevRecord?.otherDetails?.reportedDate) {
      prevDay = new Date(prevRecord.otherDetails.reportedDate);
      prevDay.setHours(0, 0, 0, 0);
      prevDayEnd = new Date(prevDay);
      prevDayEnd.setDate(prevDayEnd.getDate() + 1);
    }

    // 4️⃣ Fetch previous day's data based on reportedDate
    const yesterdayData = await CropModel.aggregate([
      {
        $match: {
          'otherDetails.reportedDate': { $gte: prevDay, $lt: prevDayEnd },
        },
      },
      {
        $group: {
          _id: {
            name: '$name',
            variant: '$variants.name',
            city: '$location.city',
          },
          avgPrice: { $avg: { $arrayElemAt: ['$variants.price', 0] } },
        },
      },
    ]);

    const yesterdayMap = new Map();
    yesterdayData.forEach((y) => yesterdayMap.set(JSON.stringify(y._id), y.avgPrice));

    // 5️⃣ Compute price change and prepare final response
    const result = todayData.map((t) => {
      const yesterdayAvg = yesterdayMap.get(JSON.stringify(t._id));
      const priceChange = yesterdayAvg ? t.avgPrice - yesterdayAvg : 0;
      const priceChangePercent = yesterdayAvg
        ? ((t.avgPrice - yesterdayAvg) / yesterdayAvg) * 100
        : 0;

      return {
        _id: t.docId,
        cropName: t._id.name,
        variantName: Array.isArray(t._id.variant) ? t._id.variant[0] : t._id.variant,
        location: t._id.city,
        avgPrice: Math.round(t.avgPrice),
        minPrice: Math.round(t.minPrice),
        maxPrice: Math.round(t.maxPrice),
        priceChange: Math.round(priceChange),
        priceChangePercent: +priceChangePercent.toFixed(2),
        trades: +t.trades.toFixed(2),
        image: t.variantImage || null,
        dateUsed: dateToUse,
      };
    });

    // ✅ UPDATED SORTING: Nagpur first → then other cities alphabetically → then trades desc
    const DEFAULT_CITY = 'Nagpur';

    result.sort((a, b) => {
      // 1) Place Nagpur crops at the top
      if (a.location === DEFAULT_CITY && b.location !== DEFAULT_CITY) return -1;
      if (a.location !== DEFAULT_CITY && b.location === DEFAULT_CITY) return 1;

      // 2) For other cities, alphabetical sorting
      const cityCompare = a.location.localeCompare(b.location);
      if (cityCompare !== 0) return cityCompare;

      // 3) Inside same city, sort by trades DESC
      return b.trades - a.trades;
    });

    return res.status(200).json({
      success: true,
      message: `Top crops for ${dateToUse.toDateString()}`,
      count: result.length,
      topCrops: result.slice(0, limit),
    });
  } catch (error: any) {
    console.error('❌ getTopCropsOfDay Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top crops',
      error: error.message,
    });
  }
};

export const getMajorCropsInMarket = async (req: Request, res: Response) => {
  try {
    const city = (req.query.city as string)?.trim() || 'Nagpur';
    const limit = parseInt(req.query.limit as string) || 10;

    // 1️⃣ Get the latest reported date
    const latestRecord = await CropModel.findOne({}, { 'otherDetails.reportedDate': 1 })
      .sort({ 'otherDetails.reportedDate': -1 })
      .lean();

    if (!latestRecord?.otherDetails?.reportedDate) {
      return res.status(404).json({
        success: false,
        message: 'No reported date found in database.',
      });
    }

    const latestDate = new Date(latestRecord.otherDetails.reportedDate);
    const nextDay = new Date(latestDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // 2️⃣ Group by crop name but keep one _id reference
    const crops = await CropModel.aggregate([
      {
        $match: {
          'otherDetails.reportedDate': { $gte: latestDate, $lt: nextDay },
          'location.city': { $regex: new RegExp(city, 'i') },
        },
      },
      {
        $group: {
          _id: '$name', // Group by crop name (unique crops)
          name: { $first: '$name' },
          cropId: { $first: '$_id' }, // ✅ Keep one actual _id
          image: { $first: { $arrayElemAt: ['$variants.image', 0] } },
          totalArrival: { $sum: '$supplyDemand.arrivalQtyToday' },
        },
      },
      { $sort: { totalArrival: -1 } },
      { $limit: limit },
    ]);

    // 3️⃣ Format response
    const result = crops.map((c) => ({
      _id: c.cropId, // ✅ Now returns real MongoDB _id
      name: c.name,
      image: c.image ? `https://apiadmin.technologyagriculturecreater.com/api${c.image}` : null,
      totalArrival: c.totalArrival,
    }));

    res.status(200).json({
      success: true,
      message: `Major crops in ${city} on ${latestDate.toDateString()}`,
      count: result.length,
      crops: result,
    });
  } catch (error: any) {
    console.error('❌ getMajorCropsInMarket Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch major crops in market.',
      error: error.message,
    });
  }
};

export const getOilSeedCrops = async (req: Request, res: Response) => {
  try {
    const city = (req.query.city as string)?.trim() || "Nagpur";
    const limit = parseInt(req.query.limit as string) || 10;

    // ----------- FIND LATEST REPORTED DATE -----------
    const lastRecord = await CropModel
      .findOne(
        { "category.name": { $regex: /oil/i }, "location.city": { $regex: new RegExp(city, "i") } },
        { "otherDetails.reportedDate": 1 }
      )
      .sort({ "otherDetails.reportedDate": -1 })
      .lean();

    if (!lastRecord)
      return res.status(404).json({ success: false, message: "No oil seed crop data found." });

    const dateToUse = new Date(lastRecord.otherDetails.reportedDate);
    dateToUse.setHours(0, 0, 0, 0);

    const nextDay = new Date(dateToUse);
    nextDay.setDate(nextDay.getDate() + 1);

    // ----------- TODAY (LATEST DAY) DATA -----------
    const todayData = await CropModel.aggregate([
      {
        $match: {
          "category.name": { $regex: /oil/i },
          "location.city": { $regex: new RegExp(city, "i") },
          "otherDetails.reportedDate": { $gte: dateToUse, $lt: nextDay }
        }
      },
      {
        $group: {
          _id: {
            name: "$name",
            variant: "$variants.name",
            city: "$location.city"
          },
          docId: { $first: "$_id" },
          avgPrice: { $avg: { $arrayElemAt: ["$variants.price", 0] }},
          minPrice: { $avg: { $arrayElemAt: ["$variants.minPrice", 0] }},
          maxPrice: { $avg: { $arrayElemAt: ["$variants.maxPrice", 0] }},
          trades: { $sum: "$supplyDemand.arrivalQtyToday" },
          variantImage: { $first: { $arrayElemAt: ["$variants.image", 0] }}
        }
      }
    ]);

    // ----------- PREVIOUS DAY DATA -----------
    const prevRecord = await CropModel.findOne({
      "category.name": { $regex: /oil/i },
      "location.city": { $regex: new RegExp(city, "i") },
      "otherDetails.reportedDate": { $lt: dateToUse }
    })
      .sort({ "otherDetails.reportedDate": -1 })
      .lean();

    let prevDay = new Date(dateToUse);
    let prevDayEnd = new Date(dateToUse);

    if (prevRecord?.otherDetails?.reportedDate) {
      prevDay = new Date(prevRecord.otherDetails.reportedDate);
      prevDay.setHours(0, 0, 0, 0);
      prevDayEnd = new Date(prevDay);
      prevDayEnd.setDate(prevDayEnd.getDate() + 1);
    }

    const yesterdayData = await CropModel.aggregate([
      {
        $match: {
          "category.name": { $regex: /oil/i },
          "location.city": { $regex: new RegExp(city, "i") },
          "otherDetails.reportedDate": { $gte: prevDay, $lt: prevDayEnd }
        }
      },
      {
        $group: {
          _id: {
            name: "$name",
            variant: "$variants.name",
            city: "$location.city"
          },
          avgPrice: { $avg: { $arrayElemAt: ["$variants.price", 0] }}
        }
      }
    ]);

    const yesterdayMap = new Map();
    yesterdayData.forEach(y => {
      yesterdayMap.set(JSON.stringify(y._id), y.avgPrice);
    });

    // ----------- MERGE & CALCULATE PRICE CHANGE -----------
    const result = todayData.map(t => {
      const yesterdayAvg = yesterdayMap.get(JSON.stringify(t._id)) || 0;

      const priceChange = yesterdayAvg ? t.avgPrice - yesterdayAvg : 0;
      const priceChangePercent = yesterdayAvg
        ? ((t.avgPrice - yesterdayAvg) / yesterdayAvg) * 100
        : 0;

      return {
        _id: t.docId,
        cropName: t._id.name,
        variantName: Array.isArray(t._id.variant) ? t._id.variant[0] : t._id.variant,
        location: t._id.city,
        avgPrice: Math.round(t.avgPrice),
        minPrice: Math.round(t.minPrice),
        maxPrice: Math.round(t.maxPrice),
        priceChange: Math.round(priceChange),
        priceChangePercent: +priceChangePercent.toFixed(2),
        trades: +t.trades.toFixed(2),
        image: t.variantImage || null,
        dateUsed: dateToUse
      };
    });

    // ----------- SORTING (same as your main API) -----------
    const DEFAULT_CITY = "Nagpur";

    result.sort((a, b) => {
      if (a.location === DEFAULT_CITY && b.location !== DEFAULT_CITY) return -1;
      if (a.location !== DEFAULT_CITY && b.location === DEFAULT_CITY) return 1;

      const cityCompare = a.location.localeCompare(b.location);
      if (cityCompare !== 0) return cityCompare;

      return b.trades - a.trades;
    });

    return res.status(200).json({
      success: true,
      message: `Oil seed crops for ${dateToUse.toDateString()}`,
      count: result.length,
      crops: result.slice(0, limit)
    });
  } catch (error: any) {
    console.error("❌ getOilSeedCrops Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch oil seed crops",
      error: error.message
    });
  }
};

const getLatestDateForCategory = async (matchQuery: any) => {
  const lastRecord = await CropModel
    .findOne(matchQuery, { otherDetails: 1 })
    .sort({ "otherDetails.reportedDate": -1 })
    .lean();

  if (!lastRecord || !lastRecord.otherDetails || !lastRecord.otherDetails.reportedDate) {
    return null;
  }

  const reportedDate = new Date(lastRecord.otherDetails.reportedDate);
  reportedDate.setHours(0, 0, 0, 0);

  const nextDay = new Date(reportedDate);
  nextDay.setDate(nextDay.getDate() + 1);

  return {
    dateToUse: reportedDate,
    nextDay
  };
};

export const getPulseCrops = async (req: Request, res: Response) => {
  try {
    const city = (req.query.city as string)?.trim() || "Nagpur";
    const limit = parseInt(req.query.limit as string) || 10;

    const matchQuery = {
      "category.name": { $regex: /pulse/i },
      "location.city": { $regex: new RegExp(city, "i") }
    };

    const dateInfo = await getLatestDateForCategory(matchQuery);
    if (!dateInfo)
      return res.status(404).json({ success: false, message: "No pulse crop data found." });

    const { dateToUse, nextDay } = dateInfo;

    const todayData = await CropModel.aggregate([
      { $match: { ...matchQuery, "otherDetails.reportedDate": { $gte: dateToUse, $lt: nextDay } }},
      {
        $group: {
          _id: { name: "$name", variant: "$variants.name", city: "$location.city" },
          docId: { $first: "$_id" },
          avgPrice: { $avg: { $arrayElemAt: ["$variants.price", 0] }},
          minPrice: { $avg: { $arrayElemAt: ["$variants.minPrice", 0] }},
          maxPrice: { $avg: { $arrayElemAt: ["$variants.maxPrice", 0] }},
          trades: { $sum: "$supplyDemand.arrivalQtyToday" },
          image: { $first: { $arrayElemAt: ["$variants.image", 0] }}
        }
      }
    ]);

    const prevRecord = await CropModel
      .findOne({ ...matchQuery, "otherDetails.reportedDate": { $lt: dateToUse } })
      .sort({ "otherDetails.reportedDate": -1 })
      .lean();

    let prevDay = new Date(dateToUse);
    let prevDayEnd = new Date(dateToUse);

    if (prevRecord?.otherDetails?.reportedDate) {
      prevDay = new Date(prevRecord.otherDetails.reportedDate);
      prevDay.setHours(0, 0, 0, 0);
      prevDayEnd = new Date(prevDay);
      prevDayEnd.setDate(prevDayEnd.getDate() + 1);
    }

    const yesterdayData = await CropModel.aggregate([
      { $match: { ...matchQuery, "otherDetails.reportedDate": { $gte: prevDay, $lt: prevDayEnd } }},
      {
        $group: {
          _id: { name: "$name", variant: "$variants.name", city: "$location.city" },
          avgPrice: { $avg: { $arrayElemAt: ["$variants.price", 0] }}
        }
      }
    ]);

    const yesterdayMap = new Map();
    yesterdayData.forEach(y => yesterdayMap.set(JSON.stringify(y._id), y.avgPrice));

    const result = todayData.map(t => {
      const yesterdayAvg = yesterdayMap.get(JSON.stringify(t._id)) || 0;
      const priceChange = yesterdayAvg ? t.avgPrice - yesterdayAvg : 0;

      return {
        _id: t.docId,
        cropName: t._id.name,
        variantName: Array.isArray(t._id.variant) ? t._id.variant[0] : t._id.variant,
        location: t._id.city,
        avgPrice: Math.round(t.avgPrice),
        minPrice: Math.round(t.minPrice),
        maxPrice: Math.round(t.maxPrice),
        priceChange: Math.round(priceChange),
        priceChangePercent: +(yesterdayAvg ? ((priceChange / yesterdayAvg) * 100) : 0)
          .toFixed(2),
        trades: +t.trades.toFixed(2),
        image: t.image || null,
        dateUsed: dateToUse
      };
    });

    const DEFAULT_CITY = "Nagpur";
    result.sort((a, b) => {
      if (a.location === DEFAULT_CITY && b.location !== DEFAULT_CITY) return -1;
      if (a.location !== DEFAULT_CITY && b.location === DEFAULT_CITY) return 1;
      const c = a.location.localeCompare(b.location);
      if (c !== 0) return c;
      return b.trades - a.trades;
    });

    return res.status(200).json({
      success: true,
      message: `Pulse crops for ${dateToUse.toDateString()}`,
      count: result.length,
      crops: result.slice(0, limit)
    });
  } catch (err: any) {
    console.error("Pulse crop error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getMoreCrops = async (req: Request, res: Response) => {
  try {
    const city = (req.query.city as string)?.trim() || "Nagpur";
    const limit = parseInt(req.query.limit as string) || 10;

    const matchQuery = {
      "category.name": { $not: { $regex: /(oil|pulse)/i } },
      "location.city": { $regex: new RegExp(city, "i") }
    };

    const dateInfo = await getLatestDateForCategory(matchQuery);
    if (!dateInfo)
      return res.status(404).json({ success: false, message: "No other crop data found." });

    const { dateToUse, nextDay } = dateInfo;

    const todayData = await CropModel.aggregate([
      { $match: { ...matchQuery, "otherDetails.reportedDate": { $gte: dateToUse, $lt: nextDay } }},
      {
        $group: {
          _id: { name: "$name", variant: "$variants.name", city: "$location.city" },
          docId: { $first: "$_id" },
          avgPrice: { $avg: { $arrayElemAt: ["$variants.price", 0] }},
          minPrice: { $avg: { $arrayElemAt: ["$variants.minPrice", 0] }},
          maxPrice: { $avg: { $arrayElemAt: ["$variants.maxPrice", 0] }},
          trades: { $sum: "$supplyDemand.arrivalQtyToday" },
          image: { $first: { $arrayElemAt: ["$variants.image", 0] }}
        }
      }
    ]);

    const prevRecord = await CropModel
      .findOne({ ...matchQuery, "otherDetails.reportedDate": { $lt: dateToUse } })
      .sort({ "otherDetails.reportedDate": -1 })
      .lean();

    let prevDay = new Date(dateToUse);
    let prevDayEnd = new Date(dateToUse);

    if (prevRecord?.otherDetails?.reportedDate) {
      prevDay = new Date(prevRecord.otherDetails.reportedDate);
      prevDay.setHours(0, 0, 0, 0);
      prevDayEnd = new Date(prevDay);
      prevDayEnd.setDate(prevDayEnd.getDate() + 1);
    }

    const yesterdayData = await CropModel.aggregate([
      { $match: { ...matchQuery, "otherDetails.reportedDate": { $gte: prevDay, $lt: prevDayEnd } }},
      {
        $group: {
          _id: { name: "$name", variant: "$variants.name", city: "$location.city" },
          avgPrice: { $avg: { $arrayElemAt: ["$variants.price", 0] }}
        }
      }
    ]);

    const yesterdayMap = new Map();
    yesterdayData.forEach(y => yesterdayMap.set(JSON.stringify(y._id), y.avgPrice));

    const result = todayData.map(t => {
      const yesterdayAvg = yesterdayMap.get(JSON.stringify(t._id)) || 0;
      const priceChange = yesterdayAvg ? t.avgPrice - yesterdayAvg : 0;

      return {
        _id: t.docId,
        cropName: t._id.name,
        variantName: Array.isArray(t._id.variant) ? t._id.variant[0] : t._id.variant,
        location: t._id.city,
        avgPrice: Math.round(t.avgPrice),
        minPrice: Math.round(t.minPrice),
        maxPrice: Math.round(t.maxPrice),
        priceChange: Math.round(priceChange),
        priceChangePercent: +(yesterdayAvg ? ((priceChange / yesterdayAvg) * 100) : 0)
          .toFixed(2),
        trades: +t.trades.toFixed(2),
        image: t.image || null,
        dateUsed: dateToUse
      };
    });

    const DEFAULT_CITY = "Nagpur";
    result.sort((a, b) => {
      if (a.location === DEFAULT_CITY && b.location !== DEFAULT_CITY) return -1;
      if (a.location !== DEFAULT_CITY && b.location === DEFAULT_CITY) return 1;
      const c = a.location.localeCompare(b.location);
      if (c !== 0) return c;
      return b.trades - a.trades;
    });

    return res.status(200).json({
      success: true,
      message: `Other major crops for ${dateToUse.toDateString()}`,
      count: result.length,
      crops: result.slice(0, limit)
    });
  } catch (err: any) {
    console.error("More crops error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getTopGainers = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const city = (req.query.city as string)?.trim();
    const category = (req.query.category as string)?.trim();

    // 1️⃣ Get all distinct reported dates
    const reportedDates = await CropModel.distinct("otherDetails.reportedDate");
    const sortedDates = reportedDates
      .map((d) => new Date(d))
      .filter((d) => !isNaN(d.getTime()))
      .sort((a, b) => b.getTime() - a.getTime());

    if (sortedDates.length < 2) {
      return res.status(404).json({
        success: false,
        message: "Not enough reported dates found for comparison.",
      });
    }

    const latestDate = sortedDates[0];
    const previousDate = sortedDates[1];

    // 2️⃣ Build filters
    const matchFilter: any = {};
    if (city) matchFilter["location.city"] = { $regex: new RegExp(city, "i") };
    if (category) matchFilter["category.name"] = { $regex: new RegExp(category, "i") };

    // 3️⃣ Fetch today's & yesterday's data
    const [todayData, yesterdayData] = await Promise.all([
      CropModel.aggregate([
        { $match: { ...matchFilter, "otherDetails.reportedDate": latestDate } },
        {
          $group: {
            _id: {
              docId: "$_id",
              name: "$name",
              variant: "$variants.name",
              image: "$variants.image",
              city: "$location.city",
            },
            avgPrice: { $avg: { $arrayElemAt: ["$variants.price", 0] } },
          },
        },
      ]),

      CropModel.aggregate([
        { $match: { ...matchFilter, "otherDetails.reportedDate": previousDate } },
        {
          $group: {
            _id: {
              docId: "$_id",
              name: "$name",
              variant: "$variants.name",
              image: "$variants.image",
              city: "$location.city",
            },
            avgPrice: { $avg: { $arrayElemAt: ["$variants.price", 0] } },
          },
        },
      ]),
    ]);

    // 4️⃣ Map yesterday prices
    const yesterdayMap = new Map<string, number>();
    yesterdayData.forEach((y) => {
      yesterdayMap.set(JSON.stringify(y._id), y.avgPrice);
    });

    // 5️⃣ Compute gainers
    let gainers = todayData
      .map((t) => {
        const key = JSON.stringify(t._id);
        const yesterdayAvg = yesterdayMap.get(key);

        if (!yesterdayAvg || yesterdayAvg === 0) return null;

        const change = t.avgPrice - yesterdayAvg;
        const changePercent = (change / yesterdayAvg) * 100;

        return {
          id: t._id.docId,
          cropName: t._id.name,
          variantName: Array.isArray(t._id.variant) ? t._id.variant[0] : t._id.variant,
          image: Array.isArray(t._id.image) ? t._id.image[0] : t._id.image,
          location: t._id.city,
          avgPrice: Math.round(t.avgPrice),
          change: Math.round(change),
          changePercent: +changePercent.toFixed(2),
        };
      })
      .filter((c) => c && c.change > 0)
      .slice(0, limit);

    // ⭐ 6️⃣ Sorting (Nagpur → A–Z → Highest % gain)
    const DEFAULT_CITY = "Nagpur";

    gainers.sort((a, b) => {
      if (a!.location === DEFAULT_CITY && b!.location !== DEFAULT_CITY) return -1;
      if (a!.location !== DEFAULT_CITY && b!.location === DEFAULT_CITY) return 1;

      const cityCompare = a!.location.localeCompare(b!.location);
      if (cityCompare !== 0) return cityCompare;

      return b!.changePercent - a!.changePercent;
    });

    // 7️⃣ Response
    return res.status(200).json({
      success: true,
      message: `Top gainers (${latestDate.toDateString()} vs ${previousDate.toDateString()})`,
      count: gainers.length,
      crops: gainers,
    });
  } catch (error: any) {
    console.error("❌ getTopGainers Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch top gainers.",
      error: error.message,
    });
  }
};

export const getTopLosers = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const city = (req.query.city as string)?.trim();
    const category = (req.query.category as string)?.trim();

    const reportedDates = await CropModel.distinct("otherDetails.reportedDate");
    const sortedDates = reportedDates
      .map((d) => new Date(d))
      .filter((d) => !isNaN(d.getTime()))
      .sort((a, b) => b.getTime() - a.getTime());

    if (sortedDates.length < 2) {
      return res.status(404).json({
        success: false,
        message: "Not enough reported dates found for comparison.",
      });
    }

    const latestDate = sortedDates[0];
    const previousDate = sortedDates[1];

    const matchFilter: any = {};
    if (city) matchFilter["location.city"] = { $regex: new RegExp(city, "i") };
    if (category) matchFilter["category.name"] = { $regex: new RegExp(category, "i") };

    // 3️⃣ Today & Yesterday Aggregations with _id + image
    const [todayData, yesterdayData] = await Promise.all([
      CropModel.aggregate([
        { $match: { ...matchFilter, "otherDetails.reportedDate": latestDate } },
        {
          $group: {
            _id: {
              docId: "$_id",
              name: "$name",
              variant: "$variants.name",
              image: "$variants.image",
              city: "$location.city",
            },
            avgPrice: { $avg: { $arrayElemAt: ["$variants.price", 0] } },
          },
        },
      ]),
      CropModel.aggregate([
        { $match: { ...matchFilter, "otherDetails.reportedDate": previousDate } },
        {
          $group: {
            _id: {
              docId: "$_id",
              name: "$name",
              variant: "$variants.name",
              image: "$variants.image",
              city: "$location.city",
            },
            avgPrice: { $avg: { $arrayElemAt: ["$variants.price", 0] } },
          },
        },
      ]),
    ]);

    // 4️⃣ Yesterday map
    const yesterdayMap = new Map<string, number>();
    yesterdayData.forEach((y) => {
      yesterdayMap.set(JSON.stringify(y._id), y.avgPrice);
    });

    // 5️⃣ Compute losers
    let losers = todayData
      .map((t) => {
        const key = JSON.stringify(t._id);
        const yesterdayAvg = yesterdayMap.get(key);

        if (!yesterdayAvg || yesterdayAvg === 0) return null;

        const change = t.avgPrice - yesterdayAvg;
        const changePercent = (change / yesterdayAvg) * 100;

        return {
          id: t._id.docId,
          cropName: t._id.name,
          variantName: Array.isArray(t._id.variant) ? t._id.variant[0] : t._id.variant,
          image: Array.isArray(t._id.image) ? t._id.image[0] : t._id.image,
          location: t._id.city,
          avgPrice: Math.round(t.avgPrice),
          change: Math.round(change),
          changePercent: +changePercent.toFixed(2),
        };
      })
      .filter((c) => c && c.change < 0)
      .slice(0, limit);

    // ⭐ Sorting (Nagpur → A–Z → largest negative %)
    const DEFAULT_CITY = "Nagpur";

    losers.sort((a, b) => {
      if (a!.location === DEFAULT_CITY && b!.location !== DEFAULT_CITY) return -1;
      if (a!.location !== DEFAULT_CITY && b!.location === DEFAULT_CITY) return 1;

      const cityCompare = a!.location.localeCompare(b!.location);
      if (cityCompare !== 0) return cityCompare;

      return a!.changePercent - b!.changePercent; // more negative first
    });

    return res.status(200).json({
      success: true,
      message: `Top losers (${latestDate.toDateString()} vs ${previousDate.toDateString()})`,
      count: losers.length,
      crops: losers,
    });
  } catch (error: any) {
    console.error("❌ getTopLosers Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch top losers.",
      error: error.message,
    });
  }
};


export const getCropDetailsAndTrend = async (req: Request, res: Response) => {
  try {
    const cropId = req.params.id;
    const period = (req.query.period as string)?.toUpperCase() || '6M'; // 1M, 3M, 6M, 1Y

    if (!mongoose.Types.ObjectId.isValid(cropId)) {
      return res.status(400).json({ success: false, message: 'Invalid crop ID.' });
    }

    // 1️⃣ Fetch crop by ID
    const crop = await CropModel.findById(cropId).lean();
    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop not found.' });
    }

    const cropName = crop.name;
    const city = crop.location?.city || 'Nagpur';
    const category = crop.category?.name || '';

    // 2️⃣ Get all reported dates
    const allDatesRaw = await CropModel.distinct('otherDetails.reportedDate');
    const allDates = allDatesRaw
      .map((d) => (d ? new Date(d) : null))
      .filter((d): d is Date => d !== null && !isNaN(d.getTime()))
      .sort((a, b) => b.getTime() - a.getTime());

    if (allDates.length === 0) {
      return res.status(404).json({ success: false, message: 'No reported dates found.' });
    }

    // 3️⃣ Determine latest and starting date based on period
    const latestDate: Date = allDates[0]!;
    let startDate: Date = new Date(2020, 0, 1);

    switch (period) {
      case '1M':
        startDate = subMonths(latestDate, 1);
        break;
      case '3M':
        startDate = subMonths(latestDate, 3);
        break;
      case '6M':
        startDate = subMonths(latestDate, 6);
        break;
      case '1Y':
        startDate = subMonths(latestDate, 12);
        break;
      default:
        startDate = new Date(2020, 0, 1);
        break;
    }

    // 4️⃣ Fetch all records for crop within range
    const cropEntries = await CropModel.find({
      name: cropName,
      'location.city': { $regex: new RegExp(city, 'i') },
      'otherDetails.reportedDate': { $gte: startDate, $lte: latestDate },
    })
      .sort({ 'otherDetails.reportedDate': 1 })
      .lean();

    if (cropEntries.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No crop data found for ${cropName} in ${city}.`,
      });
    }

    // 5️⃣ Latest date details
    const latest = cropEntries[cropEntries.length - 1]!;
    const latestReportedDate = latest.otherDetails?.reportedDate
      ? new Date(latest.otherDetails.reportedDate)
      : latestDate;

    const sameDayEntries = cropEntries.filter((e) => {
      const reported = e.otherDetails?.reportedDate ? new Date(e.otherDetails.reportedDate) : null;
      return reported && reported.toDateString() === latestReportedDate.toDateString();
    });

    // 6️⃣ Aggregate latest day prices
    const avgPrice =
      sameDayEntries.length > 0
        ? sameDayEntries.reduce((sum, e) => sum + (e.variants?.[0]?.price ?? 0), 0) /
          sameDayEntries.length
        : latest.variants?.[0]?.price ?? 0;

    const minPrice =
      sameDayEntries.length > 0
        ? sameDayEntries.reduce((sum, e) => sum + (e.variants?.[0]?.minPrice ?? 0), 0) /
          sameDayEntries.length
        : latest.variants?.[0]?.minPrice ?? 0;

    const maxPrice =
      sameDayEntries.length > 0
        ? sameDayEntries.reduce((sum, e) => sum + (e.variants?.[0]?.maxPrice ?? 0), 0) /
          sameDayEntries.length
        : latest.variants?.[0]?.maxPrice ?? 0;

    // 🖼️ Representative image
    const variantImage =
      sameDayEntries.find((e) => e.variants?.[0]?.image)?.variants?.[0]?.image ||
      latest.variants?.[0]?.image ||
      crop.category?.image ||
      null;

    // 7️⃣ Aggregate trend data by day or month
    interface AggregatedData {
      prices: number[];
      min: number[];
      max: number[];
      trades: number[];
    }

    const grouped: Record<string, AggregatedData> = {};

    for (const entry of cropEntries) {
      const reportedDate = entry.otherDetails?.reportedDate;
      if (!reportedDate) continue;

      const d = new Date(reportedDate);

      // ✅ Daily for 1M, monthly for others (ISO-valid key)
      const key: string =
        period === '1M'
          ? d.toISOString().split('T')[0] // e.g. 2024-12-02
          : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`; // e.g. 2024-12-01

      if (!grouped[key]) grouped[key] = { prices: [], min: [], max: [], trades: [] };

      const variant = entry.variants?.[0];
      grouped[key].prices.push(variant?.price ?? 0);
      grouped[key].min.push(variant?.minPrice ?? 0);
      grouped[key].max.push(variant?.maxPrice ?? 0);
      grouped[key].trades.push(entry.supplyDemand?.arrivalQtyToday ?? 0);
    }

    const priceTrend = Object.entries(grouped)
      .map(([key, vals]) => {
        const safeAvg = (arr: number[]) =>
          arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
        return {
          date: new Date(key),
          avgPrice: Math.round(safeAvg(vals.prices)),
          minPrice: Math.round(safeAvg(vals.min)),
          maxPrice: Math.round(safeAvg(vals.max)),
          trades: Math.round(safeAvg(vals.trades)),
        };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    // 8️⃣ Price change %
    const lastTwo = priceTrend.slice(-2);
    let priceChangePercent = 0;

    if (
      lastTwo.length === 2 &&
      lastTwo[0] !== undefined &&
      lastTwo[1] !== undefined &&
      lastTwo[0].avgPrice > 0
    ) {
      priceChangePercent =
        ((lastTwo[1].avgPrice - lastTwo[0].avgPrice) / lastTwo[0].avgPrice) * 100;
    }

    // 9️⃣ Related crops
    const related = await CropModel.aggregate([
      {
        $match: {
          'category.name': category,
          name: { $ne: cropName },
        },
      },
      {
        $group: {
          _id: '$name',
          avgPrice: { $avg: { $arrayElemAt: ['$variants.price', 0] } },
          image: { $first: { $arrayElemAt: ['$variants.image', 0] } },
        },
      },
      { $limit: 3 },
    ]);

    // 🔟 Final Response
    const response = {
      _id: crop._id,
      name: latest?.name ?? cropName,
      category: latest?.category?.name ?? category,
      location: latest?.location?.city ?? city,
      avgPrice: Math.round(avgPrice),
      minPrice: Math.round(minPrice),
      maxPrice: Math.round(maxPrice),
      image: variantImage,
      priceChangePercent: +priceChangePercent.toFixed(2),
      reportedDate: latestReportedDate,
      supplyDemand: latest?.supplyDemand ?? {},
      marketLocation: latest?.marketLocation ?? '',
      cropInsights: latest?.cropInsights ?? {},
      farmerInformation: latest?.farmerInformation ?? {},
      additionalDetails: latest?.additionalDetails ?? {},
      priceTrend,
      relatedCrops: related.map((r) => ({
        name: r._id,
        avgPrice: Math.round(r.avgPrice),
        image: r.image || null,
      })),
    };

    res.status(200).json({
      success: true,
      message: `Crop details and ${period} trend for ${cropName} in ${city}`,
      crop: response,
    });
  } catch (error: any) {
    console.error('❌ getCropDetailsAndTrend Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch crop details and trend.',
      error: error.message,
    });
  }
};
