import React, { useState } from "react";

import { TradeActivity, Activity } from "../../../types";
import ActivityDetailsModal from "./ActivityDetailsModal";

interface TradeActivitiesTableProps {
  data: TradeActivity[];
  getStatusInfo: (status: string) => {
    icon: React.ReactElement | null;
    color: string;
  };
}

const TradeActivitiesTable: React.FC<TradeActivitiesTableProps> = ({
  data,
  getStatusInfo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const mapTradeActivityToActivity = (
    tradeActivity: TradeActivity
  ): Activity => {
    const cropName = tradeActivity.cropQty.split(" - ")[0];
    return {
      id: tradeActivity.id || Math.random().toString(36).substring(7),
      farmerName: tradeActivity.farmer,
      village: tradeActivity.village,
      crop: cropName.trim(),
      grade: "N/A", // Default value as it's not in TradeActivity
      sowingDate: "N/A", // Default value
      harvestExpected: "N/A", // Default value
      notes: "", // Default value
      minBid: "N/A", // Default value
      maxBid: "N/A", // Default value
      status:
        tradeActivity.status === "Pending review"
          ? "Pending"
          : tradeActivity.status === "In process" ||
            tradeActivity.status === "Completed"
          ? "Approved"
          : "Rejected",
      farmerEvidence: [
        "/Images/veg.png",
        "/Images/veg.png",
        "/Images/veg.png",
        "/Images/veg.png",
      ],
      bdaName: tradeActivity.bda,
      bdaEvidence: {
        cropConfirmed: true,
        cropImage: "/Images/veg.png",
        qualityConfirmed: true,
        qualityImage: "/Images/veg.png",
        locationConfirmed: true,
        locationImage: "/Images/veg.png",
        quantityConfirmed: true,
        quantityImage: "/Images/veg.png",
      },
      remarks: "", // Default value
    };
  };
  const handleViewClick = (tradeActivity: TradeActivity) => {
    const activityData: Activity = mapTradeActivityToActivity(tradeActivity);
    setSelectedActivity(activityData);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No trade activity data available.
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
              crop/Qty
            </th>
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
              Buyer
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
            <tr key={index}>
              <td className="py-4 px-4 w-20 whitespace-nowrap text-center">
                <div className="text-sm text-center text-gray-900 px-2 py-2 rounded-lg bg-yellow-100 ">
                  {item.cropQty}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex items-center justify-center">
                  <div className="ml-4 text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {item.bda}
                    </div>
                    <div className="text-sm text-gray-500">{item.bdaId}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-center text-gray-900 px-2 py-2 rounded-lg bg-green-100">
                  {item.farmer}
                  <div className="text-sm text-gray-500">{item.farmerId}</div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{item.village}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex items-center justify-center">
                  <div className="text-sm text-center text-gray-900 w-36 px-2 py-2 rounded-lg bg-purple-100">
                    <div className="text-sm font-medium text-gray-900">
                      {item.buyer}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.buyerType}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span
                  className={`px-2 inline-flex items-center justify-center gap-2 text-xs leading-5 font-semibold rounded-full`}
                  style={{
                    backgroundColor: `${getStatusInfo(item.status).color}1A`,
                    color: getStatusInfo(item.status).color,
                  }}
                >
                  {getStatusInfo(item.status).icon} {item.status}
                </span>
              </td>
              <td className="px-6 py-4 flex gap-4 whitespace-nowrap text-sm font-medium">
                {(item.status === "Pending review" ||
                  item.status === "In process") && (
                  <button
                    className="text-blue-600 hover:text-blue-900 bg-blue-100 w-40 px-3 py-1 rounded-md"
                    onClick={() => handleViewClick(item)}
                  >
                    View
                  </button>
                )}
                {!(
                  item.status === "Pending review" ||
                  item.status === "In process"
                ) && (
                  <button
                    className="text-gray-600 hover:text-gray-900 bg-white border w-40 border-gray-300 px-3 py-1 rounded-md"
                    onClick={() => handleViewClick(item)}
                  >
                    Review
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedActivity && (
        <ActivityDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          activityData={selectedActivity}
        />
      )}
    </div>
  );
};

export default TradeActivitiesTable;
