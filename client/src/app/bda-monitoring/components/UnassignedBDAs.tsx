import React from "react";
import Image from "next/image";
import UnassignedBDAsData from "@/data/UnassignedBDAs.json";

const UnassignedBDAs = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4">Unassigned BDAs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                BDA
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                District
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Taluka
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {UnassignedBDAsData.map((bda) => (
              <tr key={bda.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-center ">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image src="/Images/profile.jpg" alt="Profile" width={40} height={40} className="rounded-full" />
                    </div>
                    <div className="ml-4 text-center">
                      <div className="text-sm text-center font-medium text-gray-900">
                        {bda.name}
                      </div>
                      <div className="text-sm text-center text-gray-500">
                        ID: {bda.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {bda.district}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {bda.taluka}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {bda.contact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center flex items-center justify-center text-sm font-medium">
                  <button className="inline-flex items-center justify-center px-4 py-2 text-blue-600 border border-transparent text-sm font-medium  focus:outline-none mr-2">
                    <svg
                      className="-ml-1 mr-2 h-5 w-5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm shadow-sm"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Assign Village
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    &#8942;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnassignedBDAs;
