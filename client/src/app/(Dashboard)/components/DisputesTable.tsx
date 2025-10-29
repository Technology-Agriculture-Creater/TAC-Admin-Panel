import React from "react";
import { Dispute } from "../../../types";

interface DisputesTableProps {
  data: Dispute[];
  getStatusInfo: (status: string) => {
    icon: React.ReactElement | null;
    color: string;
  };
}

const DisputesTable: React.FC<DisputesTableProps> = ({
  data,
  getStatusInfo,
}) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No disputes data available.
      </div>
    );
  }

  return (
    <div className="min-w-full overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Dispute ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Farmer
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Reason
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((dispute) => (
            <tr key={dispute.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                {dispute.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {dispute.farmer?.name || "—"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {dispute.issue || "—"}
              </td>
              <td className="px-4 py-2 text-center">
                <div
                  className="inline-flex items-center justify-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    color: getStatusInfo(dispute.status).color,
                    backgroundColor: `${getStatusInfo(dispute.status).color}1A`, // 1A is for 10% opacity
                  }}
                >
                  {getStatusInfo(dispute.status).icon}
                  {dispute.status}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {dispute.createdAt || "—"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                <button className="text-blue-600 hover:text-blue-900">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisputesTable;
