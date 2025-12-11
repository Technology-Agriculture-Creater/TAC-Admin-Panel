"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CropData {
  _id: { $oid: string };
  name: string;
  category: { name: string; image: string };
  location: {
    latitude: number;
    longitude: number;
    city: string;
    state: string;
  };
  supplyDemand: {
    arrivalQtyToday: number;
    stockAvailability: number;
    majorArrivalDistricts: string[];
  };
  marketLocation: string;
  cropInsights: {
    season: string;
    sowingTime: string;
    harvestTime: string;
    averageYield: string;
    requiredTemperature: string;
    waterRequirement: string;
  };
  farmerInformation: {
    recommendedSellingTime: string;
    storageTips: string;
    qualityGrading: string;
  };
  additionalDetails: {
    govtMSP: number | null;
    exportImportStatus: string;
    subsidiesSchemes: string[];
  };
  variants: {
    name: string;
    image: string;
    price: number;
    minPrice: number;
    maxPrice: number;
  }[];
  otherDetails: {
    reportedDate: { $date: string };
    rawExcelData: {
      State: string;
      District: string;
      "Market ": string;
      Season: string;
      "Crop Name": string;
      Category: string;
      "Arrivals (Tonnes)": number;
      "Min Price (Rs./Quintal)": number;
      "Max Price (Rs./Quintal)": number;
      "Modal Price (Rs./Quintal)": number;
      "Reported Date": number;
    };
  };
}

interface CropExcelDetailClientProps {
  id: string;
}

const CropExcelDetailClient: React.FC<CropExcelDetailClientProps> = ({
  id,
}) => {
  const [crop, setCrop] = useState<CropData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const storedData = localStorage.getItem("excelCropData");
      if (storedData) {
        const excelData: CropData[] = JSON.parse(storedData);
        const foundCrop = excelData.find((crop) => crop._id.$oid === id);
        setCrop(foundCrop || null);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!crop) {
    return <div className="container mx-auto p-4">Crop details not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-4">
        Crop Details: {crop.name}
      </h1>
      <div className="bg-white shadow-lg rounded-xl p-8 space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Basic Information
            </h2>
            <p className="text-gray-600">
              <strong className="font-medium">ID:</strong> {crop._id.$oid}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Name:</strong> {crop.name}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Category:</strong>{" "}
              {crop.category.name}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Market Location:</strong>{" "}
              {crop.marketLocation}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Location Details
            </h2>
            <p className="text-gray-600">
              <strong className="font-medium">City:</strong>{" "}
              {crop.location.city}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">State:</strong>{" "}
              {crop.location.state}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Latitude:</strong>{" "}
              {crop.location.latitude}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Longitude:</strong>{" "}
              {crop.location.longitude}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Supply & Demand
            </h2>
            <p className="text-gray-600">
              <strong className="font-medium">Arrival Quantity Today:</strong>{" "}
              {crop.supplyDemand.arrivalQtyToday}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Stock Availability:</strong>{" "}
              {crop.supplyDemand.stockAvailability}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Major Arrival Districts:</strong>{" "}
              {crop.supplyDemand.majorArrivalDistricts.join(", ")}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Crop Insights
            </h2>
            <p className="text-gray-600">
              <strong className="font-medium">Season:</strong>{" "}
              {crop.cropInsights.season}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Sowing Time:</strong>{" "}
              {crop.cropInsights.sowingTime}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Harvest Time:</strong>{" "}
              {crop.cropInsights.harvestTime}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Average Yield:</strong>{" "}
              {crop.cropInsights.averageYield}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Required Temperature:</strong>{" "}
              {crop.cropInsights.requiredTemperature}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Water Requirement:</strong>{" "}
              {crop.cropInsights.waterRequirement}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Farmer Information
            </h2>
            <p className="text-gray-600">
              <strong className="font-medium">Recommended Selling Time:</strong>{" "}
              {crop.farmerInformation.recommendedSellingTime}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Storage Tips:</strong>{" "}
              {crop.farmerInformation.storageTips}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Quality Grading:</strong>{" "}
              {crop.farmerInformation.qualityGrading}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Additional Details
            </h2>
            <p className="text-gray-600">
              <strong className="font-medium">Govt MSP:</strong>{" "}
              {crop.additionalDetails.govtMSP || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Export/Import Status:</strong>{" "}
              {crop.additionalDetails.exportImportStatus}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium">Subsidies Schemes:</strong>{" "}
              {crop.additionalDetails.subsidiesSchemes.join(", ")}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {crop.variants.map((variant, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  {variant.name}
                </h3>
                <p className="text-gray-600">
                  <strong className="font-medium">Price:</strong> $
                  {variant.price}
                </p>
                <p className="text-gray-600">
                  <strong className="font-medium">Min Price:</strong> $
                  {variant.minPrice}
                </p>
                <p className="text-gray-600">
                  <strong className="font-medium">Max Price:</strong> $
                  {variant.maxPrice}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Raw Excel Data
          </h2>
          <pre className="bg-gray-100 p-6 rounded-lg text-sm text-gray-700 overflow-x-auto border border-gray-200">
            {JSON.stringify(crop.otherDetails.rawExcelData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CropExcelDetailClient;
