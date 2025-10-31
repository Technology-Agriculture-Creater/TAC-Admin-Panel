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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex justify-center">
          <Image
            src="/Images/logo1.png"
            alt="TAC Logo"
            width={150}
            height={150}
            className="h-24 w-auto"
          />
        </div>
        <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              type="text"
              id="userId"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
      </div>
    </div>
  );
}
