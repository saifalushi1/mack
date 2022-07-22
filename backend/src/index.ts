import express, {Request, Response} from 'express';
import { Socket } from 'socket.io';
const http = require("http")
const socketio = require("socket.io")
const formatMessage = require("./utils/message")
const {userJoin, getCurrentUser, getRoomUsers, userLeave} = require("./utils/users")
const cors = require("cors")


const app = express();
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "*"
    }
})
const bot = "Mack Bot"
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

io.on("connection", (socket: Socket) => {
    console.log("New Web Socket Connection")

    socket.on("joinRoom", (username, room) => {
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)

        socket.emit("message", formatMessage(bot, `Welcome to the chat roomNumber: ${user.room} user: ${user.username}`))
    
        // Broadcast when a user connects (to all users)
        socket.broadcast.emit("message", formatMessage(bot,`${user.username} has joined the chat`))
    })

    // listen for chat message from client and send back the message
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit("message", formatMessage(user.username, msg))
        console.log(msg)
    })

    // runs when client disconnects (to all other users )
    socket.on("disconnect", () => {
        const user = userLeave(socket.id)
        if(user.room !== -1){
            io.to(user.room).emit("message", formatMessage(bot,`${user.username} has left the chat`))
        }
        console.log("user has left the chat")
    })
})

const userController = require("./controllers/userController")
app.use("/user", userController)

const messageController = require("./controllers/messageController")
app.use("/message", messageController)

server.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
});
