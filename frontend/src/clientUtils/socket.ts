import { io } from "socket.io-client"

// may have to put this in app.tsx and wrap a useEffect(() => {}, []) around it
// sometimes the socket makes a new connection without closing out the old one and that can cause probs
// so come back and add logic to check if the connection is made.
const SOCKETURL = process.env.SOCKETURL || "http://localhost:8000"
export const socket = io(SOCKETURL)
