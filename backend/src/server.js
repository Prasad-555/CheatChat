import express from "express";
import dotenv from "dotenv"
import authRouter from "./routes/authRoute.js"
import messageRoute from "./routes/messageRoute.js"
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; 
const __dirname = path.resolve(); 

app.use(express.json()); 
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/message", messageRoute);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend")))
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
}

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
    connectDB();
});