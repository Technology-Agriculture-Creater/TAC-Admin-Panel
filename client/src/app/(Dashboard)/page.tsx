import React from "react";
import SummaryCards from "./components/SummaryCards";
import VillageActivityPanel from "./components/VillageActivityPanel";
import PerformanceOverview from "./components/PerformanceOverview";
import ComplaintsTrend from "./components/ComplaintsTrend";
import TradeValue from "./components/TradeValue";
import NewOnboardings from "./components/NewOnboardings";

const page = () => {
  return (
    <div className="">
      <div className="flex-1 overflow-auto p-4 bg-gray-100">
        <SummaryCards />
        <VillageActivityPanel />
        <NewOnboardings />
        <PerformanceOverview />
        <ComplaintsTrend />
        <TradeValue />
      </div>
    </div>
  );
};

export default page;
