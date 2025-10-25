"use client";
import React from "react";
import { useParams } from "next/navigation";
import reportsData from "../../../data/Reports.json";
import Image from "next/image";

const BdaProfilePage = () => {
  const params = useParams();
  const bdaNameFromUrl = params.bdaName as string;

  const bda = reportsData.find(
    (report) => report.bdaName.replace(/ /g, "-") === bdaNameFromUrl
  );

  if (!bda) {
    return <div className="p-4">BDA Not Found</div>;
  }

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Image
            src="/Images/profile.jpg"
            alt="BDA Profile"
            height={0}
            width={0}
            sizes={"100vw"}
            className="w-20 h-20 rounded-full mr-4 object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold">{bda.bdaName}</h1>
            <p className="text-gray-600">{bda.bdaId}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700">
              Total Village Counts: {bda.totalVillageCounts}
            </p>
            <p className="text-gray-700">
              Total Farmer Counts: {bda.totalFarmerCounts}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              Crop Registrations This Season: {bda.cropRegistrationsThisSeason}
            </p>
            <p className="text-gray-700">
              Trade Activities: {bda.tradeActivities}
            </p>
            <p className="text-gray-700">
              Farmer Disputes/Complaints: {bda.farmerDisputesComplaints}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BdaProfilePage;
