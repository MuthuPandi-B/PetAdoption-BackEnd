import Message from "../Models/messageSchema.js";
import User from "../Models/userSchema.js";

// Send Message
export const sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;
  const senderId = req.user._id;

  try {
    const newMessage = new Message({ sender: senderId, receiver: receiverId, message });
    await newMessage.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Conversations
export const getConversations = async (req, res) => {
  const userId = req.user._id;

  try {
    const conversations = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).populate('sender', 'name').populate('receiver', 'name');
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
