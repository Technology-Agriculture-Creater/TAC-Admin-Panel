import { useMemo, useState } from "react";
import FarmersData from "../../../data/FramerManagement.json";
import { FarmerManagementData } from "../../../types";
import { MoreHorizontal, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

interface FarmerManagementTableProps {
  currentPage: number;
  searchTerm: string;
  activeTab: string;
  handlePageChange: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setActiveTab: (tab: string) => void;
  setCurrentPage: (page: number) => void;
}

const FarmerManagementTable: React.FC<FarmerManagementTableProps> = ({
  currentPage,
  searchTerm,
  activeTab,
  handlePageChange,
  setSearchTerm,
  setActiveTab,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState("Nagpur");
  const [selectedTaluka, setSelectedTaluka] = useState("All");
  const [selectedVillage, setSelectedVillage] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [selectedDuration, setSelectedDuration] = useState("Last 1 Month");

  const tabs = () => [
    {
      id: "farmerRegistry",
      name: "Farmer registry",
      data: FarmersData as FarmerManagementData[],
    },
    {
      id: "cropRegistration",
      name: "Crop Registration",
      data: [],
    },
    {
      id: "tradeExecution",
      name: "Trade Execution",
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
      case "farmerRegistry":
        return [
          "Farmer",
          "Taluka",
          "Village",
          "Contact",
          "Account Status",
          "Actions",
        ];
      case "totalCropsVerified":
        return ["Farmer", "Crop/Qty", "Village", "Status", "Actions"];
      case "totalTradeFacilitated":
        return ["Farmer", "Seller", "Village", "Buyer", "Status", "Actions"];
      case "totalComplaintResolved":
        return [
          "Complaint ID",
          "Farmer",
          "Taluka",
          "Issue",
          "Raised on",
          "Status",
          "Actions",
        ];
      case "totalFarmersOnboarded":
        return ["Farmer", "BDA ID", "Village", "Status", "Actions"];
      case "totalCropsRejected":
        return ["Farmer", "BDA ID", "Village", "Status", "Actions"];
      case "totalCropsAwaitingApproval":
        return ["Farmer", "BDA ID", "Village", "Status", "Actions"];
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
                src="/images/profile.jpg"
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
        {/* Three Main Tabs */}
        <div className="flex w-full border-b mb-4">
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium ${
              activeTab === "farmerRegistry"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("farmerRegistry")}
          >
            Farmer registry
          </button>
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium ${
              activeTab === "cropRegistration"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("cropRegistration")}
          >
            Crop Registration
          </button>
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium ${
              activeTab === "tradeExecution"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("tradeExecution")}
          >
            Trade Execution
          </button>
        </div>

        {/* Merged FarmerDashboardHeader Content (Farmer registry tab only) */}
        {activeTab === "farmerRegistry" && (
          <>
            <div className="flex items-center justify-between mb-6">
              {/* Total Registered Farmers Card */}
              <div className="flex-1 p-4 border rounded-lg shadow-sm mr-4">
                <p className="text-lg text-gray-500">
                  Total Registered Farmers
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold">1256</p>
                  <p className="text-green-500 text-sm">▲ +12%</p>
                </div>
              </div>

              {/* Newly Registered Farmers Card */}
              <div className="flex-1 p-4 border rounded-lg shadow-sm">
                <p className="text-lg text-gray-500">
                  Newly Registered Farmers
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold">116</p>
                  <p className="text-green-500 text-sm">▲ +12%</p>
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

            {/* Merged FarmerManagementControls Content */}
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
                <div className="relative">
                  <select className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-20">
                    <option> Sort</option>
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
              (activeTab === "cropRegistration" ||
                activeTab === "tradeExecution") ? (
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

export default FarmerManagementTable;
