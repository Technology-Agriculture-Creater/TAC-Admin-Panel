import mongoose, { Schema, Document } from 'mongoose';

export interface ICropVariant {
  name: string;
  image?: string;
  price: number;
  minPrice?: number;
  maxPrice?: number;
  pricePercentage?: number;
}

export interface ILocation {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
}

export interface ISupplyDemand {
  arrivalQtyToday: number;
  stockAvailability: number;
  majorArrivalDistricts: string[];
}

export interface ICropInsights {
  season: string; // e.g. "Kharif", "Rabi", "Zaid"
  sowingTime: string; // e.g. "June - July"
  harvestTime: string; // e.g. "October - November"
  averageYield: string; // e.g. "20 quintals/acre"
  requiredTemperature: string; // e.g. "20°C - 35°C"
  waterRequirement: string; // e.g. "Moderate"
}

export interface IFarmerInformation {
  recommendedSellingTime: string; // e.g. "Immediately after harvest"
  storageTips: string; // e.g. "Store in dry, ventilated area"
  qualityGrading: string; // e.g. "Grade A, B, C"
}

export interface IAdditionalDetails {
  govtMSP?: number; // Government Minimum Support Price
  exportImportStatus?: string; // e.g. "Exported to Middle East"
  subsidiesSchemes?: string[]; // e.g. ["PM-KISAN", "Fertilizer Subsidy"]
}

export interface ICrop extends Document {
  name: string;
  variants: ICropVariant[];
  category: string;
  location: ILocation;
  supplyDemand: ISupplyDemand;
  marketLocation: string;
  cropInsights: ICropInsights;
  farmerInformation: IFarmerInformation;
  additionalDetails: IAdditionalDetails;
  createdAt?: Date;
  updatedAt?: Date;
}

const CropSchema = new Schema<ICrop>(
  {
    name: { type: String, required: true, index: true },
    variants: [
      {
        name: { type: String, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        minPrice: { type: Number },
        maxPrice: { type: Number },
        pricePercentage: { type: Number },
      },
    ],
    category: { type: String, required: true },

    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },

    supplyDemand: {
      arrivalQtyToday: { type: Number, default: 0 },
      stockAvailability: { type: Number, default: 0 },
      majorArrivalDistricts: [{ type: String }],
    },

    marketLocation: { type: String, required: true },

    cropInsights: {
      season: { type: String },
      sowingTime: { type: String },
      harvestTime: { type: String },
      averageYield: { type: String },
      requiredTemperature: { type: String },
      waterRequirement: { type: String },
    },

    farmerInformation: {
      recommendedSellingTime: { type: String },
      storageTips: { type: String },
      qualityGrading: { type: String },
    },

    additionalDetails: {
      govtMSP: { type: Number },
      exportImportStatus: { type: String },
      subsidiesSchemes: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICrop>('Crop', CropSchema);
