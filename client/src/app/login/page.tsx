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
      router.push("/");
    } else {
      setError("Invalid User ID or Password");
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("username", "Guest");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="mb-8 text-center">
        <Image
          src="/Images/logo.png"
          alt="TAC Agrilink Logo"
          width={150}
          height={150}
          className="h-auto w-40 mx-auto mb-4"
        />
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">
          Village-Level Access for Ground Support
        </h1>
        <p className="text-gray-600 text-lg">
          Connecting Farmers, Trades & Communities through You
        </p>
      </div>

      <div className="bg-white p-8 border-[1px] rounded-4xl w-full max-w-[50%]">
        <h2 className="text-4xl font-light text-center mb-2">TAC BDA Login</h2>
        <p className="text-gray-500 text-center text-lg mb-6">
          Your data is safe & encrypted.
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              USER ID
            </label>
            <input
              type="text"
              id="userId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Your User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              PASSWORD
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors mt-2"
          >
            Login as Guest
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot Password? (Link to reset via OTP)
          </a>
        </div>
      </div>
      <div className="text-center mt-6 text-sm">
        <p className="text-gray-600 mb-2">Need Help? Contact TAC Support</p>
        <p className="text-gray-600">
          <a href="#" className="text-blue-500 hover:underline">
            English
          </a>{" "}
          |
          <a href="#" className="text-gray-500 hover:underline">
            {" "}
            Marathi
          </a>{" "}
          |
          <a href="#" className="text-gray-500 hover:underline">
            {" "}
            Hindi
          </a>
        </p>
      </div>
    </div>
  );
}
