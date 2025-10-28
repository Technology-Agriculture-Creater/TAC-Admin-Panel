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
import ReportCropApprovalData from "../data/reportcropapproval.json";
import TradeActivitiesData from "../data/TradeActivities.json";
import ComplaintsData from "../data/Complaints.json";
import { MoreHorizontal, Search } from "lucide-react";
import Image from "next/image";
import { FarmerData } from "../../src/types";

const FarmerManagementTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("totalFarmersRegistered");

  const tabs = () => [
    {
      id: "totalFarmersRegistered",
      name: "Total Farmers Registered",
      data: FarmersData,
    },
    {
      id: "totalCropsVerified",
      name: "Total Crops Verified",
      data: ReportCropApprovalData,
    },
    {
      id: "totalTradeFacilitated",
      name: "Total Trade Facilitated",
      data: TradeActivitiesData,
    },
    {
      id: "totalComplaintResolved",
      name: "Total Complaint Resolved",
      data: ComplaintsData,
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

      if (activeTab === "totalComplaintResolved") {
        return matchesSearchTerm && item.status === "Resolved";
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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
              <div className="text-sm font-medium text-gray-900">
                {activeTab === "totalCropsVerified"
                  ? item.bda?.name
                  : typeof item.farmer === "object" && item.farmer !== null
                  ? item.farmer.name
                  : item.farmer || item.name}
              </div>
              <div className="text-sm text-gray-500">
                BDA ID: {item.bda?.id || item.bdaId}
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
          const tradeItem = item;
          return (
            <span className="px-10 py-3 w-full bg-green-100 rounded-md">
              <div>{`${tradeItem?.seller || "N/A"}`}</div>
              <div className="text-xs text-gray-500">{`${
                tradeItem?.sellerId || "N/A"
              }`}</div>
            </span>
          );
        }
        return (
          <span className="px-10 py-3 w-full bg-green-100 rounded-md">
            {`${item?.seller || "N/A"}`}
          </span>
        );
      case "Buyer":
        if (activeTab === "totalTradeFacilitated") {
          const tradeItem = item;
          return (
            <span className="px-10 py-3 w-full bg-purple-100 rounded-md">
              <div>{`${tradeItem?.buyer || "N/A"}`}</div>
              <div className="text-xs text-gray-500">{`${
                tradeItem?.buyerType || "N/A"
              }`}</div>
            </span>
          );
        }
        return (
          <span className="px-10 py-3 w-full bg-purple-100 rounded-md">
            {`${item?.buyer || "N/A"}`}
          </span>
        );
      case "Complaint ID":
        return item.complaintId || "N/A";
      case "Issue":
        return item.issue || "N/A";
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
                  d="M8.66732 6C8.66732 6.70725 8.38637 7.38552 7.88627 7.88562C7.38617 8.38572 6.7079 8.66667 6.00065 8.66667C5.29341 8.66667 4.61513 8.38572 4.11503 7.88562C3.61494 7.38552 3.33398 6.70725 3.33398 6C3.33398 5.29276 3.61494 4.61448 4.11503 4.11438C4.61513 3.61429 5.29341 3.33334 6.00065 3.33334C6.7079 3.33334 7.38617 3.61429 7.88627 4.11438C8.38637 4.61448 8.66732 5.29276 8.66732 6Z"
                  fill="#3F9E5F"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 10.6667C6.61284 10.6667 7.21967 10.546 7.78586 10.3114C8.35204 10.0769 8.86649 9.73317 9.29983 9.29983C9.73317 8.86649 10.0769 8.35204 10.3114 7.78586C10.546 7.21967 10.6667 6.61284 10.6667 6C10.6667 5.38716 10.546 4.78033 10.3114 4.21414C10.0769 3.64796 9.73317 3.13351 9.29983 2.70017C8.86649 2.26683 8.35204 1.92308 7.78586 1.68856C7.21967 1.45404 6.61284 1.33333 6 1.33333C4.76232 1.33333 3.57534 1.825 2.70017 2.70017C1.825 3.57534 1.33333 4.76232 1.33333 6C1.33333 7.23768 1.825 8.42466 2.70017 9.29983C3.57534 10.175 4.76232 10.6667 6 10.6667ZM6 12C6.78793 12 7.56815 11.8448 8.2961 11.5433C9.02405 11.2417 9.68549 10.7998 10.2426 10.2426C10.7998 9.68549 11.2417 9.02405 11.5433 8.2961C11.8448 7.56815 12 6.78793 12 6C12 5.21207 11.8448 4.43185 11.5433 3.7039C11.2417 2.97595 10.7998 2.31451 10.2426 1.75736C9.68549 1.20021 9.02405 0.758251 8.2961 0.456723C7.56815 0.155195 6.78793 -1.17411e-08 6 0C4.4087 2.37122e-08 2.88258 0.632141 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6C0 7.5913 0.632141 9.11742 1.75736 10.2426C2.88258 11.3679 4.4087 12 6 12Z"
                  fill="#3F9E5F"
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
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M19 9.99984C19 11.8804 18.411 13.7137 17.3157 15.2423C16.2203 16.7708 14.6736 17.9179 12.8929 18.5224C11.1122 19.1269 9.18685 19.1583 7.3873 18.6124C5.58776 18.0665 4.00442 16.9706 2.85967 15.4787C1.71492 13.9867 1.06627 12.1736 1.00481 10.2941C0.943352 8.41461 1.47218 6.56305 2.51702 4.9995C3.56187 3.43595 5.07023 2.23896 6.83027 1.57665C8.5903 0.914347 10.5136 0.81999 12.33 1.30684"
                  stroke="#3F9E5F"
                  stroke-width="2"
                  stroke-linecap="round"
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
              {item.bda?.name}
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
                className="text-blue-600 hover:text-blue-900 mr-2 px-2 py-2 border-2 border-blue-400 rounded-md"
              >
                Review
              </a>
            ) : (
              <>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-900 mr-2 px-2 py-2 border-2 border-blue-400 rounded-md"
                >
                  View
                </a>
              </>
            )}
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
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" bg-white p-4 mt-8 rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center mb-8 justify-between border-b border-gray-200 w-full">
        {tabs().map((tab) => (
          <div
            key={tab.id}
            className={`p-4 cursor-pointer text-center ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-500 text-2xl font-semibold"
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
  );
};

export default FarmerManagementTable;
