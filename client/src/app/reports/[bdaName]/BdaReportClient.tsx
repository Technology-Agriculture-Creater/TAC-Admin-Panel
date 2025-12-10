"use client";
import React from "react";
import reportsData from "../../../data/Reports.json";
import Image from "next/image";
import { Phone, Calendar, Mail, Home, MapPin } from "lucide-react";
// import BdaFarmerManagementTable from "./components/BdaFarmerManagementTable";

interface Farmer {
  id: number;
  name: string;
  village: string;
  crops: string[];
}

interface BdaReport {
  id: string;
  bdaName: string;
  bdaId: string;
  mobileNumber: string;
  dateOfBirth: string;
  emailId: string;
  hometown: string;
  permanentAddress: string;
  performanceScore: number;
  totalVillageCounts: number;
  totalFarmerCounts: number;
  cropRegistrationsThisSeason: number;
  tradeActivities: number;
  farmerDisputesComplaints: number;
  profileImage: string;
  designation: string;
  dateJoined: string;
  region: string;
  baseLocation: string;
  farmersOnboarded: number;
  totalSales: number;
  activeCampaigns: number;
  farmers: Farmer[];
}

interface BdaReportClientProps {
  bdaName: string;
}

const BdaReportClient: React.FC<BdaReportClientProps> = ({ bdaName }) => {
  const bda = reportsData.find(
    (report: BdaReport) => report.bdaName.replace(/ /g, "-") === bdaName
  );

  if (!bda) {
    return <div className="p-4">BDA Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow rounded-lg p-6 mb-4">
        <div className="flex items-center space-x-4">
          <Image
            src={bda.profileImage}
            alt={bda.bdaName}
            width={96}
            height={96}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{bda.bdaName}</h1>
            <p className="text-gray-600">{bda.designation}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-gray-700">
            <Phone className="mr-2" size={20} /> {bda.mobileNumber}
          </div>
          <div className="flex items-center text-gray-700">
            <Mail className="mr-2" size={20} /> {bda.emailId}
          </div>
          <div className="flex items-center text-gray-700">
            <Calendar className="mr-2" size={20} /> Joined: {bda.dateJoined}
          </div>
          <div className="flex items-center text-gray-700">
            <Home className="mr-2" size={20} /> Region: {bda.region}
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="mr-2" size={20} /> Base Location:{" "}
            {bda.baseLocation}
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-medium text-blue-800">
                Farmers Onboarded
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {bda.farmersOnboarded}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-medium text-green-800">Total Sales</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{bda.totalSales.toLocaleString()}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
              <p className="text-lg font-medium text-yellow-800">
                Active Campaigns
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {bda.activeCampaigns}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Farmer Management
        </h2>
        {/* <BdaFarmerManagementTable farmers={bda.farmers} /> */}
      </div>
    </div>
  );
};

export default BdaReportClient;
