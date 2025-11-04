"use client";

import { Input } from "./ui/input";
import { Search, ChevronDown } from "lucide-react";

interface FarmerManagementControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FarmerManagementControls: React.FC<FarmerManagementControlsProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="bg-white p-4 mt-8 rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-60">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <div className="relative">
              <select className="border border-gray-300 rounded-md p-2 text-sm appearance-none pr-20">
                <option> Sort</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerManagementControls;
