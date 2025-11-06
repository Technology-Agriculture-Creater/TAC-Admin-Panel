"use client";
import React from "react";
import Image from "next/image";

const DirectCommunicationTab = () => {
  return (
    <div>
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

        <div className="mb-4 text-lg font-semibold">Chats</div>

        {/* Chat List Item 1 */}
        <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <Image
              src="/Images/profile.jpg"
              alt="Ramesh Patil"
              className="w-10 h-10 rounded-full mr-3 object-cover"
              height={0}
              width={0}
              sizes="100vw"
            />
            <div>
              <div className="font-medium">Ramesh Patil</div>
              <div className="text-sm text-green-500">Online</div>
            </div>
          </div>
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>

        {/* Chat List Item 2 */}
        <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <Image
              src="/Images/profile.jpg"
              alt="Sneha Joshi"
              className="w-10 h-10 rounded-full mr-3 object-cover"
              height={0}
              width={0}
              sizes="100vw"
            />
            <div>
              <div className="font-medium">Sneha Joshi</div>
              <div className="text-sm text-gray-500">Away</div>
            </div>
          </div>
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>

        {/* Chat List Item 3 */}
        <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <Image
              src="/Images/profile.jpg"
              alt="Amit Kumar"
              className="w-10 h-10 rounded-full mr-3 object-cover"
              height={0}
              width={0}
              sizes="100vw"
            />
            <div>
              <div className="font-medium">Amit Kumar</div>
              <div className="text-sm text-green-500">Online</div>
            </div>
          </div>
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>

        {/* Chat List Item 4 */}
        <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <Image
              src="/Images/profile.jpg"
              alt="Priya Sharma"
              className="w-10 h-10 rounded-full mr-3 object-cover"
              height={0}
              width={0}
              sizes="100vw"
            />
            <div>
              <div className="font-medium">Priya Sharma</div>
              <div className="text-sm text-green-500">Online</div>
            </div>
          </div>
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>

        {/* Chat List Item 5 */}
        <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <Image
              src="/Images/profile.jpg"
              alt="Vikram Singh"
              className="w-10 h-10 rounded-full mr-3 object-cover"
              height={0}
              width={0}
              sizes="100vw"
            />
            <div>
              <div className="font-medium">Vikram Singh</div>
              <div className="text-sm text-green-500">Online</div>
            </div>
          </div>
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>

        <div className="mb-4 text-lg font-semibold">Group Chat</div>

        {/* Group Chat Item */}
        <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            <Image
              src="/Images/profile.jpg"
              alt="KUHI TALUKA -BDA's CLUSTER"
              className="w-10 h-10 rounded-full mr-3 object-cover"
              height={0}
              width={0}
              sizes="100vw"
            />
            <div>
              <div className="font-medium">KUHI TALUKA -BDA&apos;s CLUSTER</div>
              <div className="text-sm text-gray-500">
                Ramesh Patil, Sneha Joshi, Amit Kumar, Priyansh Sharma +3
              </div>
            </div>
          </div>
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DirectCommunicationTab;
