"use client";
import React, { useState } from "react";
import FarmerManagementTable from "./components/FarmerManagementTable";
import Header from "./components/Header";

const FarmerManagementPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("farmerRegistry");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 space-y-4">
      <Header />
      <FarmerManagementTable
        currentPage={currentPage}
        searchTerm={searchTerm}
        activeTab={activeTab}
        handlePageChange={handlePageChange}
        setSearchTerm={setSearchTerm}
        setActiveTab={setActiveTab}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default FarmerManagementPage;
