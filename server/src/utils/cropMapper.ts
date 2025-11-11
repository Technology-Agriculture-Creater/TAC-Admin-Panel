import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { categoryMapper } from "./categoryMapper.ts";
import { cropImageMapper } from "./cropImageMapper.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 🧩 Optimized image lookup (safe for both Array & Set)
 */
const findImageInUploads = (name: string, allFiles?: string[] | Set<string>): string => {
  if (!name) return `/uploads/defaults/placeholder.png`;

  const normalized = name.toLowerCase().replace(/\s+/g, " ");
  let match: string | undefined;

  if (Array.isArray(allFiles)) {
    // ✅ Normal case
    match = allFiles.find((file) => file.toLowerCase().includes(normalized));
  } else if (allFiles instanceof Set) {
    // ✅ Safety for when a Set is passed
    for (const file of allFiles) {
      if (file.toLowerCase().includes(normalized)) {
        match = file;
        break;
      }
    }
  } else {
    console.warn("⚠️ allFiles not iterable. Using empty list instead.");
  }

  return match ? `/uploads/${match}` : `/uploads/defaults/placeholder.png`;
};

/**
 * 🧠 Core mapper (safe for background jobs)
 */
export const mapRowToCrop = (row: Record<string, any>, allFiles?: string[] | Set<string>) => {
  // 🧮 Excel date conversion
  let reportedDate: Date | null = null;
  if (row["Reported Date"]) {
    const excelDate = Number(row["Reported Date"]);
    reportedDate = !isNaN(excelDate)
      ? new Date((excelDate - 25569) * 86400 * 1000)
      : new Date(row["Reported Date"]);
  }

  // 🌾 Core crop info
  const cropName = (row["Crop Name"] || "Unknown Crop").trim();
  const normalizedCrop = cropName.toLowerCase();

  // 🖼 Crop image
  const cropImage =
    cropImageMapper[cropName] ||
    findImageInUploads(cropName, allFiles) ||
    `/uploads/${normalizedCrop.replace(/\s+/g, "_")}.jpg`;

  // 🗂 Category image
  const categoryName = (row["Category"] || "General").trim();
  const categoryImage =
    categoryMapper[categoryName] ||
    findImageInUploads(categoryName, allFiles) ||
    `/uploads/${categoryName.toLowerCase().replace(/\s+/g, "_")}.jpg`;

  // 🧱 Construct final document
  return {
    name: cropName,
    category: { name: categoryName, image: categoryImage },
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
};

/**
 * 🔥 Helper to preload all filenames once
 */
export const getAllUploadFiles = (): string[] => {
  const uploadsDir = path.join(__dirname, "../../uploads");
  try {
    return fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];
  } catch (err) {
    console.error("⚠️ Failed to read uploads directory:", err);
    return [];
  }
};
