"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  CropApproval,
  System,
  Dispute,
  Complaint,
  TradeActivity,
} from "../../../types";
import { Search } from "lucide-react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import TabComponent from "../../../components/TabComponent";
import cropApprovalData from "../../../data/CropApproval.json";
import tradeData from "../../../data/TradeActivities.json";
import complaintsData from "../../../data/Complaints.json";
import disputesData from "../../../data/Disputes.json";
import systemData from "../../../data/System.json";
import CropApprovalTable from "./CropApprovalTable";
import TradeActivitiesTable from "./TradeActivitiesTable";
import ComplaintsTable from "./ComplaintsTable";
import SystemTable from "./SystemTable";
import DisputesTable from "./DisputesTable";

const VillageActivityPanel = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Crop Approval");
  const itemsPerPage = 10;

  const data = (() => {
    switch (activeTab) {
      case "Crop Approval":
        return cropApprovalData;
      case "Trade Activities":
        return tradeData;
      case "Complaints":
        return complaintsData;
      case "Disputes":
        return disputesData;
      case "System":
        return systemData;
      default:
        return [];
    }
  })();

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Awaiting approval":
      case "Pending":
      case "Open":
      case "In Review":
        return {
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00004 12.8333C10.2217 12.8333 12.8334 10.2216 12.8334 6.99996C12.8334 3.77829 10.2217 1.16663 7.00004 1.16663C3.77837 1.16663 1.16671 3.77829 1.16671 10.2216 3.77837 12.8333 7.00004 12.8333Z"
                stroke="#D97706"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 4.66663V7.00004"
                stroke="#D97706"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 9.33337H7.00583"
                stroke="#D97706"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          color: "#D97706",
          backgroundColor: "#FFFBEB",
        };
      case "Approved":
      case "Resolved":
      case "Closed":
      case "Completed":
        return {
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00004 12.8333C10.2217 12.8333 12.8334 10.2216 12.8334 6.99996C12.8334 3.77829 10.2217 1.16663 7.00004 1.16663C3.77837 1.16663 1.16671 3.77829 1.16671 10.2216 3.77837 12.8333 7.00004 12.8333Z"
                stroke="#059669"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.66671 7L6.41671 8.75L9.33337 5.83333"
                stroke="#059669"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          color: "#059669",
          backgroundColor: "#ECFDF5",
        };
      case "Rejected":
      case "Warning":
        return {
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00004 12.8333C10.2217 12.8333 12.8334 10.2216 12.8334 6.99996C12.8334 3.77829 10.2217 1.16663 7.00004 1.16663C3.77837 1.16663 1.16671 3.77829 1.16671 10.2216 3.77837 12.8333 7.00004 12.8333Z"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.25 8.75L8.75 5.25"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.75 8.75L5.25 5.25"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          color: "#EF4444",
          backgroundColor: "#FEF2F2",
        };
      case "In process":
      case "In Progress":
      case "Pending Resolution":
        return {
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00004 12.8333C10.2217 12.8333 12.8334 10.2216 12.8334 6.99996C12.8334 3.77829 10.2217 1.16663 7.00004 1.16663C3.77837 1.16663 1.16671 3.77829 1.16671 10.2216 3.77837 12.8333 7.00004 12.8333Z"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 4.66663V7.00004"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 9.33337H7.00583"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          color: "#3B82F6",
          backgroundColor: "#EFF6FF",
        };
      default:
        return {
          icon: null,
          color: "#6B7280",
          backgroundColor: "#F9FAFB",
        };
    }
  };

  const filteredData =
    selectedStatus === "All"
      ? data
      : data.filter((item) => item.status === selectedStatus);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <a
          key={i}
          href="#"
          onClick={() => paginate(i)}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
            currentPage === i
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i}
        </a>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-6 font-semibold">
        <Image
          src="/Images/Panel.svg"
          alt="Crop Icon"
          height={0}
          width={0}
          sizes="100vw"
          className="inline-block w-8 h-8 mr-2"
        />
        Village Activity Panel
      </div>
      <TabComponent
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cropApprovalCount={cropApprovalData.length}
        tradeActivitiesCount={tradeData.length}
        complaintsCount={complaintsData.length}
        disputesCount={disputesData.length}
        systemCount={systemData.length}
      />
      {/* Filters Section */}
      <div className="flex items-center justify-between mt-4 space-x-4">
        {/* Dropdowns */}
        <div className="flex space-x-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Status</span>
            <div className="relative">
              <select
                className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-20"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All" selected>
                  All
                </option>
                <option value="Approved">Approved</option>
                <option value="Awaiting approval">Awaiting approval</option>
                <option value="Rejected">Rejected</option>
                {activeTab === "Trade Activities" && (
                  <option value="In process">In process</option>
                )}
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
            <span className="text-sm font-medium text-gray-600">BDA</span>
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
            <span className="text-sm font-medium text-gray-600">Village</span>
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
            <span className="text-sm font-medium text-gray-600">Duration</span>
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
        </div>

        {/* Search Bar */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search here"
            className="border border-gray-300 rounded-l-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 flex items-center justify-between gap-2 text-white p-2 rounded-r-md text-sm hover:bg-blue-700">
            <Search /> Search
          </button>
        </div>
      </div>
      {/* Data Table */}
      <div className="mt-6 overflow-x-auto">
        {activeTab === "Crop Approval" && (
          <CropApprovalTable
            data={currentItems as CropApproval[]}
            getStatusInfo={getStatusInfo}
          />
        )}
        {activeTab === "Trade Activities" && (
          <TradeActivitiesTable
            data={currentItems as TradeActivity[]}
            getStatusInfo={getStatusInfo}
          />
        )}
        {activeTab === "Complaints" && (
          <ComplaintsTable
            data={currentItems as unknown as Complaint[]}
            getStatusInfo={getStatusInfo}
          />
        )}
        {activeTab === "Disputes" && (
          <DisputesTable
            data={currentItems as unknown as Dispute[]}
            getStatusInfo={getStatusInfo}
          />
        )}
        {activeTab === "System" && (
          <SystemTable
            data={currentItems as unknown as System[]}
            getStatusInfo={getStatusInfo}
          />
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <span className="sr-only">Previous</span>
            <ChevronsLeft />
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <span className="sr-only">Next</span>
            <ChevronsRight />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default VillageActivityPanel;
