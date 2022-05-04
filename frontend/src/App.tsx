import React, { useEffect, useState } from 'react';
import { socket } from "./clientUtils/socket"
import { formatMessage } from "./clientUtils/formatMessage"
import {Routes, Route, Link} from "react-router-dom"
import Chat from "./components/Chat"

// interface IbotMessages {
//   text: string
//   time: string
//   username: string
// }

export interface Iuser {
  username: string
  password: string
  email: string
}

// interface ImessageRoom {
//   room: number
//   username: string
// }


const App = () => {
  // const socket = io.connect("http://localhost:8000", {reconnect: true});
  const [connected, setConnected] = useState<boolean>(false)
  const [user, setUser] = useState<Iuser>({username: "sushi", password: "", email: ""})
  // const [messages, setMessages] = useState<Array<IbotMessages>>([]);
  // const [messageRoom, setMessageRoom] = useState<ImessageRoom>({room: 0, username: ""})
  // const [roomNumber, setRoomNumber] = useState<number>(0)
  // const [chatBody, setChatBody] = useState<string>("")
  
  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true)
      console.log(socket.connected); // true
      console.log("connected")
    });
  }, [])

  // username is not being sent even if hardcoded in wtf?????
  // also the issue of multiple messages being recieved is back again fml
  // Change this to a function and call the function on button press with other persons id as the room number
  //   const joinRoom = () => {
  //     setMessageRoom(n => ({...n, username: user.username, room: roomNumber}))
  //     socket.emit("joinRoom", messageRoom)
  //   }

  // console.log("messageRoom: ", messageRoom)

  // useEffect(() => {
  //   socket.on("message", (message: IbotMessages) => {
  //     setMessages(x => [...x, message])
  //    console.log("message from server:", {message})
  //   })
  // }, [setMessages])
  
  // const submitMessage = (e: React.SyntheticEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   console.log("message submitted")
  //   socket.emit("chatMessage", chatBody)
  //   setChatBody("")
    
  // }
  
  // console.log("messages state:", messages)
  return (
    <>
    <Routes>
      <Route path="chat" element={<Chat user={user} connected={connected}/>} />
    </Routes>
    <Link to="chat">
      <button>Join room</button>
    </Link>
    </>
  );
}

export default App;
