import React from "react";
import { Dispute } from "@/types";

interface DisputesTableProps {
  data: Dispute[];
}

const DisputesTable: React.FC<DisputesTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No disputes data available.
      </div>
    );
  }

  return (
    <div className="min-w-full overflow-hidden">
      {/* Table structure for disputes will go here */}
      <div className="text-center py-8 text-gray-500">
        Disputes data will be displayed here.
      </div>
    </div>
  );
};

export default DisputesTable;
