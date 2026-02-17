const MessageInput = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="h-16 border-t flex items-center px-4 bg-white">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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