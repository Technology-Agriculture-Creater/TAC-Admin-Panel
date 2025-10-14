import React from "react";

import { Complaint } from "@/types";

interface ComplaintsTableProps {
  data: Complaint[];
}

const ComplaintsTable: React.FC<ComplaintsTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No complaints data available.
      </div>
    );
  }

  return (
    <div className="min-w-full overflow-hidden">
      {/* Table structure for complaints will go here */}
      <div className="text-center py-8 text-gray-500">
        Complaints data will be displayed here.
      </div>
    </div>
  );
};

export default ComplaintsTable;
