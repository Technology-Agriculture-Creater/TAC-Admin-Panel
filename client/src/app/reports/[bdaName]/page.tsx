"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import reportsData from "../../../data/Reports.json";
import Image from "next/image";
import { Phone, Calendar, Mail, Home, MapPin, Reply } from "lucide-react";
import BdaFarmerManagementTable from "./components/BdaFarmerManagementTable";

const BdaProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const bdaNameFromUrl = params.bdaName as string;

  const bda = reportsData.find(
    (report) => report.bdaName.replace(/ /g, "-") === bdaNameFromUrl
  );

  if (!bda) {
    return <div className="p-4">BDA Not Found</div>;
  }

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
        <button
          onClick={() => router.push("/reports")}
          className="mr-2 p-2 rounded-md hover:bg-gray-100  border-2 border-gray-500"
        >
          <Reply size={20} className="text-blue-500" />
        </button>
        <h2 className="text-xl font-semibold">BDA Activity report</h2>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
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
          <div className="text-center">
            <div className="text-center">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 60 60">
                  <circle
                    className="text-gray-200"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="25"
                    cx="30"
                    cy="30"
                  />
                  <circle
                    className="text-blue-500"
                    strokeWidth="5"
                    strokeDasharray="calc(2 * 3.14159 * 25)"
                    strokeDashoffset={`calc(2 * 3.14159 * 25 * (1 - ${bda.performanceScore} / 100))`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="25"
                    cx="30"
                    cy="30"
                    transform="rotate(-90 30 30)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold text-blue-500">
                    {bda.performanceScore}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-gray-600" />
              <span className="text-gray-700">Mobile number:</span>
            </div>
            <div className="text-gray-700">{bda.mobileNumber}</div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-gray-600" />
              <span className="text-gray-700">Date of birth:</span>
            </div>
            <div className="text-gray-700">{bda.dateOfBirth}</div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-gray-600" />
              <span className="text-gray-700">Email id:</span>
            </div>
            <div className="text-gray-700">{bda.emailId}</div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Home size={18} className="text-gray-600" />
              <span className="text-gray-700">Hometown:</span>
            </div>
            <div className="text-gray-700">{bda.hometown}</div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-gray-600" />
              <span className="text-gray-700">Permanent Address:</span>
            </div>
            <div className="text-gray-700">{bda.permanentAddress}</div>
          </div>
        </div>
      </div>
      <BdaFarmerManagementTable />
    </div>
  );
};

export default BdaProfilePage;
