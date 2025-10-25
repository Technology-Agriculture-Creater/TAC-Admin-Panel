import React from "react";
import Image from "next/image";

interface BdaActivityReportCardProps {
  bdaName: string;
  bdaId: string;
  totalVillageCounts: number;
  totalFarmerCounts: number;
  cropRegistrationsThisSeason: number;
  tradeActivities: number;
  farmerDisputesComplaints: number;
}

const BdaActivityReportCard: React.FC<BdaActivityReportCardProps> = ({
  bdaName,
  bdaId,
  totalVillageCounts,
  totalFarmerCounts,
  cropRegistrationsThisSeason,
  tradeActivities,
  farmerDisputesComplaints,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Image
            src="/Images/profile.jpg"
            alt="BDA Profile"
            height={0}
            width={0}
            sizes={"100vw"}
            className="w-10 h-10 rounded-full mr-2 object-cover"
          />
          <div>
            <p className="font-semibold">{bdaName}</p>
            <p className="text-sm text-gray-500">{bdaId}</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
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
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500">Total village counts:</p>
          <p className="font-medium">{totalVillageCounts}</p>
        </div>
        <div>
          <p className="text-gray-500">Total farmer counts:</p>
          <p className="font-medium">{totalFarmerCounts}</p>
        </div>
        <div className="col-span-2 mt-2">
          <p className="text-gray-500">Crop Registrations this season:</p>
          <p className="font-medium text-blue-600">
            {cropRegistrationsThisSeason}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">Trade activities:</p>
          <p className="font-medium text-blue-600">{tradeActivities}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">Farmer Disputes/Complaints:</p>
          <p className="font-medium text-blue-600">
            {farmerDisputesComplaints}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BdaActivityReportCard;
