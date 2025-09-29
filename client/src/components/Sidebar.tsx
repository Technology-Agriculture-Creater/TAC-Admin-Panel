import React from "react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 flex items-center border-b border-gray-200">
        <Image
          src="/tac-logo.svg"
          height={0}
          width={0}
          sizes="100vw"
          alt="TAC Logo"
          className="h-8 w-8 mr-2"
        />{" "}
        {/* Placeholder for logo */}
        <h1 className="text-xl font-bold text-gray-800">TACAGRICONNECT</h1>
      </div>
      <nav className="mt-6 flex-1">
        <ul>
          <li className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 border-r-4 border-blue-600 font-semibold">
            <svg
              className="h-5 w-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            Dashboard
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <svg
              className="h-5 w-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            BDA Monitoring
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <svg
              className="h-5 w-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.103-1.274-.29-1.857M7 20v-2a3 3 0 015.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a3 3 0 015.356 0M12 3v1m-4 4H3m11 0h7m-9 0a5 5 0 01-5 5v2h10v-2a5 5 0 01-5-5zm-1 5h2"
              ></path>
            </svg>
            Farmer Management
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <svg
              className="h-5 w-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            Communications
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <svg
              className="h-5 w-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Reports
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <svg
              className="h-5 w-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            Profile & Settings
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t border-gray-200">
        <ul>
          <li className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            Register New Farmer
            <svg
              className="h-4 w-4"
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
          </li>
          <li className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            Support center
            <svg
              className="h-4 w-4"
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
          </li>
          <li className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            About
            <svg
              className="h-4 w-4"
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
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
