import { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatLayout = ({
  selectedChat,
  messages,
  currentUser,
  message,
  setMessage,
  sendMessage,
  onlineUsers,
}) => {

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar onlineUsers={onlineUsers} />

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        <ChatHeader selectedChat={selectedChat} onlineUsers={onlineUsers} />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-200">
          {messages?.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
              isOwn={msg.sender._id === currentUser._id}
            />
          ))}
        </div>

        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />

        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default ChatLayout;