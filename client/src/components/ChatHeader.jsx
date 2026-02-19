const ChatHeader = ({ selectedChat }) => {
  return (
    <div className="h-16 px-6 border-b bg-white flex items-center justify-between shadow-sm">
      <div>
        <h3 className="font-semibold text-lg">
          {selectedChat?.name || "Select a chat"}
        </h3>
        <p className="text-sm text-gray-400">Online</p>
      </div>
    </div>
  );
};

export default ChatHeader;
