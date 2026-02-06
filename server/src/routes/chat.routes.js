const express = require("express");
const protect = require("../middlewares/auth.middleware");
const { accessChat, fetchChats } = require("../controllers/chat.controller");

const router = express.Router();

router.get("/", protect, fetchChats);
router.post("/", protect, accessChat);

module.exports = router;