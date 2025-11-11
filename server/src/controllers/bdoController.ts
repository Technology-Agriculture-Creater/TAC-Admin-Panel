import type { Request, Response } from 'express';
import CropModel from '../models/cropListing.model.ts';
import { parseUploadedFile } from '../utils/excelParser.ts';
import { mapRowToCrop } from '../utils/cropMapper.ts';
import fs from "fs";
import cropModel from '../models/crop.model.ts';
import { CityModel } from '../models/city.model.ts';
import { VillageModel } from '../models/village.model.ts';
import { DistrictModel } from '../models/district.model.ts';
import { StateModel } from '../models/state.model.ts';
import { CountryModel } from '../models/country.model.ts';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper: background processor
const processCropsImport = async (filePath: Express.Multer.File) => {
  try {
    console.time("CropImportTotal");

    const rows = await parseUploadedFile(filePath);
    if (!rows?.length) {
      console.warn("⚠️ No data found in uploaded file.");
      return;
    }

    const uploadsDir = path.join(__dirname, "../../uploads");
    const allFiles: string[] = (await fs.promises.readdir(uploadsDir)).map((f) =>
      f.toLowerCase()
    );

    const findImageFast = (name: string): string => {
      const normalized = name.toLowerCase().replace(/\s+/g, " ");
      const match = allFiles.find((file) => file.includes(normalized));
      return match ? `/uploads/${match}` : `/uploads/defaults/placeholder.png`;
    };

    const crops = rows.map((r) => mapRowToCrop(r, findImageFast));

    const rawCollection = mongoose.connection.collection("crops");

    // Delete + insert batches in background
    const deletePromise = rawCollection.deleteMany({});
    const insertPromise = (async () => {
      const BATCH_SIZE = 20000;
      const concurrency = 3;
      const chunks: typeof crops[] = [];

      for (let i = 0; i < crops.length; i += BATCH_SIZE) {
        chunks.push(crops.slice(i, i + BATCH_SIZE));
      }

      const queue: Promise<any>[] = [];
      for (const chunk of chunks) {
        const task = rawCollection.insertMany(chunk, { ordered: false });
        queue.push(task);
        if (queue.length >= concurrency) {
          await Promise.all(queue);
          queue.length = 0;
        }
      }
      if (queue.length > 0) await Promise.all(queue);
    })();

    await Promise.all([deletePromise, insertPromise]);

    console.timeEnd("CropImportTotal");
    console.log(`✅ Import completed successfully (${rows.length} records).`);
  } catch (error) {
    console.error("❌ Background Crop Import Error:", error);
  }
};

// Main API Handler
export const importCrops = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // ✅ Respond immediately to the user
    res.status(200).json({
      success: true,
      message: "📦 File received. Crops import started in background.",
    });

    // 🧠 Process import in background (non-blocking)
    setImmediate(() => {
      processCropsImport(req.file!);
    });

    return res; // already responded
  } catch (error: any) {
    console.error("❌ Crop Import Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to start crop import",
      error: error.message,
    });
  }
};


export const bulkImportLocations = async (req: Request, res: Response): Promise<void> => {
  const locations = req.body;

  if (!Array.isArray(locations) || locations.length === 0) {
    res.status(400).json({ success: false, message: "Invalid or empty data format" });
    return;
  }

  try {
    const bulkCountries: any[] = [];
    const bulkStates: any[] = [];
    const bulkDistricts: any[] = [];
    const bulkCities: any[] = [];
    const bulkVillages: any[] = [];

    for (const country of locations) {
      const countryDoc = new CountryModel({
        name: country.name,
        isoCode: country.isoCode,
        phoneCode: country.phoneCode,
      });
      bulkCountries.push(countryDoc);
    }

    // ✅ Insert all countries first
    const insertedCountries = await CountryModel.insertMany(bulkCountries);

    // Loop again to insert nested data (states, districts, etc.)
    for (let i = 0; i < locations.length; i++) {
      const country = locations[i];
      const countryId = insertedCountries[i]._id;

      for (const state of country.states || []) {
        const stateDoc = new StateModel({
          name: state.name,
          code: state.code,
          countryId,
        });
        bulkStates.push(stateDoc);
      }
    }

    const insertedStates = await StateModel.insertMany(bulkStates);

    // Districts
    let stateIndex = 0;
    for (const country of locations) {
      for (const state of country.states || []) {
        const stateId = insertedStates[stateIndex++]._id;

        for (const district of state.districts || []) {
          const districtDoc = new DistrictModel({
            name: district.name,
            stateId,
          });
          bulkDistricts.push(districtDoc);
        }
      }
    }

    const insertedDistricts = await DistrictModel.insertMany(bulkDistricts);

    // Cities and Villages
    let districtIndex = 0;
    for (const country of locations) {
      for (const state of country.states || []) {
        for (const district of state.districts || []) {
          const districtId = insertedDistricts[districtIndex++]._id;

          for (const city of district.cities || []) {
            const cityDoc = new CityModel({
              name: city.name,
              districtId,
              latitude: city.latitude,
              longitude: city.longitude,
            });
            bulkCities.push(cityDoc);
          }
        }
      }
    }

    const insertedCities = await CityModel.insertMany(bulkCities);

    // Villages
    let cityIndex = 0;
    for (const country of locations) {
      for (const state of country.states || []) {
        for (const district of state.districts || []) {
          for (const city of district.cities || []) {
            const cityId = insertedCities[cityIndex++]._id;

            for (const village of city.villages || []) {
              const villageDoc = new VillageModel({
                name: village.name,
                cityId,
              });
              bulkVillages.push(villageDoc);
            }
          }
        }
      }
    }

    await VillageModel.insertMany(bulkVillages);

    res.status(201).json({
      success: true,
      message: "✅ All locations imported successfully",
      counts: {
        countries: insertedCountries.length,
        states: insertedStates.length,
        districts: insertedDistricts.length,
        cities: insertedCities.length,
        villages: bulkVillages.length,
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: "Import failed", error: err.message });
  }
};