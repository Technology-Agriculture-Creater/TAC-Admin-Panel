import React from 'react'
import Image from "next/image"

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        {/* Logo */}
        <Image src="/Images/logo.png" alt="TAC Agrilink Logo" height={0} width={0} sizes="100vw" className="h-24 w-80 object-contain mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Village-Level Access for Ground Support</h1>
        <p className="text-gray-600 text-lg">Connecting Farmers, Trades & Communities through You</p>
      </div>

      {/* Login Form */}
      <div className="bg-red-300 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">TAC BDA Login</h2>
        <p className="text-gray-500 text-center text-sm mb-6">Your data is safe & encrypted.</p>

        <form>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">USER ID</label>
            <input
              type="text"
              id="userId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your User ID"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">PASSWORD</label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Forgot Password? (Link to reset via OTP)
          </a>
        </div>
      </div>

      {/* Language Selection */}
      <div className="text-center mt-6">
        <p className="text-gray-600 mb-2">Need Help? Contact TAC Support</p>
        <div className="flex justify-center space-x-2 text-sm">
          <a href="#" className="text-blue-500 hover:text-blue-800">English</a>
          <span>|</span>
          <a href="#" className="text-blue-500 hover:text-blue-800">Marathi</a>
          <span>|</span>
          <a href="#" className="text-blue-500 hover:text-blue-800">Hindi</a>
        </div>
      </div>
    </div>
  );
}