const Chat = require("../models/Chat");

const accessChat = async (req, res) => {
  try {
    const userId = req.body?.userId;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user.id, userId] },
    }).populate("users", "-password");

    if (chat) return res.json(chat);

    const newChat = await Chat.create({
      users: [req.user.id, userId],
    });

    const fullChat = await Chat.findById(newChat._id).populate(
      "users",
      "-password"
    );

    res.status(201).json(fullChat);
  } catch (error) {
    console.error("Access chat error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


const fetchChats = async (req,res) => {
    try {
        const chats = await Chat.find({
            users: { $elemMatch: {$eq: req.user.id} },
        }).populate("users", "-password").populate("latestMessage").sort({ updatedAt: -1});

        res.json(chats);
    } catch (error) {
        console.error("Fetch chats error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { accessChat, fetchChats };