import mongoose, { Schema } from 'mongoose';

const PointSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number] as unknown as number[],
      required: true,
      validate: {
        validator: (v: number[]) => Array.isArray(v) && v.length === 2,
        message: 'Coordinates must be [lng, lat]',
      },
    },
  },
  { _id: false },
);

const AddressSchema = new Schema(
  {
    houseNo: { type: String },
    street: { type: String },
    villageOrCity: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String, default: 'India' },
    postalCode: { type: String },
  },
  { _id: false },
);

const NameSchema = new Schema(
  {
    first: { type: String, required: true, trim: true },
    middle: { type: String, trim: true },
    last: { type: String, trim: true },
  },
  { _id: false },
);

const FarmerSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    name: { type: NameSchema, required: true },
    mobileNumber: { type: String, required: true, unique: true, trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other', 'prefer_not_to_say'], default: 'prefer_not_to_say' },
    profilePicUrl: { type: String },
    aadharImageUrl: { type: String },
    aadharNumber: { type: String, trim: true, index: true, sparse: true },
    address: { type: AddressSchema },
    farmerType: { type: String, enum: ['small','marginal','medium','large','commercial','subsistence','other'], default: 'other' },
    cropsGrown: [{ type: String, trim: true }],
    whereDoYouSell: [{ type: String, trim: true }],
    isPaid: { type: Boolean, default: false },
    applicationStatus: { type: String, enum: ['draft','submitted','under_review','approved','rejected'], default: 'draft' },
    location: { type: PointSchema, index: '2dsphere' },
    language: [{ type: String, trim: true }],
    irrigationType: { type: String },
    farmingMethod: { type: String, enum: ['organic','conventional','integrated','permaculture','hydroponic','other'], default: 'other' },
    landSize: { value: { type: Number, min: 0 }, unit: { type: String, enum: ['hectare','acre','sq_meter','bigha','other'], default: 'hectare' } },
  },
  { timestamps: true }
);

FarmerSchema.virtual('fullName').get(function(this: any) {
  const parts = [];
  if (this.name?.first) parts.push(this.name.first);
  if (this.name?.middle) parts.push(this.name.middle);
  if (this.name?.last) parts.push(this.name.last);
  return parts.join(' ');
});

FarmerSchema.pre('save', function(this: any, next) {
  if (this.mobileNumber) this.mobileNumber = this.mobileNumber.replace(/\s+/g, '');
  next();
});

const Farmer = mongoose.model('Farmer', FarmerSchema);
export default Farmer;
