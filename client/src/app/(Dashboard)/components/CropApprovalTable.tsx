import { CropApproval, Activity } from "../../../types";
import ActivityDetailsModal from "./ActivityDetailsModal";
import { useState } from "react";
import { apiService, Crop } from "../../../lib/api";

interface CropApprovalTableProps {
  initialData?: CropApproval[];
  rawCropData?: Crop[]; // New prop to pass raw crop data
  getStatusInfo: (status: string) => {
    icon: React.ReactElement | null;
    color: string;
    backgroundColor: string;
  };

  onDataChange: (newData: CropApproval[]) => void;
  onCropClick: (cropId: string) => void; // New prop for handling crop clicks
}

const CropApprovalTable: React.FC<CropApprovalTableProps> = ({
  initialData = [],
  rawCropData = [], // Destructure rawCropData with a default empty array
  getStatusInfo,
  onDataChange,
  onCropClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const mapCropApprovalToActivity = (cropApproval: CropApproval): Activity => {
    const rawCrop = rawCropData?.find((crop) => crop._id === cropApproval.id);
    const cropName = rawCrop?.cropName || cropApproval.cropQty.split(" - ")[0];
    const getFullName = (
      nameObj:
        | { first: string; middle?: string; last: string }
        | string
        | undefined
    ) => {
      if (typeof nameObj === "object" && nameObj !== null) {
        return [nameObj.first, nameObj.middle, nameObj.last]
          .filter(Boolean)
          .join(" ");
      } else if (typeof nameObj === "string") {
        return nameObj;
      }
      return "N/A";
    };
    console.log("Full rawCrop object in CropApprovalTable:", rawCrop);

    return {
      id:
        rawCrop?._id ||
        cropApproval.id ||
        Math.random().toString(36).substring(7),
      farmerName: getFullName(rawCrop?.farmerId?.name || cropApproval.farmer),
      farmerMobileNumber: rawCrop?.farmerId?.mobileNumber || "N/A",
      village:
        rawCrop?.farmerId?.address?.villageOrCity &&
        rawCrop.farmerId.address.villageOrCity !== ""
          ? rawCrop.farmerId.address.villageOrCity
          : cropApproval.village,
      fullAddress: rawCrop?.farmerId?.address
        ? [
            rawCrop.farmerId.address.houseNo,
            rawCrop.farmerId.address.street,
            rawCrop.farmerId.address.villageOrCity,
            rawCrop.farmerId.address.district,
            rawCrop.farmerId.address.state,
            rawCrop.farmerId.address.country,
            rawCrop.farmerId.address.postalCode,
          ]
            .filter(Boolean)
            .join(", ")
        : undefined,
      crop: cropName.trim(),
      grade:
        rawCrop?.cropQualityGrade || cropApproval.cropQualityGrade || "N/A",
      sowingDate: rawCrop?.updatedAt
        ? new Date(rawCrop.updatedAt).toISOString().split("T")[0]
        : cropApproval.sowingDate
        ? new Date(cropApproval.sowingDate).toISOString().split("T")[0]
        : "N/A",
      harvestExpected: "N/A",
      notes: rawCrop?.feedback || "N/A",
      minBid: "N/A",
      maxBid: "N/A",
      status:
        rawCrop?.status === "active"
          ? "Approved"
          : rawCrop?.status === "pending"
          ? "Pending"
          : rawCrop?.status === "cancelled"
          ? "Rejected"
          : rawCrop?.status === "sold"
          ? "Completed"
          : cropApproval.status === "Approved"
          ? "Approved"
          : cropApproval.status === "Awaiting approval"
          ? "Pending"
          : "Rejected",
      farmerEvidence: rawCrop?.cropImages || [
        "/Images/veg.png",
        "/Images/veg.png",
        "/Images/veg.png",
        "/Images/veg.png",
      ],
      bdaName: getFullName(rawCrop?.farmerId?.name || cropApproval.bda.name),
      bdaEvidence: {
        cropConfirmed: true,
        cropImage: rawCrop?.cropImages?.[0] || "/Images/veg.png",
        qualityConfirmed: true,
        qualityImage: rawCrop?.cropImages?.[1] || "/Images/veg.png",
        locationConfirmed: true,
        locationImage: rawCrop?.cropImages?.[2] || "/Images/veg.png",
        quantityConfirmed: true,
        quantityImage: rawCrop?.cropImages?.[3] || "/Images/veg.png",
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
      const response = await apiService.updateCropStatus(id, "rejected");
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

  const handleViewClick = (crop: CropApproval) => {
    // console.log("Clicked crop data:", crop);
    onCropClick(crop.id);
    setSelectedActivity(mapCropApprovalToActivity(crop));
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
              Mobile Number
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
                    {typeof item.bda?.name === "string"
                      ? item.bda?.name.charAt(0) || "—"
                      : "—"}
                  </div>
                  <div className="ml-4 text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {typeof item.bda?.name === "string"
                        ? item.bda?.name || "—"
                        : "—"}
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
                <div className="text-sm text-gray-900">
                  {typeof item.farmer === "string"
                    ? item.farmer
                    : `${item.farmer?.first ?? ""} ${
                        item.farmer?.middle ?? ""
                      } ${item.farmer?.last ?? ""}`.trim()}
                </div>
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
