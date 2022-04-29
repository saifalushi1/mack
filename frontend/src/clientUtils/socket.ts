import { io } from "socket.io-client";

// may have to put this in app.tsx and wrap a useEffect(() => {}, []) around it
// sometimes the socket makes a new connection without closing out the old one and that can cause probs
// so come back and add logic to check if the connection is made.
export const socket = io("http://localhost:8000")