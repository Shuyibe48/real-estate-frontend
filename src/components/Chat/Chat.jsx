import { X } from "lucide-react";
import { useState, useContext } from "react";
import Container from "../Shared/Container";
import { AuthContext } from "../../providers/AuthProvider";
import baseUrl from "../../api/baseUrl";
import { useQuery } from "@tanstack/react-query";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [chat, setChat] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Fetch all chat messages for the user using useQuery
  const {
    data: messages = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["messages", user?.userId?._id],
    queryFn: async ({ queryKey }) => {
      const [_key, userId] = queryKey;
      if (!userId) throw new Error("User ID is required");
      const response = await baseUrl.get(`/messages/${userId}`);
      return response.data.data; // Assuming the messages are in `data.data`
    },
    enabled: !!user?.userId?._id, // Runs only if user ID exists
  });

  // Open a specific chat
  const openChat = (chat) => {
    setActiveChat(chat);
    setChat(true);
  };

  // Send a new message
  const sendMessage = async () => {
    if (newMessage.trim() === "" || !activeChat) return;

    const receiverId = activeChat?.participants.filter(
      (p) => p._id !== user?.userId?._id
    )[0]?._id;

    const messagePayload = {
      senderId: user?.userId?._id,
      toId: receiverId,
      messageData: newMessage,
    };

    try {
      await baseUrl.post("/messages/create-message", messagePayload);
      setNewMessage("");
      refetch(); // Refetch messages to update the chat
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div>
      <Container>
        <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br p-4 rounded-md from-gray-100 to-gray-200">
          {/* Sidebar */}
          <div className="space-y-4 mt-4">
            {isLoading && <p>Loading messages...</p>}
            {error && <p>Error loading messages: {error.message}</p>}
            {messages.map((chat) => (
              <div
                key={chat._id}
                onClick={() => openChat(chat)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-rose-100 cursor-pointer transition-all duration-200"
              >
                {/* Displaying the participant's initials */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-rose-500 text-white flex items-center justify-center font-bold">
                  {chat.text && chat.text[0] ? chat.text[0].toUpperCase() : "?"}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {chat.participants.find((p) => p._id !== user?.userId?._id)
                      ?.email || ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    {chat.messages?.[chat.messages.length - 1]?.text
                      ? chat.messages[chat.messages.length - 1].text.length > 30
                        ? chat.messages[
                            chat.messages.length - 1
                          ].text.substring(0, 30) + "..."
                        : chat.messages[chat.messages.length - 1].text
                      : ""}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {chat.createdAt
                    ? new Date(chat.createdAt).toLocaleTimeString()
                    : "N/A"}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Window */}
          {chat && activeChat && (
            <div className="md:w-2/3 w-full flex flex-col bg-white rounded-lg shadow-xl mx-2 mt-2 md:mt-0 overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-rose-600 font-bold">
                    {activeChat.participants
                      .find((p) => p._id !== user?.userId?._id)
                      ?.email[0].toUpperCase() || "?"}
                  </div>
                  <span className="font-semibold text-lg">
                    {activeChat.participants.find(
                      (p) => p._id !== user?.userId?._id
                    )?.email || "Unknown"}
                  </span>
                </div>
                <button onClick={() => setChat(false)}>
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6">
                {activeChat?.messages?.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex gap-3 items-start ${
                      msg.senderId === user?.userId?._id
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div className="bg-white p-4 rounded-2xl max-w-xs shadow-lg">
                      <p className="text-gray-800">{msg.text}</p>
                      <span className="text-xs text-gray-400 mt-2 block">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center border-t p-4 bg-white shadow-lg">
                <textarea
                  className="flex-1 border border-gray-300 rounded-full p-3 h-12 resize-none focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-200"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                ></textarea>
                <button
                  onClick={sendMessage}
                  className="ml-4 px-6 py-2 bg-gradient-to-br from-rose-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-rose-600 hover:to-indigo-700 transition-all duration-200"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Chat;
