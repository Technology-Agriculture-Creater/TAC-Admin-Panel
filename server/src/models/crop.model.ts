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
  season: string;
  sowingTime: string;
  harvestTime: string;
  averageYield: string;
  requiredTemperature: string;
  waterRequirement: string;
}

export interface IFarmerInformation {
  recommendedSellingTime: string;
  storageTips: string;
  qualityGrading: string;
}

export interface IAdditionalDetails {
  govtMSP?: number;
  exportImportStatus?: string;
  subsidiesSchemes?: string[];
}

export interface ICategory {
  name: string;
  image?: string;
}

export interface ICrop extends Document {
  name: string;
  variants: ICropVariant[];
  category: ICategory; // ✅ changed type
  location: ILocation;
  supplyDemand: ISupplyDemand;
  marketLocation: string;
  cropInsights: ICropInsights;
  farmerInformation: IFarmerInformation;
  additionalDetails: IAdditionalDetails;
  otherDetails?: Record<string, any>;
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

    // ✅ Updated category section
    category: {
      name: { type: String, required: true },
      image: { type: String },
    },

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
    otherDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICrop>('Crop', CropSchema);