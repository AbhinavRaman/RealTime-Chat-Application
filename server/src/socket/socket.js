const { Server } = require("socket.io");

const initSocket = (server) => {
    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:5173", //React frontend
        },
    });

    io.on("connection", (socket) => {
        console.log("New Socket Connected:", socket.id);

        // user setup
        socket.on("setup", (userData) => {
            socket.userId = userData._id;
            socket.join(userData._id);
            socket.emit("connected");
        });

        // join chat room
        socket.on("join chat", (roomId) => {
            socket.join(roomId);
            console.log("User joined room:", roomId);
        });

        // typing indicator
        socket.on("typing", (roomId) => {
            socket.in(roomId).emit("typing");
        });

        socket.on("stop typing", (roomId) => {
            socket.in(roomId).emit("stop typing");
        });

        // new message
        socket.on("new message", (message) => {
            const chat = message.chat;

            if(!chat.users) return;
            
            chat.users.forEach((user) => {
                if(user._id === message.sender._id) return;

                socket.in(user._id).emit("message received", message);
            });
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
};

module.exports = { initSocket };