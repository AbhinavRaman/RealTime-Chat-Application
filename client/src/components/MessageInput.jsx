const MessageInput = ({ message, setMessage, sendMessage, handleTyping }) => {
  return (
    <div className="h-16 border-t bg-white flex items-center px-6 gap-3 shadow-inner">
      <input
        type="text"
        value={message}
        // onChange={(e) => setMessage(e.target.value)}
        onChange={handleTyping}
        placeholder="Type a message..."
        className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        onClick={sendMessage}
        className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;