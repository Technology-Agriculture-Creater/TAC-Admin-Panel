"use client";
import React from "react";
import IssueEscalationData from "../../../data/IssueEscalationData.json";

const IssueEscalationTab = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search by Farmer / BDA / Trade ID"
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
        <select className="p-2 border rounded-lg">
          <option>Recent</option>
        </select>
      </div>

      <div className="flex space-x-4 mb-4">
        <select className="p-2 border rounded-lg">
          <option>All</option>
        </select>
        <select className="p-2 border rounded-lg">
          <option>All</option>
        </select>
        <select className="p-2 border rounded-lg">
          <option>Last 7 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {IssueEscalationData.map((issue, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex item-center justify-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-center flex items-center justify-center text-base font-medium px-2.5 py-0.5 my-1 rounded">
                  {issue.id}
                </span>
                <div className="text-sm text-gray-600 mb-1 flex flex-col">
                  Raised by: <span className="font-medium">{issue.raisedBy}</span>
                  <div className="text-sm text-gray-600 mb-2">
                    {issue.bdaId}
                  </div>
                </div>
              </div>

              <span className="flex items-center gap-5">
                <div className="text-sm text-gray-500">{issue.assignedTo}</div>
                <button className="text-gray-500 flex flex-col justify-center">
                  ...
                </button>
              </span>
            </div>

            <div className="bg-red-100 text-red-800 p-2 rounded-lg mb-2 flex items-center justify-between">
              Issue: <span>{issue.issue}</span>
            </div>
            <div className="text-sm text-gray-600 px-2 flex items-center justify-between">
              Village: <span> {issue.village}</span>
            </div>
            <div className="text-sm text-gray-600 px-2 flex items-center justify-between">
              Crop: <span>{issue.crop}</span>
            </div>
            <div className="text-sm text-gray-600 px-2 flex items-center justify-between">
              Status:{" "}
              <div>
                <span
                  className={`ml-2 w-2 h-2 ${issue.statusColor} rounded-full inline-block`}
                ></span>{" "}
                <span>{issue.status}</span>
              </div>
            </div>
            <div className="flex justify-between mt-4 w-full">
              <button className="w-44 px-3 py-1 rounded-md border border-gray-300 text-sm">
                Escalate to Admin
              </button>
              <button className="w-44 px-3 py-1 rounded-md bg-green-100 text-green-800 text-sm">
                Mark as resolve
              </button>
              <button className="text-blue-600 hover:text-blue-900 bg-blue-100 w-44 px-3 py-1 rounded-md">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueEscalationTab;
