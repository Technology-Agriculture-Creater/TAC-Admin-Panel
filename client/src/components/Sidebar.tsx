import React from "react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 flex items-center">
        <Image
          src="/images/logo1.png"
          height={0}
          width={0}
          sizes="100vw"
          alt="TAC Logo"
          className="h-full w-full mr-2"
        />{" "}
      </div>
      <nav className="mt-6 flex-1">
        <ul>
          <li className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 border-r-4 border-blue-600 font-semibold">
            <Image
              src="/images/dashboard.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />{" "}
            Dashboard
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Image
              src="/images/monitor.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />
            BDA Monitoring
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Image
              src="/images/framer.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />
            Farmer Management
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Image
              src="/images/communication.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />
            Communications
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Image
              src="/images/report.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />
            Reports
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Image
              src="/images/profile.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />
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
