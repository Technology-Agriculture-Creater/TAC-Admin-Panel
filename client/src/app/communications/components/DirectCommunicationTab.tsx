"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DirectCommunicationTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const chatList = [
    {
      id: "1",
      name: "Ramesh Patil",
      status: "Online",
      type: "individual",
    },
    {
      id: "2",
      name: "Sneha Joshi",
      status: "Offline",
      type: "individual",
    },
    {
      id: "3",
      name: "Amit Kumar",
      status: "Online",
      type: "individual",
    },
    {
      id: "4",
      name: "Priya Sharma",
      status: "Online",
      type: "individual",
    },
    {
      id: "5",
      name: "Vikram Singh",
      status: "Online",
      type: "individual",
    },
  ];

  const groupChatList = [
    {
      id: "1",
      name: "KUHI TALUKA -BDA's CLUSTER",
      members: "Ramesh Patil, Sneha Joshi, Amit Kumar, Priyansh Sharma +3",
      type: "group",
    },
  ];

  const filteredChatList = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroupChatList = groupChatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-grow mr-4">
            <input
              type="text"
              placeholder="Search by Farmer / BDA / Trade ID"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <select className="p-2 border rounded-lg">
            <option>Recent</option>
          </select>
        </div>

        <div className="mb-4 text-lg font-semibold">Chats</div>

        {filteredChatList.map((chat) => (
          <div
            key={chat.id}
            onClick={() => router.push(`/communications/chat/${chat.id}`)}
            className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm cursor-pointer"
          >
            <div className="flex items-center">
              <Image
                src="/Images/profile.jpg"
                alt={chat.name}
                className="w-10 h-10 rounded-full mr-3 object-cover"
                height={0}
                width={0}
                sizes="100vw"
              />
              <div>
                <div className="font-medium">{chat.name}</div>
                <div
                  className={`text-sm ${
                    chat.status === "Online"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {chat.status}
                </div>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-500"
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
          </div>
        ))}

        <div className="mb-4 text-lg font-semibold">Group Chat</div>

        {filteredGroupChatList.map((chat) => (
          <div
            key={chat.id}
            onClick={() => router.push(`/communications/chat/${chat.id}`)}
            className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm cursor-pointer"
          >
            <div className="flex items-center">
              <Image
                src="/Images/profile.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3 object-cover"
                height={0}
                width={0}
                sizes="100vw"
              />
              <div>
                <div className="font-medium">{chat.name}</div>
                <div className="text-sm text-gray-500">{chat.members}</div>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-500"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectCommunicationTab;
