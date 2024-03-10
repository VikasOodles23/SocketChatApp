import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  console.log("message sent");

  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await new messageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // TODO: SOCKET IO FUNCTIONALITY WILL BE HERE
    await Promise.all([newMessage.save(), conversation.save()]);

    res.status(201).json({
      newMessage,
    });
  } catch (error) {
    console.log("error in send messg controller", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    let coversation = await conversationModel
      .findOne({
        participants: {
          $all: [senderId, userToChatId],
        },
      })
      .populate("messages");

    if (!coversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(coversation.messages);
  } catch (error) {
    console.log("error in get messgs controller", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
