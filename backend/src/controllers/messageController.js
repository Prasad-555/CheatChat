import User from "../models/userModel.js"
import Message from "../models/messageModel.js"
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async(req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getAllContacts:", error);
        res.status(500).json({message: "Server error"});
    }
}

export const getMessagesByUserId = async(req,res) => {
    try {
        const myId = req.user._id;
        const {id:userToChatId} = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId },
            ],
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessagesByUserId: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const sendMessage = async(req,res) => {
    try {
        const { text, image } = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        })

        await newMessage.save();
        //todo Send message to user in realtime

        res.status(201).json(newMessage);
    } catch (error) {
         console.log("Error in sendMessage controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getChatPartners = async(req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const messages = await Message.find({
            $or: [ {senderId: loggedInUserId}, {recieverId: loggedInUserId} ]
        })
        const chatPartnerIds = [...new Set(messages.map((msg) => 
            msg.senderId.toString() === loggedInUserId.toString() ? msg.recieverId.toString() : msg.senderId.toString()
        ))]
        console.log(chatPartnerIds)
        const chatPartners = await User.find({_id: {$in: chatPartnerIds}}).select("-password");
        res.status(200).json(chatPartners)
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}