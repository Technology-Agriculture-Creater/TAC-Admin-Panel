import React from "react";
import { Complaint } from "../../../types";

interface ComplaintsTableProps {
  data: Complaint[];
  getStatusInfo: (status: string) => {
    icon: React.ReactElement | null;
    color: string;
  };
}

const ComplaintsTable: React.FC<ComplaintsTableProps> = ({
  data,
  getStatusInfo,
}) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No complaints data available.
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
              Complaint ID
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
              Village
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Issue Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Raised on
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((complaint) => (
            <tr key={complaint.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                {complaint.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {complaint.farmer?.name || "—"}
                <p className="text-gray-400 text-xs">
                  {complaint.farmer?.id || "—"}
                </p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {complaint.village || "—"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                <span className="inline-flex px-5 py-3 rounded-lg text-xs items-center justify-center w-40 font-medium bg-red-100 text-red-800">
                  {complaint.issueType || "—"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {complaint.date}
              </td>
              <td className="px-4 py-2 text-center">
                <div
                  className="inline-flex items-center justify-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    color: getStatusInfo(complaint.status).color,
                    backgroundColor: `${
                      getStatusInfo(complaint.status).color
                    }1A`,
                  }}
                >
                  {complaint.status === "Pending review"}
                  {getStatusInfo(complaint.status).icon}
                  {complaint.status}
                </div>
              </td>

              <td className="px-6 py-4 flex gap-4 whitespace-nowrap text-sm font-medium">
                {complaint.action.includes("view") && (
                  <button className="text-blue-600 hover:text-blue-900 bg-blue-100 w-40 px-3 py-1 rounded-md">
                    View
                  </button>
                )}
                {complaint.action.includes("review") && (
                  <button className="text-gray-600 hover:text-gray-900 bg-white border w-40 border-gray-300 px-3 py-1 rounded-md">
                    Review
                  </button>
                )}
                {complaint.action.includes("...") && (
                  <button className="ml-2 text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded-md">
                    ...
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTable;
