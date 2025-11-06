import React from "react";
import Image from "next/image";
import BDALeaderboard from "./BDALeaderboard";
import ComplaintsTrend from "./ComplaintsTrend";
import TradeValue from "./TradeValue";

const PerformanceOverview = () => {
  return (
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
        <BDALeaderboard />
        <ComplaintsTrend />
        <TradeValue />
      </div>
    </div>
  );
};

export default PerformanceOverview;
