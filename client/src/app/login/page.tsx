"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === "sahil@123" && password === "sahil@123") {
      localStorage.setItem("username", "Sahil");
      router.push("/dashboard");
    } else {
      setError("Invalid User ID or Password");
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("username", "Guest");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto flex flex-col lg:flex-row">
      {/* LEFT PANEL – visible only on large screens */}
      <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-1/2 bg-gradient-to-br from-green-50 to-white p-10">
        <Image
          src="/Images/logo.png"
          alt="TAC Agrilink Logo"
          width={180}
          height={180}
          className="mb-6"
        />
        <h1 className="text-3xl xl:text-4xl font-semibold text-gray-800 text-center leading-tight mb-3">
          Village-Level Access for Ground Support
        </h1>
        <p className="text-gray-600 text-lg text-center max-w-md">
          Connecting Farmers, Trades & Communities through You
        </p>
      </div>

      {/* RIGHT PANEL – always visible */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 sm:px-10 py-10 bg-white">
        {/* On small screens, show logo above the form */}
        <div className="flex flex-col items-center justify-center mb-6 lg:hidden">
          <Image
            src="/Images/logo.png"
            alt="TAC Agrilink Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <h1 className="text-xl font-semibold text-gray-800 text-center leading-tight mb-1">
            Village-Level Access for Ground Support
          </h1>
          <p className="text-gray-600 text-sm text-center">
            Connecting Farmers, Trades & Communities through You
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="w-full max-w-sm sm:max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-2 text-gray-800">
            TAC BDA Login
          </h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            Your data is safe & encrypted.
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            {/* USER ID */}
            <div className="mb-4">
              <label
                htmlFor="userId"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                USER ID
              </label>
              <input
                type="text"
                id="userId"
                className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Your User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Buttons */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors mt-2 text-sm sm:text-base"
            >
              Login as Guest
            </button>
          </form>

          <div className="text-center mt-4 text-xs sm:text-sm">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password? (Link to reset via OTP)
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-6 text-xs sm:text-sm">
          <p className="text-gray-600 mb-1">Need Help? Contact TAC Support</p>
          <p className="text-gray-600">
            <a href="#" className="text-blue-500 hover:underline">
              English
            </a>{" "}
            |{" "}
            <a href="#" className="text-gray-500 hover:underline">
              Marathi
            </a>{" "}
            |{" "}
            <a href="#" className="text-gray-500 hover:underline">
              Hindi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
