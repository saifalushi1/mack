import express, { Request, Response } from "express";
import { Socket } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
const socketio = require("socket.io");
import { formatMessage } from "./utils/message";
import { userJoin, getCurrentUser, getRoomUsers, userLeave } from "./utils/users";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*"
    }
});
const bot = "Mack Bot";
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

io.on("connection", (socket: Socket) => {
    console.log("New Web Socket Connection");

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
        console.log(msg);
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
        console.log("user has left the chat");
    });
});

import userController from "./controllers/userController";
app.use("/user", userController);

import messageController from "./controllers/messageController";
app.use("/message", messageController);

server.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
});
