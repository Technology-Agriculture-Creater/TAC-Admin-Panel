"use client";
import React from "react";
import Image from "next/image";

interface Tab {
  label: string;
  icon: string;
  count: number;
}

interface TabComponentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cropApprovalCount: number;
  tradeActivitiesCount: number;
  complaintsCount: number;
  disputesCount: number;
  systemCount: number;
}

const TabComponent: React.FC<TabComponentProps> = ({
  activeTab,
  onTabChange,
  cropApprovalCount,
  tradeActivitiesCount,
  complaintsCount,
  disputesCount,
  systemCount,
}) => {
  const tabs: Tab[] = [
    { label: "Crop Approval", icon: "/Images/cropA.png", count: cropApprovalCount },
    { label: "Trade Activities", icon: "/Images/tradeA.png", count: tradeActivitiesCount },
    { label: "Complaints", icon: "/Images/complaint.png", count: complaintsCount },
    { label: "Disputes", icon: "/Images/dispute.png", count: disputesCount },
    { label: "System", icon: "/Images/system.png", count: systemCount },
  ];
  return (
    <div className="flex items-center justify-between border-b border-gray-200 w-full">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => onTabChange(tab.label)}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === tab.label
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <Image
            src={tab.icon}
            alt={`${tab.label} Icon`}
            height={0}
            width={0}
            sizes="100vw"
            className="inline-block w-5 h-5 mr-2"
          />
          {tab.label} {tab.count}
        </button>
      ))}
    </div>
  );
};

export default TabComponent;
