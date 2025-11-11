import React from "react";
import Image from "next/image";

const SummaryCards = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Farmers Name */}
      <div className="flex items-center justify-between bg-white p-4 h-20 rounded-lg shadow-md">
        <div className="">
          <div className="relative">
            <select
              name="village"
              id=""
              className="bg-gray-100 rounded-md px-4 py-2 border border-gray-300 text-gray-700 appearance-none pr-8 font-roboto"
            >
              <option value="KUHI">KUHI</option>
              <option value="village1">Village 1</option>
              <option value="village3">Village 2</option>
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
        <div className="flex flex-col items-end justify-between">
          <p className="text-gray-500 text-sm">Total Villages</p>
          <h3 className="text-2xl font-bold text-gray-800">220</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Total Farmers Card */}
        <div className="bg-white p-4 h-32 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-gray-800">6200</h3>
            <Image
              src="/Images/framer1.png"
              alt="User Avatar"
              height={0}
              width={0}
              sizes="100vw"
              className="h-8 w-8"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">Total Farmers</p>
            <div className="text-green-500 text-sm">+16</div>
          </div>
        </div>

        {/* BDAs Assigned Card */}
        <div className="bg-white p-4 h-32 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-gray-800">11</h3>
            <Image
              src="/Images/BDA.png"
              alt="User Avatar"
              height={0}
              width={0}
              sizes="100vw"
              className="h-8 w-8"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">BDAs Assigned</p>
            <div className="text-green-500 text-sm">
              Each BDA handles ~20 villages
            </div>
          </div>
        </div>

        {/* Crop Register Card */}
        <div className="bg-white p-4 h-32 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-gray-800">4,350</h3>
            <Image
              src="/Images/crop.png"
              alt="User Avatar"
              height={0}
              width={0}
              sizes="100vw"
              className="h-8 w-8"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">Crops Registered</p>
            <div className="text-green-500 text-sm">+26</div>
          </div>
        </div>

        {/* Trades Activity Card */}
        <div className="bg-white p-4 h-32 rounded-lg shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-gray-800">
              Trades Activity
            </h3>
            <Image
              src="/Images/trade.png"
              alt="User Avatar"
              height={0}
              width={0}
              sizes="100vw"
              className="h-8 w-8"
            />
          </div>
          <div className="px-10">
            <div className="flex justify-between items-center mt-2">
              <div className="flex flex-col items-center">
                <h3 className="font-bold">1560</h3>
                <p className="text-sm text-blue-600">Completed Trades</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-bold">220</h3>
                <p className="text-sm text-yellow-600">Pending Trades</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-bold">35</h3>
                <p className="text-sm text-red-600">Disputed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
