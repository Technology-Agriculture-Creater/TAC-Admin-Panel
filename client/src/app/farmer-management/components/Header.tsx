import React from "react";

const Header = () => {
  const [selectedCity, setSelectedCity] = React.useState("NAGPUR");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setIsDropdownOpen(false);
  };
  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg shadow-md mb-4 w-full">
      <div
        className="bg-white p-4 rounded-lg shadow-md flex-1 flex items-center justify-between relative cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-xl font-semibold">{selectedCity}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCityChange("NAGPUR")}
            >
              NAGPUR
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCityChange("PUNE")}
            >
              PUNE
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCityChange("MUMBAI")}
            >
              MUMBAI
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-[1px] rounded-lg flex-1">
        <p className="text-gray-500 text-sm">Farmer registered</p>
        <p className="text-xl font-semibold">12</p>
      </div>
      <div className="p-4 border-[1px] rounded-lg flex-1">
        <p className="text-gray-500 text-sm">Crop verification</p>
        <p className="text-xl font-semibold">2565</p>
      </div>
      <div className="p-4 border-[1px] rounded-lg flex-1">
        <p className="text-gray-500 text-sm">Trade Volume</p>
        <p className="text-xl font-semibold">1200</p>
      </div>
    </div>
  );
};

export default Header;
