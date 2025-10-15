"use client";
import React, { useState, useMemo, useEffect } from "react";
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

  useEffect(() => {
    setSelectedStatus("All");
  }, [activeTab]);

  const tabs = [
    {
      label: "Crop Approval",
      icon: "/Images/cropA.png",
      count: cropApprovalData.length,
    },
    {
      label: "Trade Activities",
      icon: "/Images/tradeA.png",
      count: tradeData.length,
    },
    {
      label: "Complaints",
      icon: "/Images/complaint.png",
      count: complaintsData.length,
    },
    {
      label: "Disputes",
      icon: "/Images/dispute.png",
      count: disputesData.length,
    },
    { label: "System", icon: "/Images/system.png", count: systemData.length },
  ];

  const data = useMemo(() => {
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
  }, [activeTab]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set<string>();
    data.forEach((item) => {
      if (item.status) {
        statuses.add(item.status);
      }
    });
    return ["All", ...Array.from(statuses)];
  }, [data]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Awaiting approval":
      case "Pending":
      case "Open":
      case "In Review":
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6.22001 0C6.13514 0 6.05375 0.0337142 5.99373 0.0937258C5.93372 0.153737 5.90001 0.235131 5.90001 0.32V0.96C5.90001 1.04487 5.93372 1.12626 5.99373 1.18627C6.05375 1.24629 6.13514 1.28 6.22001 1.28H6.70001V2.1272C3.23825 2.5256 0.540009 5.47344 0.540009 9.04C0.540009 12.8773 3.66273 16 7.50001 16C11.3373 16 14.46 12.8773 14.46 9.04C14.4613 7.72658 14.0883 6.43999 13.3848 5.33088L14.0629 4.78192L14.365 5.15504C14.3914 5.18772 14.424 5.21486 14.4609 5.23494C14.4979 5.25501 14.5384 5.26761 14.5802 5.27202C14.622 5.27644 14.6642 5.27257 14.7045 5.26065C14.7448 5.24874 14.7824 5.229 14.815 5.20256L15.3126 4.79968C15.3785 4.74624 15.4205 4.66882 15.4293 4.58446C15.4381 4.50009 15.4131 4.41567 15.3597 4.34976L13.7488 2.36C13.7224 2.32732 13.6898 2.30018 13.6528 2.2801C13.6159 2.26003 13.5754 2.24743 13.5336 2.24302C13.4918 2.2386 13.4496 2.24247 13.4093 2.25438C13.369 2.2663 13.3314 2.28604 13.2987 2.31248L12.8011 2.71536C12.7353 2.7688 12.6933 2.84622 12.6845 2.93058C12.6757 3.01495 12.7007 3.09937 12.7541 3.16528L13.0563 3.5384L12.3811 4.08464C11.3032 3.02256 9.88129 2.3096 8.30001 2.12752V1.28H8.78001C8.86488 1.28 8.94627 1.24629 9.00628 1.18627C9.06629 1.12626 9.10001 1.04487 9.10001 0.96V0.32C9.10001 0.235131 9.06629 0.153737 9.00628 0.0937258C8.94627 0.0337142 8.86488 0 8.78001 0L6.22001 0ZM7.50001 3.2C10.732 3.2 13.34 5.808 13.34 9.04C13.34 12.272 10.732 14.88 7.50001 14.88C4.26801 14.88 1.66001 12.272 1.66001 9.04C1.66001 5.808 4.26801 3.2 7.50001 3.2ZM7.50033 4.39088L7.50001 9.04L11.2174 11.8315C11.7359 11.1409 12.0518 10.3196 12.1298 9.45956C12.2077 8.59953 12.0446 7.73479 11.6587 6.96224C11.2727 6.18978 10.6792 5.54009 9.94476 5.08595C9.21029 4.63182 8.36386 4.39103 7.50033 4.39088Z"
                fill="#CDA31C"
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
          ),
          color: "#059669",
          backgroundColor: "#ECFDF5",
        };
      case "Rejected":
      case "Warning":
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M7.00001 12.334C4.06001 12.334 1.66668 9.94065 1.66668 7.00065C1.66668 4.06065 4.06001 1.66732 7.00001 1.66732C9.94001 1.66732 12.3333 4.06065 12.3333 7.00065C12.3333 9.94065 9.94001 12.334 7.00001 12.334ZM7.00001 0.333984C3.31334 0.333984 0.333344 3.31398 0.333344 7.00065C0.333344 10.6873 3.31334 13.6673 7.00001 13.6673C10.6867 13.6673 13.6667 10.6873 13.6667 7.00065C13.6667 3.31398 10.6867 0.333984 7.00001 0.333984ZM8.72668 4.33398L7.00001 6.06065L5.27334 4.33398L4.33334 5.27398L6.06001 7.00065L4.33334 8.72732L5.27334 9.66732L7.00001 7.94065L8.72668 9.66732L9.66668 8.72732L7.94001 7.00065L9.66668 5.27398L8.72668 4.33398Z"
                fill="#E53950"
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
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M4.73812 3.00065H3.53812C4.53812 2.13398 5.73812 1.66732 7.07145 1.66732C7.27145 1.66732 7.47145 1.66732 7.67145 1.73398C8.00479 1.80065 8.33812 1.53398 8.40479 1.13398C8.47145 0.800651 8.20479 0.467318 7.80479 0.400651C7.53812 0.333984 7.33812 0.333984 7.07145 0.333984C5.47145 0.333984 3.93812 0.933984 2.73812 1.93398V1.00065C2.73812 0.600651 2.47145 0.333984 2.07145 0.333984C1.67145 0.333984 1.40479 0.600651 1.40479 1.00065V3.66732C1.40479 4.06732 1.67145 4.33398 2.07145 4.33398H4.73812C5.13812 4.33398 5.40479 4.06732 5.40479 3.66732C5.40479 3.26732 5.13812 3.00065 4.73812 3.00065ZM3.73812 8.66732C3.33812 8.66732 3.07145 8.93398 3.07145 9.33398V10.534C2.20479 9.53398 1.73812 8.33398 1.73812 7.00065C1.73812 6.80065 1.73812 6.60065 1.80479 6.40065C1.87145 6.06732 1.60479 5.73398 1.20479 5.66732C0.871452 5.60065 0.538118 5.86732 0.471452 6.26732C0.404785 6.53398 0.404785 6.73398 0.404785 7.00065C0.404785 8.60065 1.00479 10.134 2.00479 11.334H1.07145C0.671452 11.334 0.404785 11.6007 0.404785 12.0007C0.404785 12.4007 0.671452 12.6673 1.07145 12.6673H3.73812C3.93812 12.6673 4.13812 12.534 4.27145 12.4007C4.27145 12.334 4.33812 12.2673 4.33812 12.2007V9.33398C4.40479 8.93398 4.13812 8.66732 3.73812 8.66732ZM13.0715 2.66732C13.4715 2.66732 13.7381 2.40065 13.7381 2.00065C13.7381 1.60065 13.4715 1.33398 13.0715 1.33398H10.2715C10.2048 1.33398 10.1381 1.40065 10.0715 1.40065C10.0048 1.46732 9.93812 1.46732 9.93812 1.53398C9.93812 1.60065 9.87145 1.66732 9.87145 1.66732V4.53398C9.87145 4.93398 10.1381 5.20065 10.5381 5.20065C10.9381 5.20065 11.2048 4.93398 11.2048 4.53398V3.46732C12.0715 4.40065 12.5381 5.66732 12.5381 7.00065C12.5381 7.20065 12.5381 7.40065 12.4715 7.60065C12.4048 7.93398 12.6715 8.26732 13.0715 8.33398H13.1381C13.4715 8.33398 13.7381 8.06732 13.8048 7.73398C13.8048 7.46732 13.8715 7.26732 13.8715 7.00065C13.8715 5.40065 13.2715 3.86732 12.2715 2.66732H13.0715ZM12.6048 10.0007L12.4048 9.80065C12.3381 9.73398 12.2715 9.73398 12.2048 9.73398H9.40479C9.00479 9.73398 8.73812 10.0007 8.73812 10.4007C8.73812 10.8007 9.00479 11.0673 9.40479 11.0673H10.6048C9.67145 11.934 8.40479 12.4007 7.07145 12.4007C6.87145 12.4007 6.67145 12.4007 6.47145 12.334C6.13812 12.2673 5.80479 12.534 5.73812 12.934C5.67145 13.334 5.93812 13.6007 6.33812 13.6673C6.60478 13.6673 6.80479 13.734 7.07145 13.734C8.67145 13.734 10.2048 13.134 11.4048 12.134V13.0007C11.4048 13.4007 11.6715 13.6673 12.0715 13.6673C12.4715 13.6673 12.7381 13.4007 12.7381 13.0007V10.334C12.7381 10.2007 12.6715 10.0673 12.6048 10.0007Z"
                fill="#2172A8"
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

  const filteredData = useMemo(() => {
    return selectedStatus === "All"
      ? data
      : data.filter((item) => item.status === selectedStatus);
  }, [selectedStatus, data]);

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
        tabs={tabs}
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
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
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
