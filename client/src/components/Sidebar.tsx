import { X } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      role="navigation"
      aria-label="Main sidebar"
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0 flex" : "-translate-x-full hidden"
      } md:static md:translate-x-0 md:flex md:h-screen`}
    >
      <div className="p-4 flex items-center justify-between">
        <Image
          src="/images/logo1.png"
          height={0}
          width={0}
          sizes="100vw"
          alt="TAC Logo"
          className="h-16 md:h-full w-auto md:w-full mr-2"
        />{" "}
        <button
          onClick={toggleSidebar}
          className="md:hidden ml-auto rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-6 flex-1">
        <ul>
          <li className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 border-r-4 border-blue-600 font-semibold">
            <Image
              src="/images/dashboard.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />{" "}
            Dashboard
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Image
              src="/images/monitor.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />
            BDA Monitoring
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Image
              src="/images/framer.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />
            Farmer Management
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Image
              src="/images/communication.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />
            Communications
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Image
              src="/images/report.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />
            Reports
          </li>
          <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Image
              src="/images/profile.png"
              height={0}
              width={0}
              sizes="100vw"
              alt="TAC Logo"
              className="h-6 w-6 mr-2"
            />
            Profile & Settings
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-4">
        <ul className="flex flex-col gap-4">
          <li className="flex bg-gray-100 border border-gray-300 font-bold text-sm items-center justify-between rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            Register New Farmer
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </li>
          <li className="flex bg-gray-100 border border-gray-300 font-bold text-sm items-center justify-between rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            Support center
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </li>
          <li className="flex bg-gray-100 border border-gray-300 font-bold text-sm items-center justify-between rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
            About
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
