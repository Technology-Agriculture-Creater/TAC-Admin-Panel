import ChatClient from "./ChatClient";

const mockChats = [
  { id: "1", name: "Ramesh Patil", status: "Online" },
  { id: "2", name: "Sneha Joshi", status: "Offline" },
  { id: "3", name: "Anil Kumar", status: "Online" },
  { id: "4", name: "Priya Sharma", status: "Online" },
  { id: "5", name: "Vikram Singh", status: "Online" },
];

export async function generateStaticParams() {
  return mockChats.map((chat) => ({
    id: chat.id,
  }));
}

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const { id } = await params;
  return <ChatClient id={id} />;
};

export default ChatPage;
