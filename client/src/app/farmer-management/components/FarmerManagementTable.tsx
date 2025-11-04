import { useMemo, useState } from "react";
import FarmersData from "../../../data/Farmers.json";
import ReportCropApprovalData from "../../../data/reportcropapproval.json";
import TradeActivitiesData from "../../../data/TradeActivities.json";
import { MoreHorizontal, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { FarmerData } from "../../../types";
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
      data: FarmersData,
    },
    {
      id: "cropRegistration",
      name: "Crop Registration",
      data: ReportCropApprovalData,
    },
    {
      id: "tradeExecution",
      name: "Trade Execution",
      data: TradeActivitiesData,
    },
  ];

  const activeTabData = useMemo(() => {
    const currentTab = tabs().find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.data : [];
  }, [activeTab]);

  const filteredData = useMemo(() => {
    return activeTabData.filter((item) => {
      const farmerName =
        (item as { name?: string }).name ||
        (item as { farmer?: { name: string } }).farmer?.name ||
        (item as { farmerName?: string }).farmerName ||
        "";
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
      case "totalFarmersRegistered":
        return ["Farmer", "Taluka", "Village", "Contact", "Status", "Actions"];
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
    item: FarmerData,
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
              <div className="text-sm font-medium text-gray-900"></div>
              <div className="text-sm text-gray-500">
                {activeTab === "totalComplaintResolved"
                  ? `${item.id}`
                  : `BDA ID: ${item.bda?.id || item.bdaId}`}
              </div>
            </div>
          </div>
        );
      case "Taluka":
        return item.taluka || "N/A";
      case "Account Status":
        return (
          <span
            className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
              item.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <span> {item.status}</span>
          </span>
        );
      case "Crop/Qty":
        return (
          <span className="px-10 py-3 w-20 bg-yellow-100 rounded-md">
            {item.cropQty}
          </span>
        );
      case "Village":
        return item.village;
      case "Contact":
        return item.number;
      case "Seller":
        if (activeTab === "totalTradeFacilitated") {
          return (
            <div className="px-10 py-3 bg-green-100 rounded-md">
              <div>{`${item?.seller || "N/A"}`}</div>
              <div className="text-xs text-gray-500">{`${
                item?.sellerId || "N/A"
              }`}</div>
            </div>
          );
        }
        return (
          <span className="px-10 py-3 bg-green-100 rounded-md">
            {`${item?.seller || "N/A"}`}
          </span>
        );
      case "Buyer":
        if (activeTab === "totalTradeFacilitated") {
          return (
            <div className="px-10 py-3 bg-purple-100 rounded-md">
              <div>{`${item?.buyer || "N/A"}`}</div>
              <div className="text-xs text-gray-500">{`${
                item?.buyerType || "N/A"
              }`}</div>
            </div>
          );
        }
        return (
          <span className="px-10 py-3 bg-purple-100 rounded-md">
            {`${item?.buyer || "N/A"}`}
          </span>
        );
      case "Complaint ID":
        return item.complaintId || "N/A";
      case "Issue":
        return (
          <span className="px-10 py-3 w-20 bg-red-100 text-red-600 rounded-md">
            {item?.issueType || "N/A"}
          </span>
        );
      case "Raised on":
        return item.raisedOn
          ? new Date(item.raisedOn).toLocaleDateString()
          : "N/A";
      case "Status":
        return (
          <span
            className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
          >
            {item.status === "Active" && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0H2C0.89543 0 0 0.89543 0 2V10C0 11.1046 0.89543 12 2 12H10C11.1046 12 12 11.1046 12 10V2C12 0.89543 11.1046 0 10 0ZM8.5 4L5 7.5L3.5 6L4.5 5L5 5.5L7.5 3L8.5 4Z"
                  fill="#10B981"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {item.status === "Approved" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="16"
                viewBox="0 0 13 16"
                fill="none"
              >
                <path
                  d="M5.16667 11.3327L2.5 8.66602L3.44 7.72602L5.16667 9.44602L9.56 5.05268L10.5 5.99935M6.5 0.666016L0.5 3.33268V7.33268C0.5 11.0327 3.06 14.4927 6.5 15.3327C9.94 14.4927 12.5 11.0327 12.5 7.33268V3.33268L6.5 0.666016Z"
                  fill="#3F9E5F"
                />
              </svg>
            )}
            {item.status === "Completed" && (
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.66667 10.6667L2 8L2.94 7.06L4.66667 8.78L9.06 4.38667L10 5.33333M6 1.33333C6.17681 1.33333 6.34638 1.40357 6.4714 1.5286C6.59643 1.65362 6.66667 1.82319 6.66667 2C6.66667 2.17681 6.59643 2.34638 6.4714 2.4714C6.34638 2.59643 6.17681 2.66667 6 2.66667C5.82319 2.66667 5.65362 2.59643 5.5286 2.4714C5.40357 2.34638 5.33333 2.17681 5.33333 2C5.33333 1.82319 5.40357 1.65362 5.5286 1.5286C5.65362 1.40357 5.82319 1.33333 6 1.33333ZM10.6667 1.33333H7.88C7.6 0.56 6.86667 0 6 0C5.13333 0 4.4 0.56 4.12 1.33333H1.33333C0.979711 1.33333 0.640573 1.47381 0.390524 1.72386C0.140476 1.97391 0 2.31304 0 2.66667V12C0 12.3536 0.140476 12.6928 0.390524 12.9428C0.640573 13.1929 0.979711 13.3333 1.33333 13.3333H10.6667C11.0203 13.3333 11.3594 13.1929 11.6095 12.9428C11.8595 12.6928 12 12.3536 12 12V2.66667C12 2.31304 11.8595 1.97391 11.6095 1.72386C11.3594 1.47381 11.0203 1.33333 10.6667 1.33333Z"
                  fill="#3F9E5F"
                />
              </svg>
            )}
            {item.status === "Resolved" && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 7.99984L10.258 10.4438C10.4598 10.5952 10.7114 10.6647 10.9624 10.6384C11.2133 10.612 11.445 10.4918 11.611 10.3018L18 2.99984"
                  stroke="#3F9E5F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M19 9.99984C19 11.8804 18.411 13.7137 17.3157 15.2423C16.2203 16.7708 14.6736 17.9179 12.8929 18.5224C11.1122 19.1269 9.18685 19.1583 7.3873 18.6124C5.58776 18.0665 4.00442 16.9706 2.85967 15.4787C1.71492 13.9867 1.06627 12.1736 1.00481 10.2941C0.943352 8.41461 1.47218 6.56305 2.51702 4.9995C3.56187 3.43595 5.07023 2.23896 6.83027 1.57665C8.5903 0.914347 10.5136 0.81999 12.33 1.30684"
                  stroke="#3F9E5F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
            <span className="pl-2">{item.status}</span>
          </span>
        );
      case "BDA":
        return (
          <div className="flex flex-col items-start">
            <div className="text-sm font-medium text-gray-900">
              {typeof item.bda?.name === "string"
                ? item.bda.name
                : item.bda?.name
                ? `${item.bda.name.first} ${item.bda.name.middle || ""} ${
                    item.bda.name.last
                  }`
                : ""}
            </div>
            <div className="text-sm text-gray-500">BDA ID: {item.bda?.id}</div>
          </div>
        );
      case "BDA ID":
        return item.bdaId;
      case "Actions":
        return (
          <>
            {activeTab === "totalFarmersRegistered" ? (
              <a
                href={`/farmers/${item.id}`}
                className="text-blue-600 hover:text-blue-900 mr-2 px-2 py-2 border-2 border-blue-400 rounded-md"
              >
                View profile
              </a>
            ) : activeTab === "totalComplaintResolved" ? (
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 mr-2 px-10 py-2 border-2 border-gray-400 rounded-md"
              >
                Review
              </a>
            ) : (
              <>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 mr-2 px-14 py-2 border-2 border-gray-400 rounded-md"
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
              {currentData.map((item) => (
                <tr key={item.id}>
                  {getTableHeaders().map((header) => (
                    <td
                      key={header}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                    >
                      {renderTableCell(item as FarmerData, header, activeTab)}
                    </td>
                  ))}
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
                        ? "z-10 bg-blue-500 border-blue-500 text-blue-600"
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
