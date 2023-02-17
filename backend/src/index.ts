import express from "express";
import { Socket } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
const socketio = require("socket.io"); // eslint-disable-line
import { formatMessage } from "./utils/message";
import { userJoin, getCurrentUser } from "./userConnection/users";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        // origin: "*"
    },
});
const bot = "Mack Bot";
const PORT = process.env.PORT || 8000;

app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

io.on("connection", (socket: Socket) => {
    socket.on(
        "joinRoom",
        async (id: string, roomNumber: number, userName: string, roomName) => {
            const user = await userJoin({
                id,
                room: roomNumber,
                userName,
                roomName,
            });
            console.log("*******", user);
            if (user === undefined) {
                const errorMessage: ErrorMessage = {
                    errorMessage: "user has already joined",
                };
                socket.emit("userError", errorMessage);
                return;
            }
            socket.join(user.room.toString());

            socket.emit(
                "message",
                formatMessage(
                    bot,
                    `Welcome to the chat roomNumber: ${user.room} user: ${user.userName}`,
                ),
            );

            // Broadcast when a user connects (to all users) thinking about changing or removing
            socket.broadcast.emit(
                "message",
                formatMessage(bot, `${user.userName} has joined the chat`),
            );
        },
    );

    // listen for chat message from client and send back the message
    socket.on("chatMessage", async (msg) => {
        const user = await getCurrentUser(socket.id);
        io.to(user.room).emit(
            "message",
            formatMessage(user.userName || "no user found", msg),
        );
    });

    // runs when client disconnects (to all other users )
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

import userController from "./controllers/user";
app.use("/user", userController);

import messageController from "./controllers/message";
app.use("/message", messageController);

import friendController from "./controllers/friend";
app.use("/friend", friendController);

httpServer.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
});

interface ErrorMessage {
    errorMessage: "user has already joined";
}
