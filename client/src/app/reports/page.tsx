"use client";
import React from "react";
import BdaActivityReportCard from "../../components/BdaActivityReportCard";
import CurrentStatisticChart from "../../components/CurrentStatisticChart";
import DisputeAnalysisChart from "../../components/DisputeAnalysisChart";
import reportsData from "../../data/Reports.json";
import { useRouter } from "next/navigation";

const ReportsPage = () => {
  const router = useRouter();
  const [selectedBda, setSelectedBda] = React.useState<
    (typeof reportsData)[number] | null
  >(null);

  const handleCardClick = (bdaName: string, bdaId: string) => {
    const bda = reportsData.find(
      (report) => report.bdaName === bdaName && report.bdaId === bdaId
    );
    setSelectedBda(bda || null);
    router.push(`/reports/${bdaName.replace(/ /g, "-")}`);
  };

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

  const [selectedCity, setSelectedCity] = React.useState("NAGPUR");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setIsDropdownOpen(false);
  };

  return (
    <div className="p-4">
      {/* Header Section */}

      <div className="flex gap-4">
        <div
          className="bg-white p-4 rounded-lg shadow-md flex-1 flex items-center justify-between relative cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="text-xl font-semibold">{selectedCity}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-400 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCityChange("NAGPUR")}
              >
                NAGPUR
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCityChange("PUNE")}
              >
                PUNE
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCityChange("MUMBAI")}
              >
                MUMBAI
              </div>
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <p className="text-gray-500 text-sm">Total Villages</p>
          <p className="text-xl font-semibold">2565</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <p className="text-gray-500 text-sm">Total Farmer Registered</p>
          <p className="text-xl font-semibold">12548</p>
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
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {selectedBda && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <h2 className="text-xl font-semibold mb-4">
            {selectedBda.bdaName} Profile
          </h2>
          <p>BDA ID: {selectedBda.bdaId}</p>
          <p>Total Village Counts: {selectedBda.totalVillageCounts}</p>
          <p>Total Farmer Counts: {selectedBda.totalFarmerCounts}</p>
          <p>
            Crop Registrations This Season:{" "}
            {selectedBda.cropRegistrationsThisSeason}
          </p>
          <p>Trade Activities: {selectedBda.tradeActivities}</p>
          <p>
            Farmer Disputes/Complaints: {selectedBda.farmerDisputesComplaints}
          </p>
        </div>
      )}

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
        <CurrentStatisticChart data={currentStatisticData} />
        <DisputeAnalysisChart data={disputeAnalysisData} />
      </div>
    </div>
  );
};

export default ReportsPage;
