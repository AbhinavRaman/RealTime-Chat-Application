const MessageBubble = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isOwn
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;