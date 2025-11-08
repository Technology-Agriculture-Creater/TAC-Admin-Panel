import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { categoryMapper } from "./categoryMapper.ts";
import { cropImageMapper } from "./cropImageMapper.ts";

// 🧠 Recreate __dirname (fix for "is not defined" in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Helper: dynamically find image in /uploads
const findImageInUploads = (name: string): string => {
  const uploadsDir = path.join(__dirname, "../../uploads");
  const normalized = name.toLowerCase().replace(/\s+/g, " ");
  const allFiles = fs.readdirSync(uploadsDir);
  const match = allFiles.find((file) =>
    file.toLowerCase().includes(normalized)
  );

  if (match) return `/uploads/${match}`;
  return `/uploads/defaults/placeholder.png`; // fallback image
};

export const mapRowToCrop = (row: Record<string, any>) => {
  let reportedDate: Date | null = null;
  if (row["Reported Date"]) {
    const excelDate = Number(row["Reported Date"]);
    if (!isNaN(excelDate)) {
      reportedDate = new Date((excelDate - 25569) * 86400 * 1000);
    } else {
      reportedDate = new Date(row["Reported Date"]);
    }
  }

  const cropName = (row["Crop Name"] || "Unknown Crop").trim();
  const normalizedCrop = cropName.toLowerCase();

  const cropImage =
    cropImageMapper[cropName] ||
    findImageInUploads(cropName) ||
    `/uploads/${normalizedCrop.replace(/\s+/g, "_")}.jpg`;

  const categoryName = (row["Category"] || "General").trim();
  const categoryImage =
    categoryMapper[categoryName] ||
    findImageInUploads(categoryName) ||
    `/uploads/${categoryName.toLowerCase().replace(/\s+/g, "_")}.jpg`;

  const crop: any = {
    name: cropName,
    category: {
      name: categoryName,
      image: categoryImage,
    },
    location: {
      latitude: 0,
      longitude: 0,
      city: row["District"] || "Unknown City",
      state: row["State"] || "Unknown State",
    },
    supplyDemand: {
      arrivalQtyToday: parseFloat(row["Arrivals (Tonnes)"]) || 0,
      stockAvailability: 0,
      majorArrivalDistricts: [row["District"] || ""],
    },
    marketLocation: row["Market"] || "Not Specified",
    cropInsights: {
      season: row["Season"] || "",
      sowingTime: "",
      harvestTime: "",
      averageYield: "",
      requiredTemperature: "",
      waterRequirement: "",
    },
    farmerInformation: {
      recommendedSellingTime: "",
      storageTips: "",
      qualityGrading: "",
    },
    additionalDetails: {
      govtMSP: undefined,
      exportImportStatus: "",
      subsidiesSchemes: [],
    },
    variants: [
      {
        name: cropName,
        image: cropImage,
        price: parseFloat(row["Modal Price (Rs./Quintal)"]) || 0,
        minPrice: parseFloat(row["Min Price (Rs./Quintal)"]) || 0,
        maxPrice: parseFloat(row["Max Price (Rs./Quintal)"]) || 0,
      },
    ],
    otherDetails: {
      reportedDate,
      rawExcelData: row,
    },
  };

  return crop;
};
