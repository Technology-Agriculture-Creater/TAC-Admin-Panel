import { CropApproval, Activity } from "../../../types";
import ActivityDetailsModal from "./ActivityDetailsModal";
import { useState } from "react";
import { apiService } from "../../../lib/api";

interface CropApprovalTableProps {
  initialData?: CropApproval[];
  getStatusInfo: (status: string) => {
    icon: React.ReactElement | null;
    color: string;
    backgroundColor: string;
  };
  onDataChange: (newData: CropApproval[]) => void;
}

const CropApprovalTable: React.FC<CropApprovalTableProps> = ({
  initialData = [],
  getStatusInfo,
  onDataChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const mapCropApprovalToActivity = (cropApproval: CropApproval): Activity => {
    const cropName = cropApproval.cropQty.split(" - ")[0];
    return {
      id: cropApproval.id || Math.random().toString(36).substring(7),
      farmerName: cropApproval.farmer,
      village: cropApproval.village,
      crop: cropName.trim(),
      grade: "N/A",
      sowingDate: "N/A",
      harvestExpected: "N/A",
      notes: "",
      minBid: "N/A",
      maxBid: "N/A",
      status:
        cropApproval.status === "Approved"
          ? "Approved"
          : cropApproval.status === "Awaiting approval"
          ? "Pending"
          : "Rejected",
      farmerEvidence: [
        "/Images/veg.png",
        "/Images/veg.png",
        "/Images/veg.png",
        "/Images/veg.png",
      ],
      bdaName: cropApproval.bda.name,
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
      remarks: "",
    };
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await apiService.updateCropStatus(id, "active");
      if (response.success) {
        const newData = initialData.map((item) =>
          item.id === id
            ? { ...item, status: "Approved", action: ["review"] }
            : item
        );
        onDataChange(newData);
      } else {
        console.error("Failed to approve crop:", response.message);
        alert("Failed to approve crop. Please try again.");
      }
    } catch (error) {
      console.error("Error approving crop:", error);
      alert("Error approving crop. Please try again.");
    }
    handleCloseModal();
  };

  const handleReject = async (id: string) => {
    try {
      const response = await apiService.updateCropStatus(id, "cancelled");
      if (response.success) {
        const newData = initialData.map((item) =>
          item.id === id
            ? { ...item, status: "Rejected", action: ["review"] }
            : item
        );
        onDataChange(newData);
      } else {
        console.error("Failed to reject crop:", response.message);
        alert("Failed to reject crop. Please try again.");
      }
    } catch (error) {
      console.error("Error rejecting crop:", error);
      alert("Error rejecting crop. Please try again.");
    }
    handleCloseModal();
  };

  const handleEscalate = (id: string) => {
    console.log(`Escalate to Admin for ID: ${id}`);
    handleCloseModal();
  };

  const handleViewClick = (item: CropApproval) => {
    setSelectedActivity(mapCropApprovalToActivity(item));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  if (initialData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No crop approval data available.
      </div>
    );
  }

  return (
    <div className="min-w-full align-middle">
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
          {initialData.map((item, index) => (
            <tr key={index} className="w-full">
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
                    {/* {item.bda?.name?.charAt(0) || "—"} */}
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
                {item.action.includes("view") && (
                  <button
                    onClick={() => handleViewClick(item)}
                    className="text-blue-600 hover:text-blue-900 bg-blue-100 w-40 px-3 py-1 rounded-md"
                  >
                    View
                  </button>
                )}
                {item.action.includes("review") && (
                  <button
                    onClick={() => handleViewClick(item)}
                    className="text-gray-600 hover:text-gray-900 bg-white border w-40 border-gray-300 px-3 py-1 rounded-md"
                  >
                    Review
                  </button>
                )}
                {item.action.includes("...") && (
                  <button className="ml-2 text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded-md">
                    ...
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
          onApprove={() =>
            selectedActivity && handleApprove(selectedActivity.id)
          }
          onReject={() => selectedActivity && handleReject(selectedActivity.id)}
          onEscalate={() =>
            selectedActivity && handleEscalate(selectedActivity.id)
          }
        />
      )}
    </div>
  );
};

export default CropApprovalTable;
