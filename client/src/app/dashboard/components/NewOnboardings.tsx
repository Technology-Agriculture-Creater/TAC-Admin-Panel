import React from "react";
import Image from "next/image";

const NewOnboardings = () => {
  const onboardings = [
    {
      id: "TACXXX0008",
      name: "Isabella Rodriguez",
      avatar: "/Images/profile.png",
      category: "Small",
      type: "Small (5 Acre - 15 Acre)",
      taluka: "Nagpur",
      village: "Nagpur",
    },
    {
      id: "TACXXX0009",
      name: "Liam Johnson",
      avatar: "/Images/profile.png",
      category: "Medium",
      type: "Medium (15 Acre - 30 Acre)",
      taluka: "Pune",
      village: "Maharashtra",
    },
    {
      id: "TACXXX0010",
      name: "Ava Smith",
      avatar: "/Images/profile.png",
      category: "Large",
      type: "Large (30 Acre - 50 Acre)",
      taluka: "Mumbai",
      village: "Maharashtra",
    },
    {
      id: "TACXXX0011",
      name: "Noah Brown",
      avatar: "/Images/profile.png",
      category: "Extra Large",
      type: "Extra Large (50 Acre and above)",
      taluka: "Bangalore",
      village: "Karnataka",
    },
    {
      id: "TACXXX0012",
      name: "Emma Williams",
      avatar: "/Images/profile.png",
      category: "Small",
      type: "Small (5 Acre - 15 Acre)",
      taluka: "Hyderabad",
      village: "Telangana",
    },
    {
      id: "TACXXX0013",
      name: "Oliver Jones",
      avatar: "/Images/profile.png",
      category: "Medium",
      type: "Medium (15 Acre - 30 Acre)",
      taluka: "Chennai",
      village: "Tamil Nadu",
    },
    {
      id: "TACXXX0014",
      name: "Sophia Garcia",
      avatar: "/Images/profile.png",
      category: "Large",
      type: "Large (30 Acre - 50 Acre)",
      taluka: "Ahmedabad",
      village: "Gujarat",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Image
            src="/Images/vector.png"
            alt="Onboarding"
            width={24}
            height={24}
            className=""
          />
          <h2 className="text-lg font-semibold">
            New onboardings in your region
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Category</span>
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
            <span className="text-sm font-medium text-gray-600">Sort by</span>
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
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Taluka
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Village
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {onboardings.map((onboarding) => (
              <tr key={onboarding.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        className="h-10 w-10 rounded-full"
                        height={0}
                        width={0}
                        sizes="100vw"
                        src={onboarding.avatar}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {onboarding.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {onboarding.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{onboarding.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {onboarding.taluka}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {onboarding.village}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                  <a
                    href="#"
                    className="text-blue-600 border border-blue-600 hover:text-blue-900 px-3 py-1 rounded-md"
                  >
                    More info
                  </a>
                  <button className="text-gray-400 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            aria-current="page"
            className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          >
            1
          </a>
          <a
            href="#"
            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          >
            2
          </a>
          <a
            href="#"
            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
          >
            3
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default NewOnboardings;
