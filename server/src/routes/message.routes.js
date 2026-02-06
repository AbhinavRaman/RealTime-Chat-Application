const express = require("express");
const protect = require("../middlewares/auth.middleware");
const {
  sendMessage,
  fetchMessages,
} = require("../controllers/message.controller");

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, fetchMessages);

module.exports = router;
