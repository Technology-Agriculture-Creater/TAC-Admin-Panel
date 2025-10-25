"use client";
import React from "react";
import BdaActivityReportCard from "../../components/BdaActivityReportCard";
import CurrentStatisticChart from "../../components/CurrentStatisticChart";
import DisputeAnalysisChart from "../../components/DisputeAnalysisChart";
import reportsData from "../../data/Reports.json";

const ReportsPage = () => {
  const currentStatisticData = [
    {
      name: "Crops Registered",
      value: 4350,
      percentage: "52.9%",
      change: "+32%",
      color: "#FFCE56",
    },
    {
      name: "Trade Executed",
      value: 1850,
      percentage: "28.9%",
      change: "+25%",
      color: "#36A2EB",
    },
    {
      name: "Farmer Outreach",
      value: 6100,
      percentage: "12.46%",
      change: "+24%",
      color: "#FF6384",
    },
    {
      name: "Farmer Registered",
      value: 1250,
      percentage: "25%",
      change: "+16%",
      color: "#4BC0C0",
    },
  ];

  const disputeAnalysisData = [
    {
      name: "Farmer Complaints",
      value: 42,
      percentage: "52.9%",
      color: "#FFCE56",
    },
    {
      name: "Technical Issues",
      value: 1850,
      percentage: "28.9%",
      color: "#36A2EB",
    },
    {
      name: "Crop Quality Issues",
      value: 6100,
      percentage: "12.46%",
      color: "#FF6384",
    },
    {
      name: "Other Issues",
      value: 1250,
      percentage: "25%",
      color: "#4BC0C0",
    },
  ];

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select className="border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>NAGPUR</option>
              {/* Add more options here */}
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
        <div className="flex space-x-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm">Total Villages</p>
            <p className="text-xl font-semibold">2565</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm">Total Farmer Registered</p>
            <p className="text-xl font-semibold">12548</p>
          </div>
        </div>
      </div>

      {/* BDA-wise activity report section */}
      <h2 className="text-xl font-semibold mb-4">BDA-wise activity report</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {reportsData.map((report) => (
          <BdaActivityReportCard
            key={report.id}
            bdaName={report.bdaName}
            bdaId={report.bdaId}
            totalVillageCounts={report.totalVillageCounts}
            totalFarmerCounts={report.totalFarmerCounts}
            cropRegistrationsThisSeason={report.cropRegistrationsThisSeason}
            tradeActivities={report.tradeActivities}
            farmerDisputesComplaints={report.farmerDisputesComplaints}
          />
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CurrentStatisticChart data={currentStatisticData} />
        <DisputeAnalysisChart data={disputeAnalysisData} />
      </div>
    </div>
  );
};

export default ReportsPage;
