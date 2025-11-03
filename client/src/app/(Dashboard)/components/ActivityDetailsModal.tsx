import React from "react";
import { Activity } from "../../../types";
import Image from "next/image";
import { X } from "lucide-react";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityData: Activity | null;
  onApprove: () => void;
  onReject: () => void;
  onEscalate: () => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
  isOpen,
  onClose,
  activityData,
  onApprove,
  onReject,
  onEscalate,
}) => {
  if (!isOpen || !activityData) return null;

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
                activityData.status === "Approved" ||
                activityData.status === "Completed"
                  ? "text-green-600"
                  : activityData.status === "Pending" ||
                    activityData.status === "Pending review"
                  ? "text-yellow-600"
                  : activityData.status === "In process"
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  activityData.status === "Approved" ||
                  activityData.status === "Completed"
                    ? "bg-green-600"
                    : activityData.status === "Pending" ||
                      activityData.status === "Pending review"
                    ? "bg-yellow-600"
                    : activityData.status === "In process"
                    ? "bg-blue-600"
                    : "bg-red-600"
                } mr-1`}
              ></span>{" "}
              {activityData.status}
            </span>
          </div>
        </div>

        {/* Farmer Details */}

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
                  <p className="font-medium">{activityData?.farmerName}</p>
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
            {activityData.farmerEvidence && (
              <div className="mb-6 rounded-lg bg-gray-100">
                <h3 className="mb-3 text-gray-600">
                  Evidence Submitted by Farmer:
                </h3>
                <div className="flex gap-2">
                  {activityData.farmerEvidence.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Farmer Evidence ${index + 1}`}
                      height={0}
                      width={0}
                      sizes={"100vw"}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assigned BDA */}

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
          <div className="flex gap-2 mb-4">
            <div
              className={`flex flex-col items-center ${
                activityData.bdaEvidence?.cropConfirmed || false
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
              {activityData.bdaEvidence?.cropImage && (
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
                activityData.bdaEvidence?.qualityConfirmed || false
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
              {activityData.bdaEvidence?.qualityImage && (
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
                activityData.bdaEvidence?.locationConfirmed || false
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
              {activityData.bdaEvidence?.locationImage && (
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
                activityData.bdaEvidence?.quantityConfirmed || false
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
              {activityData.bdaEvidence?.quantityImage && (
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
            <span className="font-medium">Remarks:</span>{" "}
            {(activityData.bdaEvidence as { remarks?: string })?.remarks ||
              "N/A"}
          </p>
        </div>

        {/* Action Buttons */}

        <div className="flex w-full space-x-4 mt-6">
          {activityData.status === "Pending" && (
            <>
              <button
                onClick={onEscalate}
                className="border w-full border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50"
              >
                Escalate to Admin
              </button>
              <button
                onClick={onReject}
                className="bg-red-500 w-full text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                Reject
              </button>
              <button
                onClick={onApprove}
                className="bg-green-500 w-full text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
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
      </div>
    </div>
  );
};

export default ActivityDetailsModal;
