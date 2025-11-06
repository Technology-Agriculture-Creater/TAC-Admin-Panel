"use client";
import React from "react";

const SupportLineTab = () => {
  return (
    <div className="p-4">
      <div className="mb-4 text-lg font-semibold">Quick Connect</div>

      {/* Support Line Item 1 */}
      <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm">
        <div>
          <div className="font-medium">Farmer Helpline</div>
          <div className="text-sm text-gray-500">Available: 10AM - 6AM</div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-1 border border-gray-300 rounded-lg text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            1800-123-456
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">
            Create Ticket
          </button>
        </div>
      </div>

      {/* Support Line Item 2 */}
      <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm">
        <div>
          <div className="font-medium">Crop Advisory</div>
          <div className="text-sm text-gray-500">Available: 10AM - 6AM</div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-1 border border-gray-300 rounded-lg text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            1800-123-456
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">
            Create Ticket
          </button>
        </div>
      </div>

      {/* Support Line Item 3 */}
      <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm">
        <div>
          <div className="font-medium">Technical Support (App Issues)</div>
          <div className="text-sm text-gray-500">Available: 10AM - 6AM</div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-1 border border-gray-300 rounded-lg text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            1800-123-456
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportLineTab;
