"use client";

import React, { useState } from "react";

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  placeholder?: string;
}

// Helper component for a single input field
const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
}

// Helper component for a textarea field
const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      rows={3}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    ></textarea>
  </div>
);

// Initial state for a new crop
const initialCropState = {
  name: "",
  variants: [
    {
      name: "",
      image: "",
      price: 0,
      minPrice: 0,
      maxPrice: 0,
      pricePercentage: 0,
    },
  ],
  category: { name: "", image: "" },
  location: { latitude: 0, longitude: 0, city: "", state: "" },
  supplyDemand: {
    arrivalQtyToday: 0,
    stockAvailability: 0,
    majorArrivalDistricts: [""],
  },
  marketLocation: "",
  cropInsights: {
    season: "",
    sowingTime: "",
    harvestTime: "",
    averageYield: "",
    requiredTemperature: "",
    waterRequirement: "",
  },
  farmerInformation: {
    recommendedSellingTime: "",
    storageTips: "",
    qualityGrading: "",
  },
  additionalDetails: {
    govtMSP: 0,
    exportImportStatus: "",
    subsidiesSchemes: [""],
  },
  otherDetails: {}, // Dynamic key-value pairs
};

const CropForm = () => {
  const [cropData, setCropData] = useState(initialCropState);
  const [otherDetailsInput, setOtherDetailsInput] = useState({
    key: "",
    value: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle nested fields using dot notation in the name attribute (e.g., "category.name")
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setCropData((prevData) => ({
        ...prevData,
        [parent]: {
          ...(prevData[parent as keyof typeof prevData] as Record<
            string,
            unknown
          >),
          [child]: type === "number" ? parseFloat(value) : value,
        },
      }));
    } else {
      setCropData((prevData) => ({
        ...prevData,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  // --- Variant Handlers ---
  const handleVariantChange = (index: number, e) => {
    const { name, value, type } = e.target;
    const updatedVariants = cropData.variants.map((variant, i) =>
      i === index
        ? { ...variant, [name]: type === "number" ? parseFloat(value) : value }
        : variant
    );
    setCropData((prevData) => ({ ...prevData, variants: updatedVariants }));
  };

  const addVariant = () => {
    setCropData((prevData) => ({
      ...prevData,
      variants: [
        ...prevData.variants,
        {
          name: "",
          image: "",
          price: 0,
          minPrice: 0,
          maxPrice: 0,
          pricePercentage: 0,
        },
      ],
    }));
  };

  const removeVariant = (index: number) => {
    setCropData((prevData) => ({
      ...prevData,
      variants: prevData.variants.filter((_, i) => i !== index),
    }));
  };

  // --- Major Arrival Districts Handlers ---
  const handleDistrictChange = (index: number, e) => {
    const { value } = e.target;
    const updatedDistricts = cropData.supplyDemand.majorArrivalDistricts.map(
      (district, i) => (i === index ? value : district)
    );
    setCropData((prevData) => ({
      ...prevData,
      supplyDemand: {
        ...prevData.supplyDemand,
        majorArrivalDistricts: updatedDistricts,
      },
    }));
  };

  const addDistrict = () => {
    setCropData((prevData) => ({
      ...prevData,
      supplyDemand: {
        ...prevData.supplyDemand,
        majorArrivalDistricts: [
          ...prevData.supplyDemand.majorArrivalDistricts,
          "",
        ],
      },
    }));
  };

  const removeDistrict = (index: number) => {
    setCropData((prevData) => ({
      ...prevData,
      supplyDemand: {
        ...prevData.supplyDemand,
        majorArrivalDistricts:
          prevData.supplyDemand.majorArrivalDistricts.filter(
            (_, i) => i !== index
          ),
      },
    }));
  };

  // --- Subsidies Schemes Handlers ---
  const handleSchemeChange = (index: number, e) => {
    const { value } = e.target;
    const updatedSchemes = cropData.additionalDetails.subsidiesSchemes.map(
      (scheme, i) => (i === index ? value : scheme)
    );
    setCropData((prevData) => ({
      ...prevData,
      additionalDetails: {
        ...prevData.additionalDetails,
        subsidiesSchemes: updatedSchemes,
      },
    }));
  };

  const addScheme = () => {
    setCropData((prevData) => ({
      ...prevData,
      additionalDetails: {
        ...prevData.additionalDetails,
        subsidiesSchemes: [...prevData.additionalDetails.subsidiesSchemes, ""],
      },
    }));
  };

  const removeScheme = (index: number) => {
    setCropData((prevData) => ({
      ...prevData,
      additionalDetails: {
        ...prevData.additionalDetails,
        subsidiesSchemes: prevData.additionalDetails.subsidiesSchemes.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // --- Other Details Handlers (Dynamic Key-Value Pairs) ---
  const handleOtherDetailsInputChange = (e) => {
    const { name, value } = e.target;
    setOtherDetailsInput((prev) => ({ ...prev, [name]: value }));
  };

  const addOtherDetail = () => {
    const { key, value } = otherDetailsInput;
    if (key && value) {
      setCropData((prevData) => ({
        ...prevData,
        otherDetails: { ...prevData.otherDetails, [key]: value },
      }));
      setOtherDetailsInput({ key: "", value: "" }); // Clear input fields
    }
  };

  const removeOtherDetail = (keyToRemove: string) => {
    setCropData((prevData) => {
      const newOtherDetails = { ...prevData.otherDetails };
      delete (newOtherDetails as Record<string, unknown>)[keyToRemove];
      return { ...prevData, otherDetails: newOtherDetails };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8083/api/crops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cropData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create crop");
      }

      const result = await response.json();
      console.log("Crop created successfully:", result);
      alert("Crop created successfully!");
      setCropData(initialCropState); 
    } catch (error: any) {
      console.error("Error creating crop:", error?.message);
      alert(`Error: ${error?.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="container max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Create New Crop
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Information */}
          <section className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              General Information
            </h3>
            <FormInput
              label="Crop Name"
              name="name"
              value={cropData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Wheat, Rice"
            />
            <FormInput
              label="Market Location"
              name="marketLocation"
              value={cropData.marketLocation}
              onChange={handleChange}
              required
              placeholder="e.g., Delhi, Mumbai"
            />
          </section>

          {/* Category */}
          <section className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Category
            </h3>
            <FormInput
              label="Category Name"
              name="category.name"
              value={cropData.category.name}
              onChange={handleChange}
              required
              placeholder="e.g., Cereal, Vegetable"
            />
            <FormInput
              label="Category Image URL"
              name="category.image"
              value={cropData.category.image}
              onChange={handleChange}
              placeholder="https://example.com/category-image.jpg"
            />
          </section>

          {/* Location */}
          <section className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Latitude"
                type="number"
                name="location.latitude"
                value={cropData.location.latitude}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Longitude"
                type="number"
                name="location.longitude"
                value={cropData.location.longitude}
                onChange={handleChange}
                required
              />
              <FormInput
                label="City"
                name="location.city"
                value={cropData.location.city}
                onChange={handleChange}
                required
                placeholder="e.g., Indore"
              />
              <FormInput
                label="State"
                name="location.state"
                value={cropData.location.state}
                onChange={handleChange}
                required
                placeholder="e.g., Madhya Pradesh"
              />
            </div>
          </section>

          {/* Supply & Demand */}
          <section className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Supply & Demand
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Arrival Quantity Today"
                type="number"
                name="supplyDemand.arrivalQtyToday"
                value={cropData.supplyDemand.arrivalQtyToday}
                onChange={handleChange}
              />
              <FormInput
                label="Stock Availability"
                type="number"
                name="supplyDemand.stockAvailability"
                value={cropData.supplyDemand.stockAvailability}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Major Arrival Districts
              </label>
              {cropData.supplyDemand.majorArrivalDistricts.map(
                (district, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => handleDistrictChange(index, e)}
                      placeholder="District Name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-2"
                    />
                    {cropData.supplyDemand.majorArrivalDistricts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDistrict(index)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                )
              )}
              <button
                type="button"
                onClick={addDistrict}
                className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300"
              >
                Add District
              </button>
            </div>
          </section>

          {/* Crop Insights */}
          <section className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Crop Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Season"
                name="cropInsights.season"
                value={cropData.cropInsights.season}
                onChange={handleChange}
                placeholder="e.g., Kharif, Rabi"
              />
              <FormInput
                label="Sowing Time"
                name="cropInsights.sowingTime"
                value={cropData.cropInsights.sowingTime}
                onChange={handleChange}
                placeholder="e.g., June-July"
              />
              <FormInput
                label="Harvest Time"
                name="cropInsights.harvestTime"
                value={cropData.cropInsights.harvestTime}
                onChange={handleChange}
                placeholder="e.g., October-November"
              />
              <FormInput
                label="Average Yield"
                name="cropInsights.averageYield"
                value={cropData.cropInsights.averageYield}
                onChange={handleChange}
                placeholder="e.g., 30 quintals/hectare"
              />
              <FormInput
                label="Required Temperature"
                name="cropInsights.requiredTemperature"
                value={cropData.cropInsights.requiredTemperature}
                onChange={handleChange}
                placeholder="e.g., 20-30°C"
              />
              <FormInput
                label="Water Requirement"
                name="cropInsights.waterRequirement"
                value={cropData.cropInsights.waterRequirement}
                onChange={handleChange}
                placeholder="e.g., Moderate"
              />
            </div>
          </section>

          {/* Farmer Information */}
          <section className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Farmer Information
            </h3>
            <FormInput
              label="Recommended Selling Time"
              name="farmerInformation.recommendedSellingTime"
              value={cropData.farmerInformation.recommendedSellingTime}
              onChange={handleChange}
              placeholder="e.g., Post-harvest, Before monsoon"
            />
            <FormTextarea
              label="Storage Tips"
              name="farmerInformation.storageTips"
              value={cropData.farmerInformation.storageTips}
              onChange={handleChange}
              placeholder="Provide tips for proper storage..."
            />
            <FormInput
              label="Quality Grading"
              name="farmerInformation.qualityGrading"
              value={cropData.farmerInformation.qualityGrading}
              onChange={handleChange}
              placeholder="e.g., A-grade, B-grade standards"
            />
          </section>

          {/* Additional Details */}
          <section className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Additional Details
            </h3>
            <FormInput
              label="Government MSP"
              type="number"
              name="additionalDetails.govtMSP"
              value={cropData.additionalDetails.govtMSP}
              onChange={handleChange}
            />
            <FormInput
              label="Export/Import Status"
              name="additionalDetails.exportImportStatus"
              value={cropData.additionalDetails.exportImportStatus}
              onChange={handleChange}
              placeholder="e.g., Exportable, Import-dependent"
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subsidies Schemes
              </label>
              {cropData.additionalDetails.subsidiesSchemes.map(
                (scheme, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={scheme}
                      onChange={(e) => handleSchemeChange(index, e)}
                      placeholder="Scheme Name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-2"
                    />
                    {cropData.additionalDetails.subsidiesSchemes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeScheme(index)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                )
              )}
              <button
                type="button"
                onClick={addScheme}
                className="mt-2 px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300"
              >
                Add Scheme
              </button>
            </div>
          </section>

          {/* Variants */}
          <section className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Variants
            </h3>
            {cropData.variants.map((variant, index) => (
              <div
                key={index}
                className="mb-6 p-4 border border-gray-300 rounded-md bg-white shadow-sm"
              >
                <h4 className="text-lg font-medium text-gray-700 mb-3">
                  Variant #{index + 1}
                </h4>
                <FormInput
                  label="Variant Name"
                  name="name"
                  value={variant.name}
                  onChange={(e) => handleVariantChange(index, e)}
                  required
                  placeholder="e.g., Sharbati, Pusa 1121"
                />
                <FormInput
                  label="Image URL"
                  name="image"
                  value={variant.image}
                  onChange={(e) => handleVariantChange(index, e)}
                  placeholder="https://example.com/variant-image.jpg"
                />
                <FormInput
                  label="Price"
                  type="number"
                  name="price"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, e)}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Min Price"
                    type="number"
                    name="minPrice"
                    value={variant.minPrice}
                    onChange={(e: unknown) => handleVariantChange(index, e)}
                  />
                  <FormInput
                    label="Max Price"
                    type="number"
                    name="maxPrice"
                    value={variant.maxPrice}
                    onChange={(e: unknown) => handleVariantChange(index, e)}
                  />
                </div>
                <FormInput
                  label="Price Percentage"
                  type="number"
                  name="pricePercentage"
                  value={variant.pricePercentage}
                  onChange={(e: unknown) => handleVariantChange(index, e)}
                />
                {cropData.variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="mt-3 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Remove Variant
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addVariant}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Another Variant
            </button>
          </section>

          {/* Other Details (Dynamic Key-Value) */}
          <section className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Other Details (Custom Fields)
            </h3>
            <div className="flex items-center mb-4">
              <input
                type="text"
                name="key"
                value={otherDetailsInput.key}
                onChange={handleOtherDetailsInputChange}
                placeholder="Field Name (e.g., 'reportedDate')"
                className="mt-1 block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-2"
              />
              <input
                type="text"
                name="value"
                value={otherDetailsInput.value}
                onChange={handleOtherDetailsInputChange}
                placeholder="Field Value"
                className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-2"
              />
              <button
                type="button"
                onClick={addOtherDetail}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            {Object.keys(cropData.otherDetails).length > 0 && (
              <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white">
                <h4 className="text-md font-medium text-gray-700 mb-2">
                  Current Custom Fields:
                </h4>
                {Object.entries(cropData.otherDetails).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center mb-1 text-sm text-gray-600"
                  >
                    <span>
                      <strong>{key}:</strong> {String(value)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeOtherDetail(key)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Submit Button */}
          <div className="pt-5">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Crop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CropForm;
