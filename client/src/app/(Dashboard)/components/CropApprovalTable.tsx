import { CropApproval } from "../../../types";

interface CropApprovalTableProps {
  data: CropApproval[];
  getStatusInfo: (status: string) => {
    icon: React.ReactElement | null;
    color: string;
  };
}

const CropApprovalTable: React.FC<CropApprovalTableProps> = ({
  data,
  getStatusInfo,
}) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No crop approval data available.
      </div>
    );
  }

  return (
    <div className="min-w-full overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="w-full">
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              BDA
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Crop/Qty
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
          {data.map((item, index) => (
            <tr key={index} className="w-full">
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
                    {item.bda?.name?.charAt(0) || "—"}
                  </div>
                  <div className="ml-4 text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {item.bda?.name || "—"}
                    </div>
                    <div className="text-sm text-gray-500">{item.bda.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 flex items-center justify-center whitespace-nowrap">
                <div className="text-sm text-center text-gray-900 px-5 w-52 py-2 rounded-lg bg-yellow-100">
                  {item.cropQty}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{item.farmer}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{item.village}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span
                  className={`px-2 inline-flex text-xs leading-5 items-center justify-center gap-2 font-semibold rounded-full`}
                  style={{
                    backgroundColor: `${getStatusInfo(item.status).color}1A`,
                    color: getStatusInfo(item.status).color,
                  }}
                >
                  {getStatusInfo(item.status).icon} {item.status}
                </span>
              </td>
              <td className="px-6 py-4 flex gap-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 bg-blue-100 px-16 py-1 rounded-md">
                  View
                </button>
                <button className="ml-2 text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded-md">
                  ...
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CropApprovalTable;
