import React from "react";
import SummaryCards from "./components/SummaryCards";
import VillageActivityPanel from "./components/VillageActivityPanel";
import PerformanceOverview from "./components/PerformanceOverview";
import ComplaintsTrend from "./components/ComplaintsTrend";
import TradeValue from "./components/TradeValue";
import NewOnboardings from "./components/NewOnboardings";
import Image from "next/image";

const page = () => {
  return (
    <div className="">
      <div className="flex-1 overflow-auto p-4 bg-gray-100">
        <SummaryCards />
        <VillageActivityPanel />
        <NewOnboardings />
        <div className="bg-white p-4 rounded-lg flex flex-col shadow-md mt-4">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="/Images/Panel.svg"
                alt="Performance"
                width={24}
                height={24}
                className=""
              />
              <h2 className="text-lg font-semibold">Performance Overview</h2>
            </div>
            <PerformanceOverview />
            <ComplaintsTrend />
            <TradeValue />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
