"use client";

import { useMemo, useState } from "react";
import FarmersData from "../../../../data/FramerManagement.json";
import { FarmerManagementData } from "../../../../types";
import { MoreHorizontal, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../farmer-management/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../farmer-management/components/ui/dropdown-menu";
import { Input } from "../../../farmer-management/components/ui/input";

interface BdaFarmerManagementTableProps {
  bdaName: string;
}

const BdaFarmerManagementTable: React.FC<
  BdaFarmerManagementTableProps
> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("farmerRegistry");
  const [selectedDuration, setSelectedDuration] = useState("Last 1 Month");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const tabs = () => [
    {
      id: "farmerregistered",
      name: "Farmer Registered",
      data: FarmersData as FarmerManagementData[],
    },
    {
      id: "totalcropsverified",
      name: "Total Crops Verified",
      data: [],
    },
    {
      id: "totaltradefacilated",
      name: "Total Trade Facilated",
      data: [],
    },
    {
      id: "totalcomplaintresolved",
      name: "Total Complaint Resolved",
      data: [],
    },
  ];

  const activeTabData = useMemo(() => {
    const currentTab = tabs().find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.data : [];
  }, [activeTab]);

  const filteredData = useMemo(() => {
    return activeTabData.filter((item) => {
      const farmerName = (item as FarmerManagementData)["Farmer Name"] || "";
      const matchesSearchTerm = farmerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (activeTab === "farmerRegistry") {
        return matchesSearchTerm;
      }
      return matchesSearchTerm;
    });
  }, [activeTabData, searchTerm, activeTab]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const getTableHeaders = () => {
    switch (activeTab) {
      case "farmerregistered":
        return [
          "Farmer",
          "Taluka",
          "Village",
          "Contact",
          "Account Status",
          "Actions",
        ];
      case "totalcropsverified":
        return ["Farmer", "Crop/Qty", "Village", "Status", "Actions"];
      case "totaltradefacilated":
        return ["Farmer", "Seller", "Village", "Buyer", "Status", "Actions"];
      case "totalcomplaintresolved":
        return [
          "Complaint ID",
          "Farmer",
          "Taluka",
          "Issue",
          "Raised on",
          "Status",
          "Actions",
        ];
      default:
        return ["Farmer", "Crop/Qty", "Village", "Status", "Actions"];
    }
  };

  const renderTableCell = (
    item: FarmerManagementData,
    header: string,
    activeTab: string
  ) => {
    switch (header) {
      case "Farmer":
        return (
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
                {item["Farmer Name"]}
              </div>
              <div className="text-sm text-gray-500">{item["Farmer ID"]}</div>
            </div>
          </div>
        );
      case "Taluka":
        return item.Taluka || "N/A";
      case "Account Status":
        return (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              item["Account Status"] === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {item["Account Status"]}
          </span>
        );

      case "Village":
        return item.Village || "N/A";
      case "Contact":
        return item.Contact || "N/A";

      case "Actions":
        return (
          <>
            {activeTab === "totalFarmersRegistered" ? (
              <a
                href={`/farmers/${(item as FarmerManagementData)["Farmer ID"]}`}
                className="text-blue-600 hover:text-blue-900 bg-blue-100 w-40 px-3 py-1 rounded-md"
              >
                View profile
              </a>
            ) : activeTab === "totalComplaintResolved" ? (
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 bg-white border w-40 border-gray-300 px-3 py-1 rounded-md"
              >
                Review
              </a>
            ) : (
              <>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-900 bg-blue-100 w-40 px-12 mr-4 py-1 rounded-md"
                >
                  View
                </a>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 bg-gray-200 text-gray-900 px-4 py-2 rounded-md"
                >
                  ...
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 bg-white p-4 mt-8 overflow-hidden">
      {/* Distinct Header Section */}
      <div className="p-4 mb-4 w-full">
        {/* Four Main Tabs */}
        <div className="flex w-full border-b mb-4">
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium ${
              activeTab === "farmerregistered"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("farmerregistered")}
          >
            Total Farmer Registered
          </button>
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium ${
              activeTab === "totalcropsverified"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("totalcropsverified")}
          >
            Total Crops Verified
          </button>
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium ${
              activeTab === "totaltradefacilated"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("totaltradefacilated")}
          >
            Total Trade Facilitated
          </button>
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium ${
              activeTab === "totalcomplaintresolved"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("totalcomplaintresolved")}
          >
            Total Complaint Resolved
          </button>
        </div>

        {/* Merged FarmerDashboardHeader Content (Farmer registered tab only) */}
        {activeTab === "farmerregistered" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-60">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <select
                    className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-8"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                  >
                    <option>Last 1 Month</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                <div className="relative">
                  <select className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-8">
                    <option>Sort</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className=" ">
        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {getTableHeaders().map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.length === 0 &&
              (activeTab === "totalcropsverified" ||
                activeTab === "totaltradefacilated" ||
                activeTab === "totalcomplaintresolved") ? (
                <tr>
                  <td
                    colSpan={getTableHeaders().length}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                  >
                    No data present
                  </td>
                </tr>
              ) : (
                currentData.map((item) => (
                  <tr key={(item as FarmerManagementData)["Farmer ID"]}>
                    {getTableHeaders().map((header) => (
                      <td
                        key={header}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                      >
                        {renderTableCell(
                          item as FarmerManagementData,
                          header,
                          activeTab
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
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
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
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
    </div>
  );
};

export default BdaFarmerManagementTable;
