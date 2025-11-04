"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FarmerDashboardHeader: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("Nagpur");
  const [selectedTaluka, setSelectedTaluka] = useState("All");
  const [selectedVillage, setSelectedVillage] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [selectedDuration, setSelectedDuration] = useState("Last 1 Month");

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        {/* Total Registered Farmers Card */}
        <div className="flex-1 p-4 border rounded-lg shadow-sm mr-4">
          <p className="text-lg text-gray-500">Total Registered Farmers</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">1256</p>
            <p className="text-green-500 text-sm">+12%</p>
          </div>
        </div>

        {/* Newly Registered Farmers Card */}
        <div className="flex-1 p-4 border rounded-lg shadow-sm">
          <p className="text-lg text-gray-500">Newly Registered Farmers</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">116</p>
            <p className="text-green-500 text-sm">+12%</p>
          </div>
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        {/* District Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            District
          </label>
          <div className="relative">
            <select
              className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-8 w-full"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option>Nagpur</option>
              {/* Add other district options here */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Taluka Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Taluka
          </label>
          <div className="relative">
            <select
              className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-8 w-full"
              value={selectedTaluka}
              onChange={(e) => setSelectedTaluka(e.target.value)}
            >
              <option>All</option>
              {/* Add other taluka options here */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Village Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Village
          </label>
          <div className="relative">
            <select
              className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-8 w-full"
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
            >
              <option>All</option>
              {/* Add other village options here */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <div className="relative">
            <select
              className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-8 w-full"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option>Active</option>
              {/* Add other status options here */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Duration Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <div className="relative">
            <select
              className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-8 w-full"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              <option>Last 1 Month</option>
              {/* Add other duration options here */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboardHeader;
