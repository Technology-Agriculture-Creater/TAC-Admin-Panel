import React from "react";
import Image from "next/image";

const PerformanceOverview = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">BDA Leaderboard</h3>
        <div className="relative">
          <select className="bg-gray-100 rounded-md px-4 py-2 border border-gray-300 text-gray-700 appearance-none pr-8 font-roboto">
            <option>This Month</option>
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
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-green-600 font-semibold italic">Top Performer:</p>
          <div className="mt-2">
            {/* Placeholder for Top Performer image/icon */}
            <Image
              src="/Images/performance.png"
              alt="Top Performer"
              height={0}
              width={0}
              sizes="100vw"
              className="mx-auto h-12 w-12"
            />
            <p className="mt-2 font-semibold">Ramesh Patil</p>
            <p className="text-sm text-gray-500">BDATAC0001</p>
            <p className="text-sm text-gray-500 italic">
              85 crops verified · 210 Farmers assisted
            </p>
          </div>
        </div>
        <div>
          <p className="text-yellow-600 font-semibold italic">
            Lowest Performer:
          </p>
          <div className="mt-2">
            {/* Placeholder for Lowest Performer image/icon */}
            <Image
              src="/Images/low.png"
              alt="Lowest Performer"
              height={0}
              width={0}
              sizes="100vw"
              className="mx-auto h-12 w-12"
            />
            <p className="font-semibold mt-2">Shyam Kumar</p>
            <p className="text-sm text-gray-500">BDATAC0025</p>
            <p className="text-sm text-gray-500 italic">
              90 Farmers assisted · 25 crops verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverview;
