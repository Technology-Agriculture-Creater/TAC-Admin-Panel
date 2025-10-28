"use client";

import { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import FarmersData from "../data/Farmers.json";
import CropApprovalData from "../data/CropApproval.json";
import FarmersOnboardedData from "../data/FarmersOnboarded.json";
import CropsRejectedData from "../data/CropsRejected.json";
import CropsAwaitingApprovalData from "../data/CropsAwaitingApproval.json";
import { MoreHorizontal, Search } from "lucide-react";
import Image from "next/image";

const FarmerManagementTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("totalFarmersRegistered");

  const tabs = [
    {
      id: "totalFarmersRegistered",
      name: "Total Farmers Registered",
      data: FarmersData,
    },
    {
      id: "totalCropsVerified",
      name: "Total Crops Verified",
      data: CropApprovalData,
    },
    {
      id: "totalFarmersOnboarded",
      name: "Total Farmers Onboarded",
      data: FarmersOnboardedData,
    },
    {
      id: "totalCropsRejected",
      name: "Total Crops Rejected",
      data: CropsRejectedData,
    },
    {
      id: "totalCropsAwaitingApproval",
      name: "Total Crops Awaiting Approval",
      data: CropsAwaitingApprovalData,
    },
  ];

  const activeTabData = useMemo(() => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.data : [];
  }, []);

  const filteredData = useMemo(() => {
    return activeTabData.filter((item) => {
      const farmerName =
        (item as { name?: string }).name ||
        (item as { farmer?: string }).farmer ||
        "";
      return farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [activeTabData, searchTerm]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className=" bg-white p-4 mt-8 rounded-lg shadow-md">
      <div className="flex items-center mb-8 justify-between border-b border-gray-200 w-full">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`p-4 cursor-pointer text-center ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab(tab.id);
              setCurrentPage(1); // Reset to first page on tab change
            }}
          >
            <p className="text-lg font-semibold">{tab.data.length}</p>
            <p className="text-sm">{tab.name}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative w-60">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <div className="relative">
              <select className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-20">
                <option>Last 7 days</option>
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
            <div className="relative">
              <select className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-20">
                <option> Sort</option>
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
        </div>
      </div>

      <div className="rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Farmer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Taluka
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Village
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Account Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((item: any) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        className="h-10 w-10 rounded-full object-cover"
                        src="/Images/profile.jpg"
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4 flex flex-col items-start">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Farmer ID: {item.bdaId || item.bda?.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {item.village} {/* Placeholder for Taluka */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {item.village}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  9876543210 {/* Placeholder for Contact */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-900 mr-2 px-2 py-2 border-2 border-blue-400 rounded-md"
                  >
                    View profile
                  </a>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredData.length)}
              </span>{" "}
              of <span className="font-medium">{filteredData.length}</span>{" "}
              results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                variant="outline"
              >
                Previous
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === i + 1
                      ? "z-10 bg-green-50 border-green-500 text-green-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  variant="outline"
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                variant="outline"
              >
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerManagementTable;
