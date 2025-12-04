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

export interface ICrop {
  name: string;
  variants: ICropVariant[];
  category: ICategory;
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
