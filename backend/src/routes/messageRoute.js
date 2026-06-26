import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/messageController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { arcjetProtection } from "../middlewares/arcjetMiddleware.js";

const messageRouter = express.Router();

// messageRouter.use(arcjetProtection)
messageRouter.use(protectRoute);


messageRouter.get("/contacts", getAllContacts);
messageRouter.get("/chats", getChatPartners);
messageRouter.get("/:id",getMessagesByUserId);
messageRouter.post("/send/:id",sendMessage);
export default messageRouter;