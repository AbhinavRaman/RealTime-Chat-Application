const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { initSocket } = require("./socket/socket");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// create http server
const server = http.createServer(app);

// initialize socket.io
initSocket(server);

// start server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});