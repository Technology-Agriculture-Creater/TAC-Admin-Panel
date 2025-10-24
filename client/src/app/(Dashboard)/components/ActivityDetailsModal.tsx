import React from "react";
import { Activity, TradeActivity } from "../../../types";
import Image from "next/image";
import { X } from "lucide-react";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityData: Activity | TradeActivity;
}

const isTradeActivity = (activity: Activity | TradeActivity): activity is TradeActivity => 'cropQty' in activity;

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
  isOpen,
  onClose,
  activityData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          {/* &times; */}
          <X />
        </button>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold">{activityData.id}</span>
            <span
              className={`flex items-center text-sm ${
                isTradeActivity(activityData)
                  ? activityData.status === "Pending review"
                    ? "text-yellow-600"
                    : activityData.status === "In process"
                    ? "text-blue-600"
                    : activityData.status === "Completed"
                    ? "text-green-600"
                    : "text-red-600"
                  : activityData.status === "Approved"
                  ? "text-green-600"
                  : activityData.status === "Pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isTradeActivity(activityData)
                    ? activityData.status === "Pending review"
                      ? "bg-yellow-600"
                      : activityData.status === "In process"
                      ? "bg-blue-600"
                      : activityData.status === "Completed"
                      ? "bg-green-600"
                      : "bg-red-600"
                    : activityData.status === "Approved"
                    ? "bg-green-600"
                    : activityData.status === "Pending"
                    ? "bg-yellow-600"
                    : "bg-red-600"
                } mr-1`}
              ></span>{" "}
              {activityData.status}
            </span>
          </div>
        </div>

        {/* Farmer Details */}
        {isTradeActivity(activityData) ? (
          <div className="mb-6 p-4 rounded-lg bg-gray-100">
            <h3 className="text-lg font-semibold mb-3">Trade Details</h3>
            <div className="flex flex-col gap-3">
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Crop Quantity:</span>{" "}
                {activityData.cropQty}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">BDA:</span> {activityData.bda}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Farmer:</span>{" "}
                {activityData.farmer}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Village:</span>{" "}
                {activityData.village}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Buyer:</span>{" "}
                {activityData.buyer}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-lg bg-gray-100">
            <h3 className="text-lg font-semibold mb-3">Farmer Details</h3>
            <div className="flex flex-col gap-3">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src="/Images/profile.jpg"
                    alt="Farmer"
                    height={0}
                    width={0}
                    sizes={"100vw"}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p className="font-medium">{activityData.farmerName}</p>
                    <p className="text-sm text-gray-500">{activityData.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                    About Farmer
                  </button>
                </div>
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Village:</span>{" "}
                {activityData.village}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Crop:</span> {activityData.crop}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Grade:</span> {activityData.grade}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Sowing Date:</span>{" "}
                {activityData.sowingDate}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Harvest Expected:</span>{" "}
                {activityData.harvestExpected}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Notes:</span> {activityData.notes}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Min Bid:</span> ₹
                {activityData.minBid}/Qtl
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">Max Bid:</span> ₹
                {activityData.maxBid}/Qtl
              </div>
            </div>
          </div>
        )}

        {/* Assigned BDA */}
        {isTradeActivity(activityData) ? (
          <div className="mb-6 p-4 rounded-lg bg-gray-100">
            <h3 className="text-lg font-semibold mb-3">BDA Details</h3>
            <div className="flex flex-col gap-3">
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">BDA Name:</span>{" "}
                {activityData.bda}
              </div>
              <div className="w-full flex items-center justify-between">
                <span className="text-gray-600">BDA ID:</span>{" "}
                {activityData.bdaId}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-lg bg-gray-100">
            <h3 className="text-lg font-semibold mb-3">Assigned BDA:</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image
                  src="/Images/profile.jpg"
                  alt="BDA"
                  height={0}
                  width={0}
                  sizes={"100vw"}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <div>
                  <p className="font-medium">{activityData.bdaName}</p>
                  <p className="text-sm text-gray-500">{activityData.id}</p>
                </div>
              </div>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50">
                View profile{" "}
              </button>
            </div>
            <h4 className="text-md font-semibold mt-4 mb-2">
              Evidence Submitted by BDA:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              <div
                className={`flex flex-col items-center ${
                  activityData.bdaEvidence.cropConfirmed
                    ? "text-green-700"
                    : "text-gray-500"
                }`}
              >
                <div className="flex item-center">
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Crop Confirmed
                </div>
                {activityData.bdaEvidence.cropImage && (
                  <Image
                    src={activityData.bdaEvidence.cropImage}
                    alt="Crop Evidence"
                    height={0}
                    width={0}
                    sizes={"100vw"}
                    className="w-36 h-24 object-cover rounded-md"
                  />
                )}
              </div>
              <div
                className={`flex flex-col items-center ${
                  activityData.bdaEvidence.qualityConfirmed
                    ? "text-green-700"
                    : "text-gray-500"
                }`}
              >
                <div className="flex item-center">
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Quality Confirmed
                </div>
                {activityData.bdaEvidence.qualityImage && (
                  <Image
                    src={activityData.bdaEvidence.qualityImage}
                    alt="Quality Evidence"
                    height={0}
                    width={0}
                    sizes={"100vw"}
                    className="w-36 h-24 object-cover rounded-md"
                  />
                )}
              </div>
              <div
                className={`flex flex-col items-center ${
                  activityData.bdaEvidence.locationConfirmed
                    ? "text-green-700"
                    : "text-gray-500"
                }`}
              >
                <div className="flex item-center">
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Location Confirmed
                </div>
                {activityData.bdaEvidence.locationImage && (
                  <Image
                    src={activityData.bdaEvidence.locationImage}
                    alt="Location Evidence"
                    height={0}
                    width={0}
                    sizes={"100vw"}
                    className="w-36 h-24 object-cover rounded-md"
                  />
                )}
              </div>
              <div
                className={`flex flex-col items-center ${
                  activityData.bdaEvidence.quantityConfirmed
                    ? "text-green-700"
                    : "text-gray-500"
                }`}
              >
                <div className="flex item-center">
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Quantity Confirmed
                </div>
                {activityData.bdaEvidence.quantityImage && (
                  <Image
                    src={activityData.bdaEvidence.quantityImage}
                    alt="Quantity Evidence"
                    height={0}
                    width={0}
                    sizes={"100vw"}
                    className="w-36 h-24 object-cover rounded-md"
                  />
                )}
              </div>
            </div>
            <p className="text-gray-600 mt-4">
              <span className="font-medium">Remarks:</span> {activityData.remarks}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {isTradeActivity(activityData) ? (
          <div className="flex w-full space-x-4 mt-6">
            {(activityData.status === "Completed" ||
              activityData.status === "Disputed") && (
              <>
                <button className="border w-full border-red-600 text-red-600 px-6 py-2 rounded-md hover:bg-red-50">
                  Delete
                </button>
                <button className="bg-green-500 w-full text-white px-6 py-2 rounded-md hover:bg-green-600">
                  Retain
                </button>
              </>
            )}
            {(activityData.status === "Pending review" ||
              activityData.status === "In process") && (
              <>
                <button className="border w-full border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50">
                  Escalate to Admin
                </button>
                <button className="bg-red-500 w-full text-white px-6 py-2 rounded-md hover:bg-red-600">
                  Reject
                </button>
                <button className="bg-green-500 w-full text-white px-6 py-2 rounded-md hover:bg-green-600">
                  Approve
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex w-full space-x-4 mt-6">
            {activityData.status === "Pending" && (
              <>
                <button className="border w-full border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50">
                  Escalate to Admin
                </button>
                <button className="bg-red-500 w-full text-white px-6 py-2 rounded-md hover:bg-red-600">
                  Reject
                </button>
                <button className="bg-green-500 w-full text-white px-6 py-2 rounded-md hover:bg-green-600">
                  Approve
                </button>
              </>
            )}
            {activityData.status === "Approved" && (
              <>
                <button className="border w-full border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50">
                  Delete
                </button>
                <button className="bg-red-500 w-full text-white px-6 py-2 rounded-md hover:bg-red-600">
                  Reject
                </button>
              </>
            )}
            {activityData.status === "Rejected" && (
              <>
                <button className="border w-full border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50">
                  Delete
                </button>
                <button className="bg-green-500 w-full text-white px-6 py-2 rounded-md hover:bg-green-600">
                  Retain
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetailsModal;
