import jwt from "jsonwebtoken";
import User from "../models/userModel.js"
import ("dotenv/config");

export const socketAuthMiddleware = async(socket, next) => {
    try {
        const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];

        if(!token){
            console.log("Socket connection rejected: no token provided");
            return next(new Error("Unauthorized - No Token Provided"));
        }
        //verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken){
            return res.status(401).json({message: "Unauthorized -- Invalid token"});
        }
        const user = await User.findById(decodedToken.userId).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        socket.user = user;
        socket.userId = user._id;
        
        console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`)
        next();
    } catch (error) {
        console.log("Error in socket authentication:", error);
        next(new Error("Unauthorized - Authentication failed"));
    }
}