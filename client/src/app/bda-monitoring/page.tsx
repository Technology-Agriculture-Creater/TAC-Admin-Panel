import React from "react";
import TopPerformers from "./components/TopPerformers";
import VillageAllocationPanel from "./components/VillageAllocationPanel";
import UnassignedBDAs from "./components/UnassignedBDAs";

const BDAMonitoringPage = () => {
  return (
    <div className="flex-1 overflow-auto p-4 bg-gray-100">
      <TopPerformers />
      <VillageAllocationPanel />
      <UnassignedBDAs />
    </div>
  );
};

export default BDAMonitoringPage;
