import type { Request, Response } from 'express';
import Crop from '../models/crop.model.ts';

export const createCrop = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category,
      location,
      supplyDemand,
      marketLocation,
      cropInsights,
      farmerInformation,
      additionalDetails,
      variants,
      otherDetails,
    } = req.body;
    const existingCrop = await Crop.findOne({ name });
    if (existingCrop) {
      return res.status(400).json({ message: 'Crop with this name already exists' });
    }

    const newCrop = new Crop({
      name,
      category,
      location,
      supplyDemand,
      marketLocation,
      cropInsights,
      farmerInformation,
      additionalDetails,
      variants,
      otherDetails,
    });
    const savedCrop = await newCrop.save();
    res.status(201).json(savedCrop);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message, errors: error.errors });
    }
    res.status(500).json({ message: 'Error creating crop', error: error.message });
  }
};
