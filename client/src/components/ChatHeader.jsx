const ChatHeader = ({ selectedChat }) => {
  return (
    <div className="h-16 px-6 border-b flex items-center justify-between bg-white">
      <h3 className="font-semibold text-lg">
        {selectedChat?.name || "Select a chat"}
      </h3>
    </div>
  );
};

export default ChatHeader;