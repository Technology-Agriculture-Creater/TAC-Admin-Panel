"use client";
import React, { useState } from "react";
import DirectCommunicationTab from "./components/DirectCommunicationTab";
import IssueEscalationTab from "./components/IssueEscalationTab";
import SupportLineTab from "./components/SupportLineTab";

const CommunicationsPage = () => {
  const [activeTab, setActiveTab] = useState("Direct Communication");

  const renderContent = () => {
    switch (activeTab) {
      case "Direct Communication":
        return <DirectCommunicationTab />;
      case "Issue Escalation":
        return <IssueEscalationTab />;
      case "Support Line":
        return <SupportLineTab />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search Farmer/BDA/Complaint ID"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>

      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "Direct Communication"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("Direct Communication")}
          >
            Direct Communication
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "Issue Escalation"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("Issue Escalation")}
          >
            Issue Escalation
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "Support Line"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("Support Line")}
          >
            Support Line
          </button>
        </div>
      </div>

      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default CommunicationsPage;
