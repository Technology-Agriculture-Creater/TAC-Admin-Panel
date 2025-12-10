"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  EllipsisVertical,
  X,
  Phone,
  MapPin,
  LaptopMinimal,
  MessageSquare,
} from "lucide-react";

const mockChats = [
  { id: "1", name: "Ramesh Patil", status: "Online" },
  { id: "2", name: "Sneha Joshi", status: "Offline" },
  { id: "3", name: "Anil Kumar", status: "Online" },
  { id: "4", name: "Priya Sharma", status: "Online" },
  { id: "5", name: "Vikram Singh", status: "Online" },
];

interface ChatClientProps {
  id: string;
}

const ChatClient: React.FC<ChatClientProps> = ({ id }) => {
  const router = useRouter();
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [messages, setMessages] = useState<
    {
      id: number | string;
      text: string;
      sender: "user" | "other";
    }[]
  >([
    {
      id: "initial-0",
      text: "Hello! How can I help you today?",
      sender: "other",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageIdCounter, setMessageIdCounter] = useState(1); // To generate unique IDs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/gemini");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const selectedChatUser = mockChats.find((chat) => chat.id === id);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessageId = `user-${messageIdCounter}`;
    const aiPlaceholderId = `ai-placeholder-${messageIdCounter + 1}`;

    // Immediately add user message and AI placeholder
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: userMessageId, text: newMessage, sender: "user" },
      { id: aiPlaceholderId, text: "...", sender: "other" }, // Placeholder
    ]);
    setNewMessage(""); // Clear input
    setIsLoading(true); // Set loading state

    setMessageIdCounter((prev) => prev + 2); // Increment counter for next messages

    const messageToSend = {
      message: newMessage,
      sender: "user",
    };

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Update the placeholder message with the actual AI response
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === aiPlaceholderId ? { ...msg, text: result.text } : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      // Update placeholder with an error message
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === aiPlaceholderId
            ? { ...msg, text: "Error: Could not get a response." } // Display error message
            : msg
        )
      );
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  if (!selectedChatUser) {
    return (
      <div className="flex items-center justify-center h-screen p-6 bg-white rounded-lg">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Chat Not Found</h2>
          <button
            onClick={() => router.push("/communications")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Back to Chats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[99%] p-6 bg-white rounded-lg">
      {/* Back Button & User Header */}
      <div className="flex items-center pb-4 border-b justify-between">
        <div className="flex items-center">
          <button
            onClick={() => router.push("/communications")}
            className="mr-3 p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </button>
          <Image
            src="/Images/profile.jpg"
            alt={selectedChatUser.name}
            className="w-12 h-12 rounded-full mr-3 object-cover"
            height={0}
            width={0}
            sizes="100vw"
          />
          <div>
            <div className="text-xl font-medium">{selectedChatUser.name}</div>
            <div
              className={`text-sm ${
                selectedChatUser.status === "Online"
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              {selectedChatUser.status}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <EllipsisVertical className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t p-4 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !isLoading) {
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </div>

      {/* Right Panel */}
      {isRightPanelOpen && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg p-6 border-l">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Chat Details</h3>
            <button
              onClick={() => setIsRightPanelOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="text-center mb-6">
            <Image
              src="/Images/profile.jpg"
              alt={selectedChatUser.name}
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
              height={0}
              width={0}
              sizes="100vw"
            />
            <h4 className="text-lg font-medium">{selectedChatUser.name}</h4>
            <p
              className={`text-sm ${
                selectedChatUser.status === "Online"
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              {selectedChatUser.status}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Phone className="w-5 h-5 mr-3" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-3" />
              <span>Mumbai, India</span>
            </div>
            <div className="flex items-center text-gray-700">
              <LaptopMinimal className="w-5 h-5 mr-3" />
              <span>Last seen recently</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MessageSquare className="w-5 h-5 mr-3" />
              <span>Joined on Jan 1, 2023</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatClient;
