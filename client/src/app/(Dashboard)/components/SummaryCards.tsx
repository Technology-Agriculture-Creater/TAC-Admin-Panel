import React from 'react';

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Farmers Card */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">Total Farmers</p>
          <h3 className="text-2xl font-bold text-gray-800">6200</h3>
        </div>
        <div className="flex items-center">
          <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.103-1.274-.29-1.857M7 20v-2a3 3 0 015.356-1.857m0 0a3 3 0 015.356 0M12 3v1m-4 4H3m11 0h7m-9 0a5 5 0 01-5 5v2h10v-2a5 5 0 01-5-5zm-1 5h2"></path></svg>
          <div className="text-green-500 text-sm">+16</div>
        </div>
      </div>

      {/* BDAs Assigned Card */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">BDAs Assigned</p>
          <h3 className="text-2xl font-bold text-gray-800">11</h3>
        </div>
        <div className="flex flex-col items-end">
          <svg className="h-6 w-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <div className="text-gray-500 text-sm">Each BDA handles ~20 villages</div>
        </div>
      </div>

      {/* Trades Activity Card */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm">Trades Activity</p>
          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div>
            <h3 className="text-2xl font-bold text-blue-600">1560</h3>
            <p className="text-sm text-blue-600">Completed Trades</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-yellow-600">220</h3>
            <p className="text-sm text-yellow-600">Pending Trades</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-600">35</h3>
            <p className="text-sm text-red-600">Disputed</p>
          </div>
        </div>
        <div className="text-green-500 text-sm mt-2">+26</div>
      </div>
    </div>
  );
};

export default SummaryCards;