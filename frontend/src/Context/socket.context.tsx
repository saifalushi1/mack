import { createContext } from "react";
import io, { Socket } from "socket.io-client";
const socket_url = process.env.SOCKET_URL || "http://localhost:8000"

interface Context {
    socket: Socket
    user?: object
    setUser: Function;
    messages?: { text: string; time: string; username: string }[];
    setMessages: Function;
    roomId?: string 
    rooms: {}
}

const socket = io(socket_url)

const socketContext = createContext<Context>({
    socket,
    setUser: () => false,
    setMessages: () => false,
    rooms: {},
    messages: [],
})