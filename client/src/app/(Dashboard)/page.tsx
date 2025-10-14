import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import VillageActivityPanel from "./components/VillageActivityPanel";
import PerformanceOverview from "./components/PerformanceOverview";
import ComplaintsTrend from "./components/ComplaintsTrend";
import TradeValue from "./components/TradeValue";
import NewOnboardings from "./components/NewOnboardings";

const page = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden font-roboto">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          {/* Summary Cards */}
          <SummaryCards />

          {/* Village Activity Panel */}
          <VillageActivityPanel />

          <NewOnboardings />

          <PerformanceOverview />
          <ComplaintsTrend />
          <TradeValue />
        </div>
      </main>
    </div>
  );
};

export default page;
