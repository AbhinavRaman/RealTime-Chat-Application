const Message = require("../models/Message");
const Chat = require("../models/Chat");

// SEND MESSAGE
const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res.status(400).json({
        message: "Content and chatId are required",
      });
    }

    let message = await Message.create({
      sender: req.user.id,
      content,
      chat: chatId,
    });

    message = await message.populate("sender", "name email");
    message = await message.populate("chat");

    // update latestMessage in chat
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
    })
      .populate("sender", "name email")
      .populate("chat")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { sendMessage, fetchMessages };