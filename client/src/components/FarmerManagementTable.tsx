import React, { useState } from "react";
import farmersData from "../data/Farmers.json";
import Image from "next/image";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  SlidersHorizontal,
  MoreHorizontal,
} from "lucide-react";

const FarmerManagementTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const filteredFarmers = farmersData.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.taluka.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.contact.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFarmers = filteredFarmers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="text-center p-2 border-b-2 border-blue-500">
          <p className="text-gray-500 text-sm">Total Farmer Registered</p>
          <p className="text-blue-500 text-xl font-bold">1256</p>
        </div>
        <div className="text-center p-2">
          <p className="text-gray-500 text-sm">Total Crops Verified</p>
          <p className="text-gray-800 text-xl font-bold">245</p>
        </div>
        <div className="text-center p-2">
          <p className="text-gray-500 text-sm">Total Trade Facilitated</p>
          <p className="text-gray-800 text-xl font-bold">24</p>
        </div>
        <div className="text-center p-2">
          <p className="text-gray-500 text-sm">Total Complaint Resolved</p>
          <p className="text-gray-800 text-xl font-bold">23</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
            <CalendarDays size={18} className="mr-2" /> Last 1 Month
          </button>
          <button className="flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
            <SlidersHorizontal size={18} className="mr-2" /> Sort
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-gray-600">
                Farmer
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-600">
                Taluka
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-600">
                Village
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-600">
                Contact
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-600">
                Account Status
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentFarmers.map((farmer) => (
              <tr key={farmer.id}>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center">
                    <Image
                      src="/Images/profile.jpg"
                      alt="Farmer Profile"
                      height={0}
                      width={0}
                      sizes={"100vw"}
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <div>
                      <p className="font-semibold">{farmer.name}</p>
                      <p className="text-gray-500 text-sm">
                        Farmer ID: {farmer.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">{farmer.taluka}</td>
                <td className="py-2 px-4 border-b">{farmer.village}</td>
                <td className="py-2 px-4 border-b">{farmer.contact}</td>
                <td className="py-2 px-4 border-b">
                  <span className="flex items-center text-green-500">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                    {farmer.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center">
                    <button className="px-3 py-1 border rounded-lg text-blue-500 hover:bg-blue-50">
                      View profile
                    </button>
                    <button className="ml-2 p-1 rounded-full hover:bg-gray-100">
                      <MoreHorizontal size={18} className="text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded-lg ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default FarmerManagementTable;
