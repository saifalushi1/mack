import React, { useEffect, useState } from 'react';
import { Iuser } from '../App';
import { socket } from "../clientUtils/socket"

interface IbotMessages {
    text: string
    time: string
    username: string
  }
  
  interface ImessageRoom {
    room: number
    username: string
  }

  interface AppProps {
      user: Iuser
      connected: boolean
  }

const Chat: React.FC<AppProps>  = (props): JSX.Element => {
    const [messages, setMessages] = useState<Array<IbotMessages>>([]);
    const [messageRoom, setMessageRoom] = useState<ImessageRoom>({room: 0, username: ""})
    const [roomNumber, setRoomNumber] = useState<number>(0)
    const [chatBody, setChatBody] = useState<string>("")

    const joinRoom = () => {
        setMessageRoom(n => ({...n, username: props.user.username, room: roomNumber}))
        socket.emit("joinRoom", (props.user.username, roomNumber))
      }
  
    console.log("messageRoom: ", messageRoom)
    console.log("USER: ", props.user)
  
    useEffect(() => {
      socket.on("message", (message: IbotMessages) => {
        setMessages(x => [...x, message])
       console.log("message from server:", {message})
      })
    }, [setMessages])
    
    const submitMessage = (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log("message submitted")
      socket.emit("chatMessage", chatBody)
      setChatBody("")
      
    }
    
    console.log("messages state:", messages)
    return(
        <div className="App">
        <div className="chat-container">
      <header className="chat-header">
        <h1><i className="fas fa-smile"></i> {props.connected ? "Mack" : "not connected"}</h1>
        <a href="index.html" className="btn">Leave Room</a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3><i className="fas fa-comments"></i> Room Name:</h3>
          <h2 id="room-name">JavaScript</h2>
          <h3><i className="fas fa-users"></i> Join Rooms</h3>
          <button onClick={joinRoom}>Join Room 0</button>
        </div>
        <div className="chat-messages">
          {messages.map((item, index) => (
            <div className="message">
              <p className="meta">{item.username} <span>{item.time}</span></p>
              <p className="text">{item.text}</p>
            <br />
            </div>
            ))}
        </div>
      </main>
      <div className="chat-form-container">
         {/* OY BOZO come back later and just make this two inputs with a button that on click runs handle submit */}
        <form id="chat-form" onSubmit={submitMessage}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            value={chatBody}
            onChange={(e) => {
              setChatBody(e.target.value)
            } }
            required
          />
          <button type="submit" className="btn"><i className="fas fa-paper-plane"></i> Send</button>
        </form>
      </div>
    </div>
      </div>
    )
}

export default Chat