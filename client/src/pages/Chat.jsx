import React, { useEffect, useState } from "react";
import socket from "../socket";
import ChatLayout from "../components/ChatLayout";

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("setup", user);

    socket.on("connected", () => {
      console.log("Socket Connected");
    });

    socket.emit("join chat", "Chat1");

    socket.on("message received", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("message received");
    };
  }, [user]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      content: message,
      sender: user,
      chat: {
        _id: "Chat1",
        users: [
          { _id: "user1" },
          { _id: "user2" },
        ],
      },
    };

    socket.emit("new message", newMessage);
    setMessages((prev) => [...prev, newMessage]); // show instantly
    setMessage("");
  };

  return (
    <ChatLayout
      selectedChat={{ name: "Test Chat" }}
      messages={messages}
      currentUser={user}
      message={message}
      setMessage={setMessage}
      sendMessage={sendMessage}
    />
  );
};

export default Chat;