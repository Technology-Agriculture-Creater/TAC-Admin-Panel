import { System } from "@/types";
import React from "react";

interface SystemTableProps {
  data: System[];
}

const SystemTable: React.FC<SystemTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No system data available.
      </div>
    );
  }

  return (
    <div className="min-w-full overflow-hidden">
      {/* Table structure for system will go here */}
      <div className="text-center py-8 text-gray-500">
        System data will be displayed here.
      </div>
    </div>
  );
};

export default SystemTable;