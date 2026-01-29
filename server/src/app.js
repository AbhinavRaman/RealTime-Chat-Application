const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// health check route
app.get("/", (req, res) => {
    res.send("Backend is running.");
})

module.exports = app;