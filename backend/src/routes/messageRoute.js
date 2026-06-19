import express from "express";

const messageRouter = express.Router();

messageRouter.get("/send",(req,res) => {
    res.send("send message endpoint");
})
messageRouter.get("/recieve",(req,res) => {
    res.send("recieve message endpoint");
})

export default messageRouter;