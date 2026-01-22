const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// health check route
app.get("/", (req, res) => {
    res.send("Backend is running.");
})

module.exports = app;