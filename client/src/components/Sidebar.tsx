import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      icon: "/images/dashboard.png",
      href: "/",
    },
    {
      name: "BDA Monitoring",
      icon: "/images/monitor.png",
      href: "/bda-monitoring",
    },
    {
      name: "Farmer Management",
      icon: "/images/framer.png",
      href: "/farmer-management",
    },
    {
      name: "Communications",
      icon: "/images/communication.png",
      href: "/communications",
    },
    {
      name: "Reports",
      icon: "/images/report.png",
      href: "/reports",
    },
    {
      name: "Profile & Settings",
      icon: "/images/profile.png",
      href: "/profile-settings",
    },
  ];

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
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  pathname === item.href
                    ? "bg-blue-50 border-r-4 border-blue-600 text-blue-400 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <Image
                  src={item.icon}
                  height={0}
                  width={0}
                  sizes="100vw"
                  alt={item.name}
                  className="h-6 w-6 mr-2"
                />{" "}
                {item.name}
              </Link>
            </li>
          ))}
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
