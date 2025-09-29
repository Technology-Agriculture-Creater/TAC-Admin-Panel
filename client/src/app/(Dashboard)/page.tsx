import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import VillageActivityPanel from "./components/VillageActivityPanel";

const page = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          {/* Summary Cards */}
          <SummaryCards />

          {/* Village Activity Panel */}
          <VillageActivityPanel />

          {/* Placeholder for the rest of the dashboard content */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold mb-4">Additional Dashboard Content</h3>
            <p className="text-gray-600">Any other components or information can be added here.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
