import React from "react";
import Image from "next/image";
import TopPerformersData from "@/data/TopPerformers.json";

const TopPerformers = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">
        Top performer of the month in District
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rank
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
                Farmer registered
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Crops Verified
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trades Facilitated
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Complaints resolved
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {TopPerformersData.map((performer) => (
              <tr key={performer.rank}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {performer.rank === 1 && (
                    <Image
                      src="/Images/first.png"
                      alt="Gold Medal"
                      width={36}
                      height={24}
                    />
                  )}
                  {performer.rank === 2 && (
                    <Image
                      src="/Images/second.png"
                      alt="Silver Medal"
                      width={36}
                      height={24}
                    />
                  )}
                  {performer.rank === 3 && (
                    <Image
                      src="/Images/third.png"
                      alt="Bronze Medal"
                      width={36}
                      height={24}
                    />
                  )}
                  {performer.rank > 3 && (
                    <span className="text-sm text-center text-gray-900">
                      {performer.rank}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        className="h-10 w-10 rounded-full object-cover"
                        src={performer.bda.image}
                        alt="BDA Profile"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm text-center font-medium text-gray-900">
                        {performer.bda.name}
                      </div>
                      <div className="text-sm text-center text-gray-500">
                        ID: {performer.bda.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {performer.farmerRegistered}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {performer.cropsVerified}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {performer.tradesFacilitated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {performer.complaintsResolved}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {performer.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPerformers;
