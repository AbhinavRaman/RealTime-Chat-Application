import React, {useEffect, useState} from "react";
import socket from "../socket";

const Chat = ({ user }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        //connect user
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
        if(!message.trim()) return;

        const newMessage = {
            content: message,
            sender: user,
            // chat: {
            //     _id: "test-chat-id",
            //     users: [user], //temporary for now
            // },

            chat: {
                _id: "Chat1",
                users: [
                    { _id: "user1"},
                    { _id: "user2"}
                ],
            },
        };

        socket.emit("new message", newMessage);
        setMessage("");
    }

    return (
        <div className="flex flex-col">
            <div>
                {messages.map((m, i) => (
                    <p key={i}>{m.content}</p>
                ))}
            </div>

            <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)} 
                className="border rounded-2xl"
            />
            <button onClick={() => sendMessage()}>Send</button>
        </div>
    );
};

export default Chat;