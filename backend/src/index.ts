import express from "express";
import { Socket } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
const socketio = require("socket.io"); // eslint-disable-line
import { formatMessage } from "./utils/message";
import { userJoin, getCurrentUser, userLeave } from "./utils/users";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer, {
    cors: {
        origin: "http://localhost:3000"
        // origin: "*"
    }
});
const bot = "Mack Bot";
const PORT = process.env.PORT || 8000;

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

io.on("connection", (socket: Socket) => {
    socket.on("joinRoom", (username, room) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room.toString());

        socket.emit(
            "message",
            formatMessage(
                bot,
                `Welcome to the chat roomNumber: ${user.room} user: ${user.username}`
            )
        );

        // Broadcast when a user connects (to all users) thinking about changing or removing
        socket.broadcast.emit(
            "message",
            formatMessage(bot, `${user.username} has joined the chat`)
        );
    });

    // listen for chat message from client and send back the message
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user?.room).emit("message", formatMessage(user?.username || "no user found", msg));
    });

    // runs when client disconnects (to all other users )
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user.room !== -1) {
            io.to(user.room).emit(
                "message",
                formatMessage(bot, `${user.username} has left the chat`)
            );
        }
    });
});

import userController from "./controllers/user/userController";
app.use("/user", userController);

import messageController from "./controllers/message/messageController";
app.use("/message", messageController);

import friendController from "./controllers/friend/friendController";
app.use("/friend", friendController);

httpServer.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
});
