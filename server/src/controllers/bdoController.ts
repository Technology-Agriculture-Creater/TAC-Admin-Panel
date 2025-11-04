import type { Request, Response } from 'express';
import CropModel from '../models/cropListing.model.ts';

/**
 * @desc    Get all crop listings (with pagination)
 * @route   GET /api/crops
 * @access  Public / Admin
 */
export const getAllCrops = async (req: Request, res: Response): Promise<Response> => {
  try {

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { status, cropName } = req.query;

    const filters: Record<string, any> = { status: { $ne: 'sold' } };
    if (status) filters.status = status;
    if (cropName)
      filters.cropName = { $regex: cropName, $options: 'i' }; // case-insensitive search

    const [crops, total] = await Promise.all([
      CropModel.find(filters)
        .populate('farmerId', 'name mobileNumber address')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      CropModel.countDocuments(filters),
    ]);

    return res.status(200).json({
      success: true,
      message: 'Crops fetched successfully.',
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCrops: total,
      count: crops.length,
      data: crops,
    });
  } catch (error: any) {
    console.error('Get All Crops Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching crop listings.',
      error: error.message || 'Internal Server Error',
    });
  }
};

export const updateCropStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { cropId, status } = req.body;
    console.log('cropId, status',cropId, status)
    const validStatuses = ['Awaiting Approval','OnProgress', 'Approved', 'Sold', 'Rejected'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${validStatuses.join(', ')}.`,
      });
    }

    const updatedCrop = await CropModel.findByIdAndUpdate(
      cropId,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedCrop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found. Please check the crop ID.',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Crop status updated to "${status}" successfully.`,
      data: updatedCrop,
    });
  } catch (error: any) {
    console.error('Update Crop Status Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while updating crop status.',
      error: error.message || 'Internal Server Error',
    });
  }
};

export const getCropDetailsById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { cropId } = req.params;
    console.log("🚀 ~ getCropDetailsById ~ cropId:", cropId)


    if (!cropId) {
      return res.status(400).json({
        success: false,
        message: 'Crop ID is required.',
      });
    }

    const crop = await CropModel.find({_id:cropId})
      .populate('farmerId', 'name mobileNumber address farmerType')
      .lean();

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found. Please check the crop ID.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Crop details fetched successfully.',
      data: crop,
    });

  } catch (error: any) {
    console.error('Get Crop Details Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching crop details.',
      error: error.message || 'Internal Server Error',
    });
  }
};
