import React, { useEffect, useState } from "react";
import socket from "../socket";
import ChatLayout from "../components/ChatLayout";

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!typing) {
        setTyping(true);
        socket.emit("typing", "Chat1");
    }

    const timerLength = 2000;
    setTimeout(() => {
        socket.emit("stop typing", "Chat1");
        setTyping(false);
    }, timerLength);
  };

  useEffect(() => {
    socket.emit("setup", user);

    socket.on("online users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("connected", () => {
      console.log("Socket Connected");
    });

    socket.emit("join chat", "Chat1");

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    socket.on("message received", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("typing");
      socket.off("stop typing");
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
      onlineUsers={onlineUsers}
      isTyping={isTyping}
      handleTyping={handleTyping}
    />
  );
};

export default Chat;