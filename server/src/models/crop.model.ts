import mongoose, { Schema, Document } from 'mongoose';

export interface ICropListing extends Document {
  userId: string;
  farmerId: mongoose.Schema.Types.ObjectId;
  cropName: string;
  variety: string;
  type: string;
  fertilizersUsed?: string;
  cropQualityGrade?: string;
  quantity: number;
  pricePerQuintal: number;
  landSize: string;
  soilType: string;
  irrigationType: string;
  packagingType?: string;
  feedback?: string;
  cropImages: string[];
  status: 'active' | 'pending' | 'sold' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

const CropListingSchema = new Schema<ICropListing>(
  {
    userId: { type: String, required: true, index: true },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmer', 
      required: true,
    },
    cropName: { type: String, required: true },
    variety: { type: String, required: true },
    type: { type: String, required: true },
    fertilizersUsed: { type: String },
    cropQualityGrade: { type: String },
    quantity: { type: Number, required: true },
    pricePerQuintal: { type: Number, required: true },
    landSize: { type: String, required: true },
    soilType: { type: String, required: true },
    irrigationType: { type: String, required: true },
    packagingType: { type: String },
    feedback: { type: String },
    cropImages: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ['active', 'pending', 'sold', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICropListing>('CropListing', CropListingSchema);
