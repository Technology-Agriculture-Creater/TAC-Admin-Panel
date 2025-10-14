import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

const VillageActivityPanel = () => {
  const data = [
    {
      bda: { name: "Rajest Patil", id: "BDAXXXXX001" },
      cropQty: "Onion - 20 Quintals",
      farmer: "Rishi Mehta",
      village: "Kuhi",
      status: "Awaiting approval",
    },
    {
      bda: { name: "Rajest Patil", id: "BDAXXXXX001" },
      cropQty: "Tomatoes - 15 Quintals",
      farmer: "Anita Sharma",
      village: "Kuhi",
      status: "Approved",
    },
    {
      bda: { name: "Rajest Patil", id: "BDAXXXXX001" },
      cropQty: "Potatoes - 25 Quintals",
      farmer: "Vikram Singh",
      village: "Kuhi",
      status: "Awaiting approval",
    },
    {
      bda: { name: "Rajest Patil", id: "BDAXXXXX001" },
      cropQty: "Wheat - 50 Quintals",
      farmer: "Ravi Kumar",
      village: "Kuhi",
      status: "Approved",
    },
    {
      bda: { name: "Rajest Patil", id: "BDAXXXXX001" },
      cropQty: "Rice - 30 Quintals",
      farmer: "Sita Devi",
      village: "Kuhi",
      status: "Awaiting approval",
    },
    {
      bda: { name: "Rajest Patil", id: "BDAXXXXX001" },
      cropQty: "Lentils - 18 Quintals",
      farmer: "Manoj Patel",
      village: "Kuhi",
      status: "Approved",
    },
    {
      bda: { name: "Rajest Patil", id: "BDAXXXXX001" },
      cropQty: "Chili Peppers - 12 Quintals",
      farmer: "Suresh Gupta",
      village: "Kuhi",
      status: "Rejected",
    },
    {
      bda: { name: "Rajest Patil", id: "BDAXXXXX001" },
      cropQty: "Cabbage - 22 Quintals",
      farmer: "Rahul Sharma",
      village: "Kuhi",
      status: "Approved",
    },
    {
      bda: { name: "Rajest Patil", id: "BDAXXXXX001" },
      cropQty: "Cauliflower - 19 Quintals",
      farmer: "Geeta Singh",
      village: "Kuhi",
      status: "Rejected",
    },
    {
      bda: { name: "Rajest Patil", id: "BDAXXXXX001" },
      cropQty: "Beans - 15 Quintals",
      farmer: "Karan Verma",
      village: "Kuhi",
      status: "Approved",
    },
  ];

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Awaiting approval":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
      <div className="flex items-center justify-between border-b border-gray-200 w-full">
        <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
          <Image
            src="/Images/cropA.png"
            alt="Crop Icon"
            height={0}
            width={0}
            sizes="100vw"
            className="inline-block w-5 h-5 mr-2"
          />
          Crop Approval 26
        </button>
        <button className="ml-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
          <Image
            src="/Images/tradeA.png"
            alt="Crop Icon"
            height={0}
            width={0}
            sizes="100vw"
            className="inline-block w-5 h-5 mr-2"
          />
          Trade Activities 12
        </button>
        <button className="ml-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
          <Image
            src="/Images/complaint.png"
            alt="Crop Icon"
            height={0}
            width={0}
            sizes="100vw"
            className="inline-block w-5 h-5 mr-2"
          />
          Complaints 04
        </button>
        <button className="ml-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
          <Image
            src="/Images/dispute.png"
            alt="Crop Icon"
            height={0}
            width={0}
            sizes="100vw"
            className="inline-block w-5 h-5 mr-2"
          />
          Disputes 04
        </button>
        <button className="ml-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
          <Image
            src="/Images/system.png"
            alt="Crop Icon"
            height={0}
            width={0}
            sizes="100vw"
            className="inline-block w-5 h-5 mr-2"
          />
          System 02
        </button>
      </div>
      {/* Filters Section */}
      <div className="flex items-center justify-between mt-4 space-x-4">
        {/* Dropdowns */}
        <div className="flex space-x-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Status</span>
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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                BDA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Crop/Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Farmer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Village
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
                      {item.bda.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.bda.name}
                      </div>
                      <div className="text-sm text-gray-500">{item.bda.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 bg-yellow-100 inline-flex items-center justify-center px-2 py-1 rounded-full">
                    {item.cropQty}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.farmer}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.village}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {item.status === "Rejected" ? (
                    <button className="text-zinc-700 hover:text-blue-900 bg-gray-100 px-3 py-1 rounded-md">
                      Review
                    </button>
                  ) : (
                    <button className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded-md">
                      View
                    </button>
                  )}
                  <button className="ml-2 text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded-md">
                    ...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            {/* Heroicon name: solid/chevron-left */}
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            aria-current="page"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100"
          >
            1
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            2
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            {/* Heroicon name: solid/chevron-right */}
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default VillageActivityPanel;
