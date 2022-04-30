import express, {Request, Response} from 'express';
import { Socket } from 'socket.io';
const http = require("http")
const socketio = require("socket.io")
const formatMessage = require("./utils/message")
const {userJoin, getCurrentUser} = require("./utils/users")
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

    //welcome new user (to user)
    socket.emit("message", formatMessage(bot, "welcome to the chat room"))

    // Broadcast when a user connects (to all users)
    socket.broadcast.emit("message", formatMessage(bot,"A user has joined the chat"))
    
    socket.on("chatMessage", (msg) => {
        io.emit("message", formatMessage('user', msg))
        console.log(msg)
    })

    // runs when client disconnects (to all other users )
    socket.on("disconnect", () => {
        io.emit("message", formatMessage(bot,"A user has left the chat"))
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

