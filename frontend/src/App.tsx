import React, { useEffect, useState } from 'react';
import { socket } from "./clientUtils/socket"

interface IbotMessages {
  text: string
  time: string
  username: string
}

interface Iuser {
  username: string
  password: string
  email: string
}

interface IchatMessage {
  text: string
  time: string
  username: string
}


function App() {
  // const socket = io.connect("http://localhost:8000", {reconnect: true});
  const [messages, setMessages] = useState<Array<IbotMessages>>([]);
  const [connected, setConnected] = useState<Boolean>(false)
  const [user, setUser] = useState<Iuser>({username: "", password: "", email: ""})
  const [chatMessage, setChatMessage] = useState<IchatMessage>({text: "", time: "", username: ""})
  const [chatBody, setChatBody] = useState<string>("")
  
  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true)
      console.log(socket.connected); // true
      console.log("connected")
      
    });
    socket.on("message", (message: any) => {
     setMessages([...messages, message])
    })
    console.log(messages)
  }, [setMessages])

  const submitMessage = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("message submitted")
    setChatBody("")

  }

  return (
     <div className="App">
      <div className="chat-container">
    <header className="chat-header">
      <h1><i className="fas fa-smile"></i> ChatCord</h1>
      <a href="index.html" className="btn">Leave Room</a>
    </header>
    <main className="chat-main">
      <div className="chat-sidebar">
        <h3><i className="fas fa-comments"></i> Room Name:</h3>
        <h2 id="room-name">JavaScript</h2>
        <h3><i className="fas fa-users"></i> Users</h3>
        <ul id="users">
          <li>Brad</li>
          <li>John</li>
          <li>Mary</li>
          <li>Paul</li>
          <li>Mike</li>
        </ul>
      </div>
      <div className="chat-messages">
	
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
          onChange={(e) => setChatBody(e.target.value)}
          required
        />
        <button type="button" className="btn"><i className="fas fa-paper-plane"></i> Send</button>
      </form>
    </div>
  </div>
    </div>
  );
}

export default App;
