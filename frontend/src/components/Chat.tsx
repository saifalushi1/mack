import React, { useEffect, useState } from "react"
import { User } from "../App"
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
    user: User
    connected: boolean
}

const Chat: React.FC<AppProps> = (props): JSX.Element => {
    const user = props.user
    const [messages, setMessages] = useState<Array<IbotMessages>>([])
    const [roomNumber, setRoomNumber] = useState<number>(1)
    const [chatBody, setChatBody] = useState<string>("")
    console.log("chats user id", props.user.id)
    const joinRoom = () => {
        socket.emit("joinRoom", user.id, roomNumber, user.username,)
    }

    useEffect(() => {
        console.log("JOINING ROOM ***")
        joinRoom()
    }, [user])

    useEffect(() => {
        socket.on("message", (message: IbotMessages) => {
            setMessages((x) => [...x, message])
            console.log("message from server:", { message })
        })
    }, [setMessages])

    const submitMessage = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("message submitted")
        socket.emit("chatMessage", chatBody, roomNumber, props.user.username)
        setChatBody("")
    }

    console.log("messages state:", messages)
    return (
        <div className="App">
            <div className="chat-container">
                <header className="chat-header">
                    <h1>
                        <i className="fas fa-smile"></i>{" "}
                        {props.connected ? "Mack" : "not connected"}
                    </h1>
                </header>
                <main className="chat-main">
                    <div className="chat-sidebar">
                        <h3>
                            <i className="fas fa-comments"></i> Direct Messages:
                        </h3>
                        <h2 id="room-name">PLACEHOLDER</h2>
                    </div>
                    <div className="chat-messages">
                        {messages.map((item, index) => (
                            <div className="message" key={index}>
                                <p className="meta">
                                    {item.username} <span>{item.time}</span>
                                </p>
                                <p className="text">{item.text}</p>
                                <br />
                            </div>
                        ))}
                    </div>
                </main>
                <div className="chat-form-container">
                    <form id="chat-form" onSubmit={submitMessage}>
                        <input
                            id="msg"
                            type="text"
                            placeholder="Enter Message"
                            value={chatBody}
                            onChange={(e) => {
                                setChatBody(e.target.value)
                            }}
                            required
                        />
                        <button type="submit" className="btn">
                            <i className="fas fa-paper-plane"></i> Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat
