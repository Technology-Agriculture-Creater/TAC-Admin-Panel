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
  tabs: Tab[];
}

const TabComponent: React.FC<TabComponentProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 w-full">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => onTabChange(tab.label)}
          className={`relative px-4 py-2 text-sm font-medium ${
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
            className="inline-block w-5 h-5 mr-2 text-blue-600"
          />
          {tab.label}{" "}
          <span
            className={`absolute -top-3 right-0 ml-2 inline-flex items-center justify-center p-1.5 text-xs font-bold leading-none text-white rounded-full ${
              activeTab === tab.label ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TabComponent;
