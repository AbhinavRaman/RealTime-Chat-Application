const MessageBubble = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
          isOwn
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-white text-gray-800 rounded-bl-md border"
        }`}
      >
        <p>{message.content}</p>

        <div
          className={`text-[10px] mt-1 ${
            isOwn ? "text-blue-200 text-right" : "text-gray-400 text-left"
          }`}
        >
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
