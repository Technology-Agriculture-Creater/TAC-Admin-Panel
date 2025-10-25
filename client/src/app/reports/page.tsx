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

      <div className="bg-white p-4 rounded-lg w-full shadow-md">
        <div className="flex items-center w-full">
          <div className="flex items-center w-full">
            <div className="relative">
              <select className="border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>NAGPUR</option>
                {/* Add more options here */}
              </select>
            </div>
          </div>
          <div className="flex gap-10 w-full">
            <div className="bg-white p-4 rounded-lg shadow-md w-full">
              <p className="text-gray-500 text-sm">Total Villages</p>
              <p className="text-xl font-semibold">2565</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md w-full">
              <p className="text-gray-500 text-sm">Total Farmer Registered</p>
              <p className="text-xl font-semibold">12548</p>
            </div>
          </div>
        </div>
      </div>
      {/* BDA-wise activity report section */}
      <div className="bg-white p-4 rounded-lg flex flex-col shadow-md mt-4">
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
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
        <CurrentStatisticChart data={currentStatisticData} />
        <DisputeAnalysisChart data={disputeAnalysisData} />
      </div>
    </div>
  );
};

export default ReportsPage;
