"use client";
import React, { useState } from "react";
import Image from "next/image";

const ProfileSettingsPage = () => {
  const [firstName, setFirstName] = useState("DEEPAK");
  const [middleName, setMiddleName] = useState("RAMCHANDRA");
  const [lastName, setLastName] = useState("SINGHAL");
  const [mobileNumber, setMobileNumber] = useState("9876543210");
  const [dateOfBirth, setDateOfBirth] = useState("13/07/96");
  const [emailId, setEmailId] = useState("bdosahil@gmail.com");
  const [state, setState] = useState("MAHARASHTRA");
  const [district, setDistrict] = useState("BHANDARA");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateChanges = () => {
    console.log({
      firstName,
      middleName,
      lastName,
      mobileNumber,
      dateOfBirth,
      emailId,
      state,
      district,
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="w-full bg-white px-8 py-6 rounded-lg shadow-md">
        {/* UPLOAD NEW PHOTO Section */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {/* Placeholder for user image */}
            <Image
              src="/images/profile.png"
              width={96}
              height={96}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">UPLOAD NEW PHOTO</h2>
            <p className="text-gray-500 text-sm">
              Choose JPG or PNG document file to upload.
            </p>
          </div>
        </div>

        {/* PROFILE INFORMATION Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">PROFILE INFORMATION</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                FIRST NAME
              </label>
              <input
                type="text"
                id="firstName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="middleName"
                className="block text-sm font-medium text-gray-700"
              >
                MIDDLE NAME
              </label>
              <input
                type="text"
                id="middleName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                LAST NAME
              </label>
              <input
                type="text"
                id="lastName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-gray-700"
              >
                MOBILE NUMBER
              </label>
              <input
                type="number"
                id="mobileNumber"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={mobileNumber}
                onChange={(e) => {
                  if (e.target.value.length <= 10)
                    setMobileNumber(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                DATE OF BIRTH
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="emailId"
                className="block text-sm font-medium text-gray-700"
              >
                EMAIL ID
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="emailId"
                  className="flex-1 block w-full border border-gray-300 rounded-l-md p-2"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
                <button className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Verify
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                STATE
              </label>
              <input
                type="text"
                id="state"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                DISTRICT
              </label>
              <input
                type="text"
                id="district"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* PREFERRED LANGUAGE Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">PREFERRED LANGUAGE</h3>
          <p className="text-gray-500 text-sm mb-2">
            You can choose your preferred language as default language.
          </p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-green-500 text-green-500 rounded-md bg-green-50">
              English
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md">
              हिंदी
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md">
              मराठी
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">NOTIFICATIONS</h3>
          <p className="text-gray-500 text-sm mb-4">
            You can enable or disable default notifications setting.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Crop Verification Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Trade Escalation Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">BDA Escalation Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">
                Daily Report Submission Reminder
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">General Announcements</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* CHANGE PASSWORD Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">CHANGE PASSWORD</h3>
          <p className="text-gray-500 text-sm mb-4">
            Your new password must be different from previous used passwords.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                CURRENT PASSWORD
              </label>
              <input
                type="password"
                id="currentPassword"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div></div> {/* Empty div for spacing */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                ENTER NEW PASSWORD
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  id="newPassword"
                  className="flex-1 block w-full border border-gray-300 rounded-r-md p-2"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                CONFIRM PASSWORD
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  id="confirmPassword"
                  className="flex-1 block w-full border border-gray-300 rounded-r-md p-2"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* DEACTIVATE BDO ACCOUNT Section */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-semibold">DEACTIVATE BDO ACCOUNT</h3>
          <button className="text-red-600 hover:text-red-800 text-sm">
            Request Deactivation
          </button>
        </div>

        {/* UPDATE CHANGES Button */}
        <div className="text-right">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={handleUpdateChanges}
          >
            UPDATE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
