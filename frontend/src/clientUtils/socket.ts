import { io } from "socket.io-client"

const SOCKETURL = process.env.SOCKETURL || "http://localhost:8000"
export const socket = io(SOCKETURL)
