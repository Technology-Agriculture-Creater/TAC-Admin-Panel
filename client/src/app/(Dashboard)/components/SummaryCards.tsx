import React from "react";
import Image from "next/image";

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Total Farmers Card */}
      <div className="bg-white p-4 h-32 rounded-lg shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold text-gray-800">6200</h3>
          <Image
            src="/images/framer1.png"
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
            src="/images/BDA.png"
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
            src="/images/crop.png"
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
          <h3 className="text-3xl font-bold text-gray-800">Trades Activity</h3>
          <Image
            src="/images/trade.png"
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
              <h3 className="font-bold text-blue-600">1560</h3>
              <p className="text-sm text-blue-600">Completed Trades</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-yellow-600">220</h3>
              <p className="text-sm text-yellow-600">Pending Trades</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-bold text-red-600">35</h3>
              <p className="text-sm text-red-600">Disputed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
