"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import * as XLSX from "xlsx";

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

const Page = () => {
  const [excelData, setExcelData] = useState<CropData[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (!result || typeof result === "string") return;
        const data = new Uint8Array(result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        const processedData: CropData[] = (json as any[]).map((item) => ({
          _id: { $oid: item._id?.$oid || new Date().getTime().toString() },
          name: item.name,
          category: {
            name: item["category.name"],
            image: item["category.image"] || "",
          },
          location: {
            latitude: item["location.latitude"] || 0,
            longitude: item["location.longitude"] || 0,
            city: item["location.city"],
            state: item["location.state"],
          },
          supplyDemand: {
            arrivalQtyToday: item["supplyDemand.arrivalQtyToday"] || 0,
            stockAvailability: item["supplyDemand.stockAvailability"] || 0,
            majorArrivalDistricts: item["supplyDemand.majorArrivalDistricts"]
              ? item["supplyDemand.majorArrivalDistricts"].split(",")
              : [],
          },
          marketLocation: item["marketLocation"],
          cropInsights: {
            season: item["cropInsights.season"] || "",
            sowingTime: item["cropInsights.sowingTime"] || "",
            harvestTime: item["cropInsights.harvestTime"] || "",
            averageYield: item["cropInsights.averageYield"] || "",
            requiredTemperature: item["cropInsights.requiredTemperature"] || "",
            waterRequirement: item["cropInsights.waterRequirement"] || "",
          },
          farmerInformation: {
            recommendedSellingTime:
              item["farmerInformation.recommendedSellingTime"] || "",
            storageTips: item["farmerInformation.storageTips"] || "",
            qualityGrading: item["farmerInformation.qualityGrading"] || "",
          },
          additionalDetails: {
            govtMSP: item["additionalDetails.govtMSP"] || null,
            exportImportStatus:
              item["additionalDetails.exportImportStatus"] || "",
            subsidiesSchemes: item["additionalDetails.subsidiesSchemes"]
              ? item["additionalDetails.subsidiesSchemes"].split(",")
              : [],
          },
          variants: [
            {
              name: item["variants[0].name"] || item.name,
              image: item["variants[0].image"] || "",
              price: item["variants[0].price"] || 0,
              minPrice: item["variants[0].minPrice"] || 0,
              maxPrice: item["variants[0].maxPrice"] || 0,
            },
          ],
          otherDetails: {
            reportedDate: {
              $date:
                item["otherDetails.reportedDate.$date"] ||
                new Date().toISOString(),
            },
            rawExcelData: item,
          },
        }));

        setExcelData(processedData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  console.log(excelData);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = excelData
    ? excelData.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = excelData ? Math.ceil(excelData.length / itemsPerPage) : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Image
            src="/Images/Vector.png"
            alt="Onboarding"
            width={24}
            height={24}
            className=""
          />
          <h2 className="text-lg font-semibold">All Crops</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Category</span>
            <div className="relative">
              <select className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-20">
                <option> All</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Sort by</span>
            <div className="relative">
              <select className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-20">
                <option> All</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".xlsx, .xls"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium"
              onClick={handleButtonClick}
            >
              Import Excel data
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Crop Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                City
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                State
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price (Rs./Quintal)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems &&
            Array.isArray(currentItems) &&
            currentItems.length > 0 ? (
              currentItems.map((crop: CropData, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {crop.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-center text-gray-900">
                      {crop.category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 inline-flex text-xs text-center leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {crop.location.city}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-500">
                    {crop.location.state}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-500">
                    {crop.variants[0].price}
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-medium flex items-center justify-center gap-4">
                    <a
                      href="#"
                      className="text-zinc-600 border border-zinc-600 hover:text-white hover:bg-zinc-600 px-3 py-1 rounded-md"
                    >
                      Details
                    </a>
                    <a
                      href="#"
                      className="text-green-600 border border-green-600 hover:text-white hover:bg-green-500 px-3 py-1 rounded-md"
                    >
                      Update
                    </a>
                    <a
                      href="#"
                      className="text-red-600 border border-red-600 hover:text-white hover:bg-red-600 px-3 py-1 rounded-md"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              aria-current={currentPage === i + 1 ? "page" : undefined}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                currentPage === i + 1
                  ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Page;
