import React from "react";

const ComplaintsTrend = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Complaints Trend (This Month)</h3>
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
          <p className="text-gray-600 italic font-semibold">Raised</p>
          <p className="text-green-600 text-2xl font-bold">102</p>
        </div>
        <div>
          <p className="text-gray-600 italic font-semibold">Resolved</p>
          <p className="text-yellow-600 text-2xl font-bold">96</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 text-center mt-4 italic">
        Avg. resolution time: 15 hrs
      </p>
    </div>
  );
};

export default ComplaintsTrend;
