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
}) => {
  return (
    <div className="h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        <ChatHeader selectedChat={selectedChat} />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
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
      </div>
    </div>
  );
};

export default ChatLayout;