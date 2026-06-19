import express from "express";
import dotenv from "dotenv"
import authRouter from "./routes/authRoute.js"
import messageRoute from "./routes/messageRoute.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; 

app.use("/api/auth", authRouter);
app.use("/api/message", messageRoute);

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));